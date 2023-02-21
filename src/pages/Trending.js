
import { Box, Grid, Pagination } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MoviesCard from '../components/MoviesCard'

const Trending = () => {
    const [trendingMovie, setTrendingMovie] = useState([])
    const [page, setpage] = useState(1)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [maxPage] = useState(20)
    const trendingData = async(page=1) =>{
        setIsLoading(true)
        try {
            const {data} = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=`+page)
            setTrendingMovie(data.results )
            //console.log("pages:", data.total_pages,' :V');
            //setMaxPage(data.total_pages)
            setIsLoading(false)
            
        } catch (error) {
            console.log(error);
            setError(true)
            setIsLoading(false)
        }
      
      
    }
    
    useEffect(()=>{
        trendingData(page)
    },[page])
    const handleChange=(event, value)=>{
        setpage(value)
    }
  return (
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    flexDirection= 'column'>
      {!isLoading? !error? 
      <Box sx={{ flexGrow: 1 ,ml:2  }}>
      <Grid container spacing={{ xs: 0, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {trendingMovie.map(movie => (
          <Grid xs={4} sm={4} md={4} key={movie.id}sx={{mb:5}}>
            <MoviesCard key={movie.id} movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box> :<h1>error</h1> :<h1>Loading...</h1>}
    <Pagination count={maxPage} variant="outlined" color="primary" onChange={handleChange} />
    </Box>
  )
}

export default Trending
