
import {  Box, Grid, Input } from '@mui/material';
import React, { useEffect, useState } from 'react'
//import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

import MoviesCard from '../components/MoviesCard';



const Searchs = () => {
  const [searched, setSearched] = useState("")
  const [page] = useState(1)// setPage
  const [searchMovie, setSearchMovie] = useState([])
  //const [setIsError]= useState(false) 
  
  const requestSearch=(value)=>{
    setSearched(value)
  }
  
  const cancelSearch = () => {
    setSearched("")
    requestSearch(searched)
  }
  useEffect(()=>{
    function getBaseUrl(){
      return `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searched}&page=${page}&include_adult=false`}

    async function moviesData() {
      try {
        const { data } = await axios.get(getBaseUrl())
        setSearchMovie(data.results)
        console.log("pages:", data.total_pages, ' :V')
        console.log(data.results)
       
      } catch (error) {
        console.log(error)
        //setIsError(true)
        
      } 
    }
      moviesData()
  },[page, searched])
  return (
  <Box sx={{ display: 'flex' ,flexDirection:"column"  }}>
    <Input
      placeholder='search...'
      size="md" 
      value={searched}
      onChange={(searchVal) => setSearched(searchVal.target.value)}
      onCancelSearch={() => cancelSearch()}
      sx={{mb:{md:6,sm:4,xs:1},mr:{md:15,sm:0}}}
      />

     <Box sx={{ flexGrow: 1 ,ml:2  }}>
        <Grid container spacing={{ xs: 0, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {searchMovie.map(movie => (
          <Grid xs={4} sm={4} md={4} key={movie.id}sx={{mb:5}}>
            <MoviesCard key={movie.id} movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box> 
     
    </Box>
  )
}

export default Searchs
//