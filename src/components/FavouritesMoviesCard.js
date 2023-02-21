import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, IconButton } from '@mui/material';

import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { favoriteContext } from '../App';

const styles = {
        cardContent: {
          position: "absolute",
          top:0,
          left:0,
          opacity:0,
          backgroundColor:"#000000b8",
          color:"white",
          height:"100%",
          "&:hover":{
            opacity:1,
            
          }
        },
        cardActionArea:{
            position:"relative",
            height:"500"
        }
      }

export default function FavouritesMoviesCard({movie}){
    const {favourites, setFavourites} = React.useContext(favoriteContext);
    const saveToLocalStorage = (items) => {
		localStorage.setItem('favourites-movie', JSON.stringify(items));
	};
	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== movie.id
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};
 
  return (
    <Card sx={{ maxWidth:300 ,borderRadius:5 }}>
      <CardActionArea sx={styles.cardActionArea}>
        <CardMedia
          component="img"
          height="500"
          image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt={movie.title + " image"}
         
        />
         
        <CardContent sx={styles.cardContent} >
          <Typography gutterBottom variant="h5" component="div" >
            {movie.title}
          </Typography>
          <hr />
          <Typography variant="body2" >
            {movie.overview}
          </Typography>
          <IconButton onClick={()=>removeFavouriteMovie(movie)} sx={{color:"red"}} >
          Remove <HeartBrokenIcon />
          </IconButton>
        </CardContent>
        
        
       
      </CardActionArea>
    </Card>
  );
}