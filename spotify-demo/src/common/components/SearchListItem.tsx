import { IconButton, styled, Typography } from '@mui/material'
import React from 'react'
import { Track } from '../../models/track';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import NoData from './NoData';

interface SearchListProps {
    list: Track[];
    handleAddList?:() => void;
}

const SearchItem = styled("div")({
    display: "flex",
    marginTop: "15px",
    "&:first-child": {
        marginTop: 0,
    },
    gap: "15px",
})
const ItemImg = styled("div")({
    overflow: "hidden",
    width: "50px",
    height: "50px",
    borderRadius: "3px",
    flexShrink: 0,
    "& img": {
        width: "100%",
        Height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
    },
    "& svg": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "20px",
  }
})
const ItemTxt = styled("div")({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    paddingRight: "30px",
    "& .itemName" : {
        fontSize: "15px",
    },
    "& .itemInfo" : {
        display: "flex",
        gap: "5px",
        color: "#ddd",
        fontSize: "11px",
        
        "& .itemArtistName" : {
        },
        "& .itemAlbumName" : {}
    },
    "& .btnAddList" : {
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
    }
})

const SearchListItem = ({list, handleAddList}:SearchListProps) => {
    // console.log(list)
  return (
    <>
    {
    list.length !== 0 ?
    list.map((track) => (
    <SearchItem key={track.id}>
        <ItemImg>
            { !track.album?.images ? <MusicNoteIcon className="imgIcon"/> : (<img src={track.album?.images[0].url} alt=''/>) }
        </ItemImg>
        <ItemTxt>
            <Typography className='itemName'>{track.name}</Typography>
            <Typography className='itemInfo'>
                <span className='itemArtistName'>{track.artists && track.artists[0].name} |</span>
                <span className='itemAlbumName'>{track.album?.name}</span>
            </Typography>
            <IconButton color="primary" aria-label="노래추가" className="btnAddList">
                <PlaylistAddIcon />
            </IconButton>
        </ItemTxt>
    </SearchItem>)) : <NoData text='검색결과 없음'/>
    }
    </>
  )
}

export default SearchListItem