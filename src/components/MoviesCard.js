
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';


import { useNavigate } from 'react-router-dom';
import { favoriteContext } from '../App';
import { useContext } from 'react';


// id={movie.id}
// poster={movie.poster_path}
// title ={movie.title}
// releaseDate={movie.release_date}
// voteAverag={movie.vote_averag}
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

export default function MoviesCard({movie}){
  const navigate= useNavigate()  
  const { isLogin } = useContext(favoriteContext)
  const handleDetail = (id)=>{
    if (isLogin) {
      navigate(`/detail/${id}`)
    }else{
      navigate("/login")
    }
    
  }
  
  return (
    <>
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
       <Button  sx={{color:"blue", m:"35%"}} onClick={()=>handleDetail(movie.id)} >
          Detail
        </Button>
      </CardContent>
      
     
    </CardActionArea>
  </Card>
    </>
    
    
  );
} 
/* <Button  sx={{color:"blue", m:"25%"}} onClick={()=>addFavouriteMovie(movie)} >
            add to Favorite
          </Button> 
*/