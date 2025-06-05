import { styled, Typography, Box } from '@mui/material';
import React from 'react';
import { NavLink, Outlet } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from './components/LibraryHead';
import Library from './components/Library';
import Navbar from './components/Navbar';

const Layout = styled("div")({
  display: "flex",
  height:"100vh",
  padding: "20px 10px"
});

const SideBar = styled("div")(({theme}) => ({
  width:"331px",
  marginRight:"15px",
  height:"100%",
  display:"flex",
  flexDirection:"column",
  flexShrink:0,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  }
}));

const ContentBox = styled(Box)(({theme}) => ({
  borderRadius:"8px",
  backgroundColor:theme.palette.background.paper,
  color:theme.palette.text.primary,
  width:"100%",
  padding:"25px 15px 25px 20px",
  "&:not(:only-child) + .MuiBox-root":{
    marginTop:"15px",
  }
}));

const NavList = styled("ul")({
  listStyle:"none",
  padding:0,
  margin:0
});

const StyledNavLink = styled(NavLink)(({theme}) => ({
  textDecoration:"none",
  display:"flex",
  alignItems:"center",
  gap:"20px",
  padding: "7px 0",
  translate:"color 0.5s",
  color:theme.palette.text.secondary,
  "&:hover":{
    color:theme.palette.text.primary,
  },
  "&.active":{
    color:theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <SideBar>
        <ContentBox flexShrink={0}>
          <NavList>
            <li>
              <StyledNavLink to="/">
                <HomeIcon/>
                <Typography variant='h2' fontWeight={700}>Home</Typography>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/search">
                <SearchIcon/>
                <Typography variant='h2' fontWeight={700}>Search</Typography>
              </StyledNavLink>
            </li>
          </NavList>
        </ContentBox>
        <ContentBox flexGrow={1}>
          <LibraryHead />
          <Library />
        </ContentBox>
      </SideBar>
      <ContentBox flexGrow={1}>
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  )
}

export default AppLayout