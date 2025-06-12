import { styled, Typography } from '@mui/material';
import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';

const Header = styled("div")({
    textDecoration:"none",
    display:"flex",
    marginTop:"-5px",
    alignItems:"center",
    gap:"20px",
})

const IconBtn = styled("button")({
    marginLeft:"auto",
    backgroundColor:"transparent",
    padding:"5px",
    border:0,
    color:"#03A9F4",
    fontWeight:"700",
    cursor:"pointer",
    transition:"backgroundColor 0.5s",
    "svg" : {
        transform: "rotate(0deg)",
        transition:"all 0.5s",
    },
    "&:hover":{
        backgroundColor:"rgba(255,255,255,0.1)",
        borderRadius:"50%",
        "svg" : {
        transform: "rotate(90deg)",
    },
    },
    
})

const LibraryHead = () => {
    const { mutate: createPlaylist } = useCreatePlaylist();
    const { data:user } = useGetCurrentUserProfile();
    
    const handleCreatePlaylist = () => {
        if(!user) {
            return getSpotifyAuthUrl();
        }

        createPlaylist({name: "나의 플레이 리스트"})
    }
    
    return (
    <Header>
        <BookmarkIcon />
        <Typography variant='h2' fontWeight={700}>Your Library</Typography>
        <IconBtn aria-label="add" onClick={handleCreatePlaylist}>
            <AddIcon />
        </IconBtn>
    </Header>
  )
}

export default LibraryHead