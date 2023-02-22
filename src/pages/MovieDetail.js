import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { favoriteContext } from "../App";
import axios from 'axios'
import { Card, CardContent, CardMedia, Chip, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MobileViewMD from "../components/MobileViewMD";
import LoadingBar from '../components/LoadingBar'

const MovieDetail = () => {
  const { id } = useParams()
  const { favourites, setFavourites } = React.useContext(favoriteContext);
  const [movie, setMovie] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [inFavoritesList, setinFavoritesList] = useState()

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    const res = newFavouriteList.filter(function (item, index) {
      return index === newFavouriteList.findIndex(function (obj) {
        return JSON.stringify(item) === JSON.stringify(obj)
      })
    })
    setFavourites(res);
    saveToLocalStorage(res);
  };
  const saveToLocalStorage = (items) => {
    localStorage.setItem('favourites-movie', JSON.stringify(items));
  };

  
  
  

  useEffect(() => {
    const handleCheck = (id) => {
      // eslint-disable-next-line eqeqeq
      if(favourites.some(FavoriteMv => id == FavoriteMv.id)){
        setinFavoritesList(true)
        
      }else{
        setinFavoritesList(false)
        
        }
    }
    function getBaseUrl() {
      return `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    }
    async function moviesData() {
      setIsLoading(true)
      try {
        const { data } = await axios.get(getBaseUrl())
       
        setMovie(data) 
        handleCheck(id)

      } catch (error) {
        console.log(error)
        //setError(true)

      }
      setIsLoading(false)
    }
    moviesData()
    
  
  }, [favourites, id])

 
//console.log(movie);

  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== movie.id
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};
  return (<>
    {!isLoading ? <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: "column", alignItems: "center" }}>
      <Card sx={{ display: { xs: 'none', sm: 'flex' }, mt: -7 }}>
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {movie.original_title}
            </Typography>
            <Typography sx={{ fontSize: 14, ml: 0.75 }} color="text.secondary" gutterBottom>
              Release: {movie.release_date}  ||  Language: {movie.original_language}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {Array.isArray(movie.genres) ? movie.genres.sort((a, b) => a.id - b.id).map(genre => (
                <Chip sx={{ m: 0.75 }} color="warning" key={genre.id} label={genre.name} />
              )) : null}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {movie.overview}
            </Typography>

          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            {!inFavoritesList ? <IconButton aria-label="Add to Favorite" onClick={() => addFavouriteMovie(movie)}>
              <FavoriteBorderIcon sx={{ height: 38, width: 38 }} />
            </IconButton> :
              <IconButton aria-label="Add to Favorite" onClick={() => removeFavouriteMovie(movie)}>
                <FavoriteIcon sx={{ height: 38, width: 38 }} />
              </IconButton>}
          </Box>
        </Box>
      </Card>


      <MobileViewMD movie={movie} inFavoritesList={inFavoritesList} setinFavoritesList={setinFavoritesList} />
    </Box>

      :<LoadingBar/> }
  </>
  )
}

export default MovieDetail
/*
<div className="banner" style={{backgroundImage: `https://image.tmdb.org/t/p/original${movie.poster_path}`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {movie.title || movie.name}
                                </h1>
                                <div className="genres">
                                    {
                                        movie.genres && movie.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__movie">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{movie.overview}</p>
                                
                            </div>
                        
<div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={movie.id}/>
                                </div>

</div>

<div className="container">
                            <div className="section mb-3">
                                <VideoList id={movie.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={movie.id}/>
                            </div>
                        </div>
                    
*/