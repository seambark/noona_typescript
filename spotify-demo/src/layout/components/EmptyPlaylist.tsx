import { Typography, Button, styled } from '@mui/material'
import React from 'react'



const ListBox = styled("div")({
    marginTop:"15px",
    padding: "20px 25px",
    borderRadius:"8px",
    backgroundColor:"rgba(255,255,255,0.1)",
})

const CreateBtn = styled(Button)({
    backgroundColor:"#fff",
    marginTop:"20px",
    padding:"6px 10px",
    width:"100%",
    color:"#000",
    fontWeight:"bold",
    "&:hover":{
        backgroundColor:"#c0bfbf",
    }
})

const Text = styled(Typography)({
    marginTop:"5px",
})

const EmptyPlaylist = () => {
  return (
    <ListBox>
         <Typography variant='h2' fontWeight={700}>Create your first playlist</Typography>
         <Text fontWeight={400}>It's easy, We'll help you</Text>
         <CreateBtn>Create playlist</CreateBtn>
    </ListBox>
  )
}

export default EmptyPlaylist