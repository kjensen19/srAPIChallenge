const express = require('express');
const router = express.Router()
const axios = require('axios');

const playerSeason = 20182019
const playerId = 8476792

//GET Player Route

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

module.exports = router