import { Box, Chip, Grid, Pagination } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { favoriteContext } from '../App'
import LoadingBar from '../components/LoadingBar'

import MoviesCard from '../components/MoviesCard'
import useGenres from '../hook/useGenre'
const Movies = () => {
  const [allMovie, setallMovie] = useState([])
  const [page, setPage] = useState(1)
  
  const [maxPage,setMaxPage] = useState(100)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [allGenres, setAllGenres] = useState([])
  const genreToUrl= useGenres(selectedGenres)
  const navigate= useNavigate()
  
  const { setIsLogin } = useContext(favoriteContext)
  const [isLoading,setIsLoading] =useState(true)
  const  genresData = async()=> {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      setAllGenres(data.genres)
    }

    catch (error) {
    }
  }

  useEffect(()=>{
    function getBaseUrl(){
      return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreToUrl}&with_watch_monetization_types=flatrate`}
    async function moviesData() {
      
      try {
        setIsLoading(true)
        const { data } = await axios.get(getBaseUrl())
        setMaxPage(data.total_pages > 100 ? 100:data.total_pages)
        setallMovie(data.results)
        setIsLoading(false)
        
        
      } catch (error) {
        console.log(error)
        setIsLoading(false)

      } 
      
    }
      moviesData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[allGenres, page])
  
  useEffect(() => {
    const chekinglogin= JSON.parse(
			localStorage.getItem('login')
		);
    
    if(chekinglogin === null || chekinglogin === false){
      navigate("/login")
    } else {
    setIsLogin(chekinglogin)
    navigate("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    genresData()
  },[])

  function handleChange(event, value) {
    setPage(value)
  }

  function handleAdd(genre) {
    setSelectedGenres([...selectedGenres, genre])
    setAllGenres(allGenres.filter((g) => g.id !== genre.id))
    setPage(1)
  }

  function handleRemove(genre) {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    )
    setAllGenres([...allGenres, genre])
    setPage(1)
  }
return (
  <Box display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100vh"
  flexDirection= 'column'
  >
    {/* <LoadingBar progress={process}/> */}
    {!isLoading ? 
    <Box sx={{ flexGrow: 1 ,ml:2  }} >
      <Box sx={{paddingBottom:7 ,m:1 }}>
      { Array.isArray(selectedGenres) ? selectedGenres.sort((a, b) => a.id - b.id).map(genre =>(
          <Chip sx={{m:0.75}} color="primary" key={genre.id} label={genre.name} onDelete={() => handleRemove(genre)}/>
        )):null}
      {Array.isArray(allGenres)  ? allGenres.sort((a, b) => a.id - b.id).map(genre =>(
          <Chip sx={{m:0.75}} color="warning" key={genre.id} label={genre.name} clickable  onClick={() => handleAdd(genre)}/>
        )):null}
      </Box>

    <Grid container  spacing={{ xs: 0, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {allMovie.map(movie => (
        <Grid xs={4} sm={4} md={4} key={movie.id}sx={{mb:5}}>
          <MoviesCard key={movie.id} movie={movie} />
        </Grid>
      ))}
    </Grid>
  </Box> :<LoadingBar/> }
  <Pagination page={page} count={maxPage} variant="outlined" color="primary" onChange={handleChange}  />
  
  </Box>
)
}

export default Movies