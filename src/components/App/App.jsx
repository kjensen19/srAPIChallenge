import PlayerInput from './inputs/PlayerInput'
import TeamInput from './inputs/TeamInput'
import Paper from '@mui/material/Paper';
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App(){

    return(
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Paper elevation={5} id="inputContainer">
          <PlayerInput />
          <TeamInput />
        </Paper>
      </ThemeProvider>

    )
}

export default App