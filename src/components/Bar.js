import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Link, useNavigate } from 'react-router-dom';
import {  BottomNavigationAction, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { favoriteContext } from '../App';
import LoadingBar from './LoadingBar';

export default function Bar() {
  const {isLogin,setIsLogin} = React.useContext(favoriteContext);
  const navigate= useNavigate()
  const handleLogout = ()=>{
  setIsLogin(false)
  localStorage.setItem('login', "false");
  navigate("/login")
  
}
  return (
    <Box sx={{ flexGrow: 1 ,zIndex:"100",display: 'flex', }}>
      <AppBar sx={{display: 'flex',justifyContent: 'space-between', flexDirection: 'row'}}>
        <Toolbar  >
          <Link to={"/"}><BottomNavigationAction label="Movie" icon={<PlayCircleFilledIcon sx={{mt:0.5}}/> } /></Link>
          <Typography variant="h6" component="div"  sx={{ display: 'flex',flexGrow: 1,mr: 2  }}>
           movie
          </Typography>
        </Toolbar>
        <Box   sx={{ display: {xs : 'none', sm: 'block' },  mt:0.5,ml:{lg:-25,md:-15,sm:-10}}}  >
            <Link to={"/trending"}><BottomNavigationAction label="Trending" icon={< WhatshotIcon />} /></Link>
            <Link to={"/search"}><BottomNavigationAction label="Search" icon={< SearchIcon  />} /></Link>
            <Link to={"/favorite"}><BottomNavigationAction label="Favorite" icon={< FavoriteIcon />} /></Link>
         </Box>
        {!isLogin?<Link to={"/Login"}><BottomNavigationAction label="Movie" icon={< LoginIcon />} /></Link>:<IconButton onClick={handleLogout}><LogoutIcon/></IconButton>}
      </AppBar>
      <LoadingBar progress={50}/>
    </Box>
    
  );
}
