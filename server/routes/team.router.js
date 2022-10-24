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
const teamId = 1

const dataStore = {}
const teamAPI = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.stats`
const seasonAPI = `https://statsapi.web.nhl.com/api/v1/people/${teamId}/stats?stats=statsSingleSeason&season=${teamSeason}`

const apiResources = [teamAPI]

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
        const team = compositeData[teamAPI].teams
        // const season = compositeData[seasonAPI].stats[0].splits[0].stat
        console.log('team', team[0].teamStats[0].splits[0].stat)
        // console.log('season', season)
        
        const teamObject = {
            teamId: teamId,
            teamName: team[0].name,
            teamVenue: team[0].venue.name,
            teamGames: team[0].teamStats[0].splits[0].stat.gamesPlayed,
            teamWins: team[0].teamStats[0].splits[0].stat.wins,
            teamLosses: team[0].teamStats[0].splits[0].stat.losses,
            teamPoints: team[0].teamStats[0].splits[0].stat.pts,
            teamGoalsPerGame: team[0].teamStats[0].splits[0].stat.goalsPerGame,
            teamFirstGame: '',
            teamFirstOpponent: ''


        }

        console.log('pre-send teamObject', teamObject)
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