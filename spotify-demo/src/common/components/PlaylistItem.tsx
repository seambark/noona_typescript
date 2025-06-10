import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled, Typography } from '@mui/material';

const ListItem = styled("div")({
  display: "flex",
  gap: "0 12px",
  padding: "12px 20px",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover" : {
    backgroundColor:"rgba(255,255,255,0.1)",
    "& img": {
      opacity: 0.7,
    },
    "& .imgIcon": {
      visibility: "hidden",
      opacity: 0,
    },
    "& .hoverIcon" : {
        visibility: "visible",
        opacity: 1,
    }
  }
});

const ItemImg = styled("div")({
  position: "relative",
  overflow: "hidden",
  width: "48px",
  height: "48px",
  flexShrink: 0,
  borderRadius: "3px",
  backgroundColor: "#2f2f2f",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
  },
  "& svg": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  "& .imgIcon": {
     visibility: "visible",
     opacity: 1,
  },
  "& .hoverIcon" : {
      visibility: "hidden",
      opacity: 0,
      fill: "#03A9F4",
  }
});

const ItemText = styled("div")({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  letterSpacing: "0.03em",
});

interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null | undefined;
  id: string;
  handleClick: (id:string) => void;
}


const PlaylistItem = ({
    image,
    name,
    artistName,
    id,
    handleClick
}:PlaylistItemProps) => {
  return (
    <ListItem onClick={() => handleClick(id)}>
        <ItemImg>
            { !image ? <MusicNoteIcon className="imgIcon"/> : <img src={image} alt=''/> }
            <PlayArrowIcon className="hoverIcon"/>
        </ItemImg>
        <ItemText>
            <Typography fontSize="16px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" maxWidth="230px">{name}</Typography>
            <Typography color="#b3b3b3" fontSize="12px" marginTop="3px">{artistName}</Typography>
        </ItemText>
    </ListItem>
  )
}

export default PlaylistItem