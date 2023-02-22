import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' ,mt:-40 ,mb:15  ,flexDirection: 'column'}}>
      <CircularProgress size={60} color='error'/>
      <Typography >Loading...</Typography>
    </Box>
  );
}