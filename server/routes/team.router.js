const express = require('express');
const router = express.Router()
const axios = require('axios');
const fs = require('fs')



//REQUIRED INFO:
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



//create store point for data(promises for async below)
const dataStore = {}
var newTeam


//Server side endpoint of team GET
//Makes API get requests and once all are complete uses responses to assemble write a csv file which is then provided as a download
router.get('/:teamId/:teamSeason', (req, res) =>{
    try{
    //Capture params passed from client
    const teamId = req.params.teamId
    const teamSeason = req.params.teamSeason

    //create variables for needed API endpoints
    const teamAPI = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.stats`
    const seasonAPI = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats?expand=team.roster&season=${teamSeason}`
    const firstGameAPI = `https://statsapi.web.nhl.com/api/v1/schedule/?teamId=${teamId}&season=${teamSeason}&gameType=R`

    //put API endpoint variables into an array
    const apiResources = [teamAPI, seasonAPI, firstGameAPI]

    //async function to get API data and write to data object(looped over in the call)
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

        //call async functions then parse the results of the completed promises
    getAllResources().then(promiseRes =>{
        const compositeData = dataStore
        console.log('composite data = ', compositeData)
        const team = compositeData[teamAPI].teams[0]
        const season = compositeData[seasonAPI].stats[0].splits[0].stat
        const firstGame = compositeData[firstGameAPI].dates[0].games[0]
        const awayTeam = firstGame.teams.away.team.name
        const homeTeam = firstGame.teams.home.team.name
        console.log('awayTeam = ', awayTeam)
        console.log('homeTeam', homeTeam)

        console.log('team', team)
        console.log('season', season)
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
        //Headers for CSV file
        const teamHeader = ['teamId', 'teamName', 'teamSeason', 'teamVenue', 'teamGames', 'teamWins', 'teamLosses', 'teamPoints', 'teamGoalsPerGame', 'teamFirstGame', 'teamFirstOpponent'];
        //Data for CSV
        const teamArrays = [
            [teamId, team.name, teamSeason, team.venue.name, season.gamesPlayed, season.wins, season.losses, season.pts, season.goalsPerGame, firstGame.gameDate, awayTeam === team.name ? homeTeam : awayTeam],
            ];
        //maps header and data to Comma Seperated Values
        const val = [teamHeader].concat(teamArrays).map(arr => arr.join(',')).join('\r\n');
            //Actually writes the values to a CSV file
        newTeam = `${teamId + teamSeason}.csv`
        fs.writeFile(`public/${newTeam}`, val, err => {
        if(err) console.error(err);
        else res.send(newTeam);
        })
        

        console.log('pre-send teamObject', teamObject)
        //Provides the file as a download on return

    })
    }catch(error){
        console.log('Error in team GET', error)
        res.sendStatus(500)

    }

    })

module.exports = router