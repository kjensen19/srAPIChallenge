import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react'
import axios from 'axios'

export default function TeamInput() {
    const [teamId, setTeamId] = useState('')
    const [teamSeason, setTeamSeason] = useState('')

    const handleTeamClick = () => {  
        console.log('Team Id in submit', teamId)
        console.log('Team Season in submit', teamSeason)
        axios({
            method: 'GET',
            url: `/api/team/${teamId}/${teamSeason}`
      }).then((response) => {
        setTeamId('')
        setTeamSeason('')
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
      <TextField id="outlined-basic" label="Team ID" variant="outlined" name='teamId' value={teamId} onChange={() => setTeamId(event.target.value)} />
      <TextField id="outlined-basic" label="Team Season" variant="outlined" name="teamSeason" value={teamSeason} onChange={() => setTeamSeason(event.target.value)}/>
      <Button variant="contained" onClick={handleTeamClick}>Test Team</Button>


      </Box>
  );
}