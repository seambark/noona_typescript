import { Box, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, styled, Typography } from '@mui/material';
import React from 'react';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router';

const Profile = styled("button")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "transparent",
  borderRadius: "30px",
  border:"1px solid #fff",
  padding: "3px 5px",
  "& > svg": {
    width: "16px",
    height: "auto",
    fill: "#fff",
    marginLeft: "10px",
  }
})

const UserImg = styled("div")({
  width: "25px",
  height: "25px",
  marginRight: "7px",
  borderRadius: "50%",
  overflow: "hidden",
  "& img": {
    display: "block",
    width: "100%",
    height: "auto",
  },
  "& svg": {
    width: "100%",
    height: "100%",
    fill: "#fff",
  } 
})

const options = ['Logout'];

const Navbar = () => {
  const { data:userProfile } = useGetCurrentUserProfile();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handelLogout = () => {
      localStorage.removeItem("access_token");
      navigate('/');
      window.location.reload();
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
    option: string,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    console.log(index)
    console.log(option)
    if(option === "Logout") {
      handelLogout()
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" marginBottom="15px">
        { userProfile ?
          <>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="user menu"
              >
                <Profile
                  aria-controls={open ? 'split-button-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-label="select logout"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <UserImg>
                    {userProfile.images.length > 0 ?
                      <img src={userProfile.images[0]?.url} alt="프로필 사진"/> 
                    : <AccountCircleIcon />
                    }
                  </UserImg>
                  <Typography fontSize="13px" letterSpacing="2px" color='#fff'>{userProfile.display_name}</Typography>
                  { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Profile>
              </ButtonGroup>
              <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 2}
                              selected={index === selectedIndex}
                              onClick={(event) => handleMenuItemClick(event, index, option)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
          </> 
          : <LoginButton />}
    </Box>
  )
}
 
export default Navbar;