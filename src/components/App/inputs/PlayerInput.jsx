import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {

    const handlePlayerClick = () => {  axios({
        method: 'GET',
        url: '/api/player'
      }).then((response) => {
        console.log('get response: ', response.data)
      }).catch((error) => {
        console.log('client side get error', error)
      })
    }
    
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <button onClick={handlePlayerClick}>Test Player</button>


      </Box>
  );
}