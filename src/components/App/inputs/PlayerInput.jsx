import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react'
import axios from 'axios'


export default function PlayerInput({ setInfo }) {
 

  //local state for id and season values to be sent as params on the get request
    const [playerId, setPlayerId] = useState('')
    const [playerSeason, setPlayerSeason] = useState('')
  //onclick grabs id and season values
    const handlePlayerClick = () => {  
        console.log('Player ID in submit', playerId)
        console.log('Player Season in submit', playerSeason)
         axios({
            method: 'GET',
            url: `/api/player/${playerId}/${playerSeason}`
      }).then((response) => {
        //On success clear inputs
        setPlayerId('')
        setPlayerSeason('')
        console.log('get response: ', response)
        setInfo(response.data)
      }).catch((error) => {
        console.log('Get player error', error)
      })
    }
    //change handler for select dropdown
    function handleSeasonChange(event){
      setPlayerSeason(event.target.value)
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
      <FormControl fullWidth>
        <InputLabel id="season-select-label">Season</InputLabel>
        <Select
          labelId="season-abel"
          id="season-select"
          value={playerSeason}
          label="Season"
          onChange={handleSeasonChange}
        >
          <MenuItem value={19171918}>1917-1918 Season</MenuItem>
          <MenuItem value={19181919}>1918-1919 Season</MenuItem>
          <MenuItem value={19191920}>1919-1920 Season</MenuItem>
          <MenuItem value={19201921}>1920-1921 Season</MenuItem>
          <MenuItem value={19211922}>1921-1922 Season</MenuItem>
          <MenuItem value={19221923}>1922-1923 Season</MenuItem>
          <MenuItem value={19231924}>1923-1924 Season</MenuItem>
          <MenuItem value={19241925}>1924-1925 Season</MenuItem>
          <MenuItem value={19251926}>1925-1926 Season</MenuItem>
          <MenuItem value={19261927}>1926-1927 Season</MenuItem>
          <MenuItem value={19271928}>1927-1928 Season</MenuItem>
          <MenuItem value={19281929}>1928-1929 Season</MenuItem>
          <MenuItem value={19291930}>1929-1930 Season</MenuItem>
          <MenuItem value={19301931}>1930-1931 Season</MenuItem>
          <MenuItem value={19311932}>1931-1932 Season</MenuItem>
          <MenuItem value={19321933}>1932-1933 Season</MenuItem>
          <MenuItem value={19331934}>1933-1934 Season</MenuItem>
          <MenuItem value={19341935}>1934-1935 Season</MenuItem>
          <MenuItem value={19351936}>1935-1936 Season</MenuItem>
          <MenuItem value={19361937}>1936-1937 Season</MenuItem>
          <MenuItem value={19371938}>1937-1938 Season</MenuItem>
          <MenuItem value={19381939}>1938-1939 Season</MenuItem>
          <MenuItem value={19391940}>1939-1940 Season</MenuItem>
          <MenuItem value={19401941}>1940-1941 Season</MenuItem>
          <MenuItem value={19411942}>1941-1942 Season</MenuItem>
          <MenuItem value={19421943}>1942-1943 Season</MenuItem>
          <MenuItem value={19431944}>1943-1944 Season</MenuItem>
          <MenuItem value={19441945}>1944-1945 Season</MenuItem>
          <MenuItem value={19451946}>1945-1946 Season</MenuItem>
          <MenuItem value={19461947}>1946-1947 Season</MenuItem>
          <MenuItem value={19471948}>1947-1948 Season</MenuItem>
          <MenuItem value={19481949}>1948-1949 Season</MenuItem>
          <MenuItem value={19491950}>1949-1950 Season</MenuItem>
          <MenuItem value={19501951}>1950-1951 Season</MenuItem>
          <MenuItem value={19511952}>1951-1952 Season</MenuItem>
          <MenuItem value={19521953}>1952-1953 Season</MenuItem>
          <MenuItem value={19531954}>1953-1954 Season</MenuItem>
          <MenuItem value={19541955}>1954-1955 Season</MenuItem>
          <MenuItem value={19551956}>1955-1956 Season</MenuItem>
          <MenuItem value={19561957}>1956-1957 Season</MenuItem>
          <MenuItem value={19571958}>1957-1958 Season</MenuItem>
          <MenuItem value={19581959}>1958-1959 Season</MenuItem>
          <MenuItem value={19591960}>1959-1960 Season</MenuItem>
          <MenuItem value={19601961}>1960-1961 Season</MenuItem>
          <MenuItem value={19611962}>1961-1962 Season</MenuItem>
          <MenuItem value={19621963}>1962-1963 Season</MenuItem>
          <MenuItem value={19631964}>1963-1964 Season</MenuItem>
          <MenuItem value={19641965}>1964-1965 Season</MenuItem>
          <MenuItem value={19651966}>1965-1966 Season</MenuItem>
          <MenuItem value={19661967}>1966-1967 Season</MenuItem>
          <MenuItem value={19671968}>1967-1968 Season</MenuItem>
          <MenuItem value={19681969}>1968-1969 Season</MenuItem>
          <MenuItem value={19691970}>1969-1970 Season</MenuItem>
          <MenuItem value={19701971}>1970-1971 Season</MenuItem>
          <MenuItem value={19711972}>1971-1972 Season</MenuItem>
          <MenuItem value={19721973}>1972-1973 Season</MenuItem>
          <MenuItem value={19731974}>1973-1974 Season</MenuItem>
          <MenuItem value={19741975}>1974-1975 Season</MenuItem>
          <MenuItem value={19751976}>1975-1976 Season</MenuItem>
          <MenuItem value={19761977}>1976-1977 Season</MenuItem>
          <MenuItem value={19771978}>1977-1978 Season</MenuItem>
          <MenuItem value={19781979}>1978-1979 Season</MenuItem>
          <MenuItem value={19791980}>1979-1980 Season</MenuItem>
          <MenuItem value={19801981}>1980-1981 Season</MenuItem>
          <MenuItem value={19811982}>1981-1982 Season</MenuItem>
          <MenuItem value={19821983}>1982-1983 Season</MenuItem>
          <MenuItem value={19831984}>1983-1984 Season</MenuItem>
          <MenuItem value={19841985}>1984-1985 Season</MenuItem>
          <MenuItem value={19851986}>1985-1986 Season</MenuItem>
          <MenuItem value={19861987}>1986-1987 Season</MenuItem>
          <MenuItem value={19871988}>1987-1988 Season</MenuItem>
          <MenuItem value={19881989}>1988-1989 Season</MenuItem>
          <MenuItem value={19891990}>1989-1990 Season</MenuItem>
          <MenuItem value={19901991}>1990-1991 Season</MenuItem>
          <MenuItem value={19911992}>1991-1992 Season</MenuItem>
          <MenuItem value={19921993}>1992-1993 Season</MenuItem>
          <MenuItem value={19931994}>1993-1994 Season</MenuItem>
          <MenuItem value={19941995}>1994-1995 Season</MenuItem>
          <MenuItem value={19951996}>1995-1996 Season</MenuItem>
          <MenuItem value={19961997}>1996-1997 Season</MenuItem>
          <MenuItem value={19971998}>1997-1998 Season</MenuItem>
          <MenuItem value={19981999}>1998-1999 Season</MenuItem>
          <MenuItem value={19992000}>1999-2000 Season</MenuItem>
          <MenuItem value={20002001}>2000-2001 Season</MenuItem>
          <MenuItem value={20012002}>2001-2002 Season</MenuItem>
          <MenuItem value={20022003}>2002-2003 Season</MenuItem>
          <MenuItem value={20032004}>2003-2004 Season</MenuItem>
          <MenuItem value={20042005}>2004-2005 Season</MenuItem>
          <MenuItem value={20062007}>2006-2007 Season</MenuItem>
          <MenuItem value={20072008}>2007-2008 Season</MenuItem>
          <MenuItem value={20082009}>2008-2009 Season</MenuItem>
          <MenuItem value={20092010}>2009-2010 Season</MenuItem>
          <MenuItem value={20102011}>2010-2011 Season</MenuItem>
          <MenuItem value={20112012}>2011-2012 Season</MenuItem>
          <MenuItem value={20122013}>2012-2013 Season</MenuItem>
          <MenuItem value={20132014}>2013-2014 Season</MenuItem>
          <MenuItem value={20142015}>2014-2015 Season</MenuItem>
          <MenuItem value={20152016}>2015-2016 Season</MenuItem>
          <MenuItem value={20162017}>2016-2017 Season</MenuItem>
          <MenuItem value={20172018}>2017-2018 Season</MenuItem>
          <MenuItem value={20182019}>2018-2019 Season</MenuItem>
          <MenuItem value={20192020}>2019-2020 Season</MenuItem>
          <MenuItem value={20202021}>2020-2021 Season</MenuItem>
          <MenuItem value={20212022}>2021-2022 Season</MenuItem>
          <MenuItem value={20222023}>2022-2023 Season</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handlePlayerClick}>Player Info</Button>
      


      </Box>
  );
}