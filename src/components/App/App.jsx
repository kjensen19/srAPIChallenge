import PlayerInput from './inputs/PlayerInput'
import TeamInput from './inputs/TeamInput'
import Paper from '@mui/material/Paper';
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react'

//MUI dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App(){
  const [info, setInfo] = useState('')


    return(
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Paper elevation={10} className="inputBox">
          <Paper className='inputContainer' elevation={5}>
          <h1>Sportradar NHL Info</h1>
            <PlayerInput setInfo={setInfo}/>
            <TeamInput  setInfo={setInfo}/>
          </Paper>
          {info && <a href={info} download onClick={() => setInfo('')}>Download CSV</a>}
        </Paper>
      </ThemeProvider>

    )
}

export default App


