import { alpha, Button, ButtonGroup, ClickAwayListener, Grow, Menu, MenuItem, MenuProps, styled } from '@mui/material';
import React, { useState } from 'react'
import { SimplifiedPlaylist } from '../../models/playlist';
import AddIcon from '@mui/icons-material/Add';
import useAddPlaylist from '../../hooks/useAddPlaylist';

interface ButtonSetProps {
    optionsList?: SimplifiedPlaylist[];
    trackUri?: string | undefined;
}

const ButtonSetContent = styled("div")({
    position: "relative",
    zIndex: "10",
    "& .groupBtn": {
        zIndex: 1,
    },
    "& .addBtn" : {
        minWidth: "auto",
        padding: "4px",
        "& svg": {
            width: "0.7em",
            height: "0.7em",
        }
    }
})

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

const ButtonSet = ({optionsList,  trackUri}:ButtonSetProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { mutate: addPlaylist } = useAddPlaylist();

     const handleAddList = (id: string, uri: string) => {
        if(uri) {
                addPlaylist({
                playlist_id: id,
                params: {
                    uris: [uri],
                    position: 0,
                },
            })
        }
    }

  return (
    <ButtonSetContent>
        <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        className="addBtn"
      >
        <AddIcon />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'demo-customized-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {optionsList && optionsList.map((option, index) => (
            <MenuItem 
                onClick={() => {
                    handleClose()
                    if(trackUri) {
                        handleAddList(option.id as string, trackUri);
                    }
                }} 
                key={index} 
                disableRipple>
                {option.name}
            </MenuItem>
        ))}
      </StyledMenu>
    </ButtonSetContent>
  )
}

export default ButtonSet