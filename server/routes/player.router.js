const express = require('express');
const router = express.Router()
const axios = require('axios');

const playerSeason = 20182019
// const playerObject = {
//     playerId: 8476792,
//     playerName:'',
//     currentTeam: '',
//     playerAge: '',
//     playerNumber: '',
//     playerPosition: '',
//     isRookie: '',
//     assists: '',
//     goals: '',
//     games: '',
//     hits: '',
//     points: ''
// }
const playerId = 8476792

//GET Player Route


// https://statsapi.web.nhl.com/api/v1/people/8476792/stats?stats=statsSingleSeason&season=20182019


// async function getPlayerData(){
    
//     console.log('player in Promise:', player)
//     console.log('season in Promise: ', season)

//      await({const playerObj = {
//         playerId: playerId,
//         playerName: player.fullName,
//         currentTeam: player.currentTeam.name,
//         playerAge: player.currentAge,
//         playerNumber: player.primaryNumber,
//         playerPosition: player.primaryPosition.name,
//         isRookie: player.rookie,
//         assists: season.assists,
//         goals: season.goals,
//         games: season.games,
//         hits: season.hits,
//         points: season.points
//     }})

//     return playerObj
// }


// async function getPlayerData() {
//     const [ playerData, seasonData ] = await Promise.all([ getPlayerGeneral(), getPlayerSeason ]);
    
//   }

// function getPlayerGeneral(){  
//     axios({
//         method: 'GET',
//         url: `https://statsapi.web.nhl.com/api/v1/people/${playerId}`
//     })
//     .then(result => {
//         console.log('player data: ', result.)
//         return result.data.people[0]
//     })
// }

// function getPlayerSeason(){
//     axios({
//         method: 'GET',
//         url: `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${playerSeason}`
//     })
//     .then(result => {
//         console.log('Season Data: ', result.data.stats[0].splits[0].stat)
//         return result.data.stats[0].splits[0].stat
//     })
// }

// async function makePlayerObject(player, season) {
//     console.log('Player in makeObj', player)
//     console.log('Season in makeObj', season)
//     await player;
//     await season;

//     return playerObject}
    const dataStore = {}
    const playerAPI = `https://statsapi.web.nhl.com/api/v1/people/${playerId}`
    const seasonAPI = `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${playerSeason}`

    const apiResources = [playerAPI, seasonAPI]

    async function getResource(resource) {
        const { data } = await axios({
            method: 'GET',
            url: resource})
        dataStore[resource] = data
    }

    async function getAllResources() {
        const apiPromises = apiResources.map(getResource)
        await Promise.all(apiPromises)
    }

    router.get('/', (req, res) =>{

        getAllResources().then(promiseRes =>{
            const compositeData = dataStore
            console.log('composite data = ', compositeData)
            const player = compositeData[playerAPI].people[0]
            const season = compositeData[seasonAPI].stats[0].splits[0].stat
            console.log('player', player)
            console.log('season', season)
            
            const playerObject = {
                playerId: playerId,
                playerName: player.fullName,
                currentTeam: player.currentTeam.name,
                playerAge: player.currentAge,
                playerNumber: player.primaryNumber,
                playerPosition: player.primaryPosition.name,
                isRookie: player.rookie,
                assists: season.assists,
                goals: season.goals,
                games: season.games,
                hits: season.hits,
                points: season.points
            }


            res.send(playerObject)

        })
        
      

        
        })




        



// app.get('/gifs', (req, res) => {
//     axios({
//       method: 'GET',
//       url: `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&rating=g&limit=500`
//     })
//       .then(gifRes => {
//         const gifObjs = gifRes.data.data;
//         res.send(gifObjs);
//       })
//       .catch(gifErr => {
//         console.log('GET /gifs fail:', gifErr);
//         res.sendStatus(500);
//       })
//   })

module.exports = router