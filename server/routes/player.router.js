const express = require('express');
const router = express.Router()
const axios = require('axios');
const fs = require("fs")


//GET Player Route
//data storage while looping through async api access
const dataStore = {}
var newFile = ''





router.get('/:playerId/:playerSeason', (req, res) =>{
    //extract player id and season from get request
    try{
    const playerId = req.params.playerId
    const playerSeason = req.params.playerSeason

    //variables for the API endpoints that need to be called, with the params from above added in
    const playerAPI = `https://statsapi.web.nhl.com/api/v1/people/${playerId}`
    const seasonAPI = `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${playerSeason}`
    const apiResources = [playerAPI, seasonAPI]

    //async function to access each API endpoint and await data
    async function getResource(resource) {
        const { data } = await axios({
            method: 'GET',
            url: resource})
        dataStore[resource] = data
    }
    //maps through API array, creates an array of promises that when fulfilled supply the needed information
    async function getAllResources() {
        const apiPromises = apiResources.map(getResource)
        await Promise.all(apiPromises)
    }

    console.log('playerId:', playerId)
    console.log('playerSeason', playerSeason)
    //function call for async chain, then partially sorts data to make accessing it cleaner
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
        
    //Header values for CSV file
    const header = ['playerId', 'playerName', 'currentTeam', 'playerAge', 'playerNumber', 'playerPosition', 'isRookie', 'assists', 'goals', 'games', 'hits', 'points'];
    //DATA to build CSV
    const dataArrays = [
    [playerId, player.fullName, player.currentTeam.name, player.currentAge, player.primaryNumber, player.primaryPosition.name, player.rookie, season.assists, season.goals, season.games, season.hits, season.points],
    ];
    //Maps data and headers to csv format
    const val = [header].concat(dataArrays).map(arr => arr.join(',')).join('\r\n');
    //creates .csv file
    newFile = `${playerId + playerSeason}.csv`
    fs.writeFile(`public/${newFile}`, val, err => {
    if(err) console.error(err);
    else res.send(newFile);
    })
        //Sends download information as the response to the GET call

    })
    // 


    }
    catch(error){
        console.log('player GET error', error)
        res.sendStatus(500)
    }
    
    

    

    })

module.exports = router