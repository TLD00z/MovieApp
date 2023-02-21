import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

//import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
export default function NavigationBar() {
  const [value, setValue] = React.useState(0);
 
  return (
    <Box sx={{ 
      width:" 100% " ,
      position:"fixed",
      bottom: "0",
      zIndex:"100",
      display:{sm:"none"}
    }}>
      <BottomNavigation
        showLabels
        value={value}
        sx={{bgcolor:"#ffc400"}}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Link to={"/trending"}><BottomNavigationAction label="Trending" icon={< WhatshotIcon />} /></Link>
        <Link to={"/search"}><BottomNavigationAction label="Search" icon={< SearchIcon  />} /></Link>
       <Link to={"/favorite"}><BottomNavigationAction label="Favorite" icon={< FavoriteIcon />} /></Link>
      </BottomNavigation>
    </Box>
  );
}
// 