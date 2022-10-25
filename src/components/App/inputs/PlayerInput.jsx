import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react'
import axios from 'axios'


export default function PlayerInput() {
    const [playerId, setPlayerId] = useState('')
    const [playerSeason, setPlayerSeason] = useState('')

    const handlePlayerClick = () => {  
        console.log('Player ID in submit', playerId)
        console.log('Player Season in submit', playerSeason)
         axios({
            method: 'GET',
            url: `/api/player/${playerId}/${playerSeason}`
      }).then((response) => {
        setPlayerId('')
        setPlayerSeason('')
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
      <TextField id="outlined-basic" label="Player ID" variant="outlined" name='playerId' value={playerId} onChange={() => setPlayerId(event.target.value)} />
      <TextField id="outlined-basic" label="Player Season" variant="outlined" value={playerSeason} onChange={() => setPlayerSeason(event.target.value)}/>
      <Button variant="contained" onClick={handlePlayerClick}>Test Player</Button>


      </Box>
  );
}