
import styled from "@emotion/styled";
import { FavoriteBorder } from "@mui/icons-material";
import {  Box, ButtonBase,  Grid, IconButton,  Typography } from "@mui/material";
import { useContext, useEffect} from "react";
import Popver from "./Popver";
import {favoriteContext} from "../App"


const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  });
const PaperStyled=styled("Paper")({
    p: 0,
    margin: "auto",
    marginBottom:15,
    maxWidth: 500,
    flexGrow: 1,
    background: 'linear-gradient(45deg, #003a70 20%, #FF8E53 90%)',
    borderRadius:6,
    position: "relative"
})

export default function SearchMvCard({movie}) {
  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('favourites-movie')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const {favourites, setFavourites} = useContext(favoriteContext);
  const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};
  const saveToLocalStorage = (items) => {
		localStorage.setItem('favourites-movie', JSON.stringify(items));
	};
    return (
        <PaperStyled>
        <Grid container spacing={1}>
          <Grid item>
            <ButtonBase sx={{ width: 100, height: 128 ,ml:-1 }} >
              <Img alt="complex" src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {movie.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                Release date: {movie.release_date}
                </Typography> 
                <Popver movie={movie}/>
              </Grid>
             
            </Grid>
            <Box sx={{position: "absolute",
        top: 0,
        right: 2}} >
              <Typography variant="subtitle1" component="div" color={"yellow"}>
              🟊{movie.vote_average}
              </Typography>
      <IconButton onClick={()=>addFavouriteMovie(movie)} >
        <FavoriteBorder />
      </IconButton>
            </Box>
          </Grid>
        </Grid>
      </PaperStyled>
    );
  }
  