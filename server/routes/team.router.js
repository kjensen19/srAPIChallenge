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


//create store point for data
const dataStore = {}
//create variables from needed API endpoints
const teamAPI = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.stats`
const seasonAPI = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats?expand=team.roster&season=${teamSeason}`
const firstGameAPI = `https://statsapi.web.nhl.com/api/v1/schedule/?teamId=${teamId}&season=${teamSeason}&gameType=R`

//put API endpoints into an array
const apiResources = [teamAPI, seasonAPI, firstGameAPI]

//async function to get API data and write to data object
async function getResource(resource) {
    const { data } = await axios({
        method: 'GET',
        url: resource})
    dataStore[resource] = data
}

//using an async function to map over all API variables with the previous resources function
//Requests can be made concurrently and then progress is blocked until all Promises are fulfilled 
async function getAllResources() {
    const apiPromises = apiResources.map(getResource)
    await Promise.all(apiPromises)
}

//Server side endpoint of client GET
//Makes API get requests and once all are complete uses responses to assemble a data object
router.get('/', (req, res) =>{

    getAllResources().then(promiseRes =>{
        const compositeData = dataStore
        // console.log('composite data = ', compositeData)
        const team = compositeData[teamAPI].teams[0]
        const season = compositeData[seasonAPI].stats[0].splits[0].stat
        const firstGame = compositeData[firstGameAPI].dates[0].games[0]
        const awayTeam = firstGame.teams.away.team.name
        const homeTeam = firstGame.teams.home.team.name
        console.log('awayTeam = ', awayTeam)
        console.log('homeTeam', homeTeam)

        // console.log('team', team)
        // console.log('season', season)
        console.log('firstGame', firstGame)
        
        const teamObject = {
            teamId: teamId,
            teamName: team.name,
            teamSeason: teamSeason,
            teamVenue: team.venue.name,
            teamGames: season.gamesPlayed,
            teamWins: season.wins,
            teamLosses: season.losses,
            teamPoints: season.pts,
            teamGoalsPerGame: season.goalsPerGame,
            teamFirstGame: firstGame.gameDate,
            teamFirstOpponent: (awayTeam === team.name ? homeTeam : awayTeam)


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