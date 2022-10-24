const express = require('express');
const router = express.Router()
const axios = require('axios');



// Team Pipeline - Provide a team id and season year which outputs a CSV file. The CSV should include the following:
// Team ID
// Team Name
// Team Venue Name
// Games Played
// Wins
// Losses
// Points
// Goals Per Game
// Game Date of First Game of Season
// Opponent Name in First Game of Season
const teamSeason = 20182019
const teamId = 8476792

const dataStore = {}
const teamAPI = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.stats`
const seasonAPI = `https://statsapi.web.nhl.com/api/v1/people/${teamId}/stats?stats=statsSingleSeason&season=${teamSeason}`

const apiResources = [teamAPI, seasonAPI]

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
        const player = compositeData[teamAPI][0]
        // const season = compositeData[seasonAPI].stats[0].splits[0].stat
        console.log('player', player)
        // console.log('season', season)
        
        const teamObject = {
            teamId: teamId,
            teamName: '',
            teamVenue: '',
            teamGames: '',
            teamWins: '',
            teamLosses: '',
            teamPoints: '',
            teamGoalsPerGame: '',
            teamFirstGame: '',
            teamFirstOpponent: ''


        }


        res.send(teamObject)

    })
    
    

    
    })

    // Team ID
// Team Name
// Team Venue Name
// Games Played
// Wins
// Losses
// Points
// Goals Per Game
// Game Date of First Game of Season
// Opponent Name in First Game of Season



module.exports = router