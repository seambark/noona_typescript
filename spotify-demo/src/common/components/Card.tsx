import { styled, Typography } from '@mui/material'
import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface CardProps {
    name: string;
    image: string;
    artistName: string | undefined;
}

const CardItem = styled("div")({
    cursor:"pointer",
    "& .txtBox": {
        padding: "10px 0 7px",
    },
    "&:hover": {
        "& .iconPlay": {
            visibility:"visible",
            opacity: 0.9,
        },
        "& .imgBox" : {
            boxShadow: "3px 3px 0 rgba(3,169,244,0.8)",
            "& img" : {
                opacity: 1,
            }
        }
    },
    "& .title": {
        width:"100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-word",
        display: "-webkit-box",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
    },
    "& .name": {
        fontSize: "11px",
        color:"#a2a2a2",
    }
});

const Image = styled("div")({
    position:"relative",
    borderRadius: "5px",
    overflow: "hidden",
    boxSize:"border-box",
    border: "1px solid transparent",
    transition: "all 0.3s",
    "& img": {
        display: "block",
        width: "100%",
        height: "auto",
        opacity: 0.8,
    },
    "& .iconPlay":{
        visibility:"hidden",
        position:"absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        fontSize: "3.5rem",
        color: "#03A9F4",
        opacity: 0,
        transition: "all 0.2s",
    }

});

const Card = ({image, name, artistName}:CardProps) => {
  return (
    <CardItem>
        <Image className="imgBox">
            <img src={image} alt=''/>
            <PlayArrowIcon className='iconPlay'/>
        </Image>
        <div className='txtBox'>
            <Typography className='title'>{name}</Typography>
            <Typography className='name'>{artistName}</Typography>
        </div>
    </CardItem>
  )
}

export default Card