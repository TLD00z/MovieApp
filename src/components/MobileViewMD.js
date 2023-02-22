import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, Rating, Stack } from '@mui/material';
import { Box } from '@mui/system';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MobileViewMD({movie} ,inFavoritesList, setinFavoritesList) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500 ,display:{sm:"none"} ,mt:-8}}>
      
      <CardMedia
        component="img"
        height="500"
          image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
        alt="Paella dish"
      />
      <CardContent >
        <Typography variant="body2" color="text.secondary">
          { Array.isArray(movie.genres) ? movie.genres.sort((a, b) => a.id - b.id).map(genre =>(
            <Chip sx={{m:0.75}} color="warning" key={genre.id} label={genre.name} />
          )):null}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        
        <Box >
            <Typography variant="body1" color="text.secondary" opacity="0.2"  >
              {movie.title}
            </Typography>
           <Rating name="read-only" value={(movie.vote_average/2)} readOnly />
          </Box>
          
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Overview:</Typography>
          <Typography paragraph>
            {movie.overview}
          </Typography>
          <Typography paragraph>Companies:</Typography>
          <Stack direction="row" spacing={2}>
            {movie.production_companies ?movie.production_companies.map(companie=>(
              <Box direction="row">
                <Avatar alt="Remy Sharp" src={`https://image.tmdb.org/t/p/w200/${companie.logo_path}`} sx={{ width: 90, height: 40 }}/>
                <Typography >{companie.name}</Typography>
               </Box>
            )):<>?</>}
          </Stack>
          <Typography paragraph mt={2}> release :</Typography>
          <Typography paragraph >
            {movie.release_date}  
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
// {!inFavoritesList ? <IconButton aria-label="Add to Favorite" onClick={() => addFavouriteMovie(movie)}>
// <FavoriteBorderIcon sx={{ height: 38, width: 38 }} />
// </IconButton> :
//   <IconButton aria-label="Add to Favorite" onClick={() => removeFavouriteMovie(movie)}>
//     <FavoriteIcon sx={{ height: 38, width: 38 }} />
//   </IconButton>}