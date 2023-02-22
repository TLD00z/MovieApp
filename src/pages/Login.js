import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  useNavigate } from 'react-router-dom';
import { favoriteContext } from '../App';
import axios from 'axios';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

 
const theme = createTheme();

export default function SignInSide() {
  const { setIsLogin } = React.useContext(favoriteContext)
  const navigate= useNavigate()
  const [loginDatas, setLoginDatas] = React.useState([])
  const [emailError, setEmailError] = React.useState(false)
  const [pasError, setPasError] = React.useState(false)
  const [emailErrorMS, setEmailErrorMS] = React.useState("")
  const [pasErrorMS, setPasErrorMS] = React.useState("")
  const saveLoginToLocalStorage = (items) => {
		localStorage.setItem('login', JSON.stringify(items));
	};
  
  function checkLogin(email,password,data) { 
    const obj = data.find(item => item.email === email);
    if(obj){
      if(obj.username === password){
        return true
      }else{
       // "Incorrect password"
       setPasError(true)
       setPasErrorMS("Incorrect password")
        return false
      }
    }else{
      //"user not existed"
      setEmailError(true)
      setEmailErrorMS("user not existed")
      setPasError(true)
      setPasErrorMS("Incorrect password")
      return false;
    }
  }  
  const  getLoginData = async()=> {
    try {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")
      setLoginDatas(data)
      console.log(data);
    }

    catch (error) {
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    email: data.get('email'),
    password: data.get('password'),
  })
  if(checkLogin(data.get('email'),data.get('password'),loginDatas)){
    setIsLogin(true) 
    saveLoginToLocalStorage(true) 
    navigate("/")
  }else{
   
  }
  // check email ,password 
  // setIsLogin(true)

};
  React.useEffect(() => {
    getLoginData()
  }, [])
    

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://media.istockphoto.com/id/1406127371/photo/women-wearing-3d-glasses-watching-a-movie-and-her-giant-popcorn-3d-render-illustration.jpg?b=1&s=170667a&w=0&k=20&c=sOe1e0SkxCmB6HsDN_NbzH9hPGhQpzXAXesWs2a7jTA=)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {!emailError?<TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address (Sincere@april.biz)"
                name="email"
                autoComplete="email"
                autoFocus
                
              />:<TextField
              error
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email (Sincere@april.biz)" //Sincere@april.biz
              name="email"
              autoComplete="email"
              autoFocus
              helperText={ emailErrorMS}
            />}
             {!pasError?<TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password (Bret)" //Bret
                type="password"
                id="password"
                autoComplete="current-password"
              />:
              <TextField
              error
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password (Bret)"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={ pasErrorMS }
            />} 
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}