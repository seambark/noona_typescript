import { styled, Typography } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const FloatingBox = styled("div") ({
    position: "fixed",
    left:0,
    bottom: 0,
    width: "100%",
    boxShadow: "-1px -9px 34px 0px rgba(0,0,0,0.65)",
    backgroundColor: "#000",
    "@media (min-width:751px)" : {
    display: "none",
    }, 
})
const FloatNavList = styled("ul")({
  listStyle:"none",
  padding:0,
  margin:0,
 display: "flex",
 "& li": {
    flexGrow: 1,
 }
});

const StyledNavLink = styled(NavLink)(({theme}) => ({
  textDecoration:"none",
  display:"flex",
  alignItems:"center",
  gap:"20px",
  flexDirection: "column",
  padding: "13px 5px",
  translate:"color 0.5s",
  textAlign: "center",
  color:theme.palette.text.secondary,
  "&.active":{
    color:theme.palette.text.primary,
  },
}));

const FloatNav = () => {
  return (
    <FloatingBox>
        <FloatNavList>
            <li>
                <StyledNavLink to="/">
                    <HomeIcon/>
                    {/* <Typography variant='h2' fontWeight={700}>Home</Typography> */}
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/search">
                    <SearchIcon/>
                    {/* <Typography variant='h2' fontWeight={700}>Search</Typography> */}
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/playlist">
                    <BookmarkIcon />
                    {/* <Typography variant='h2' fontWeight={700}>Library</Typography> */}
                </StyledNavLink>
            </li>
        </FloatNavList>
    </FloatingBox>
  )
}

export default FloatNav