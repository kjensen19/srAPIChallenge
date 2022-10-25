const express = require('express');
const router = express.Router()
const axios = require('axios');
const fs = require("fs")

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

        // (A) DATA ARRAY
        // var data = [
        //     ["Alpha", "Beta"],
        //     ["Charlie", "Delta"],
        //     ["Echo", "Foxtrot"]
        // ];
  
  // (B) WRITE TO FILE
        // const fs = require("fs");
        // const stream = fs.createWriteStream("demoC.csv");
        // for (let i of data) { stream.write(i.join(",") + "\r\n"); }
        // stream.end();
        // console.log("Done!");


        const fs = require('fs')
const header = ['playerId', 'playerName', 'currentTeam', 'playerAge', 'playerNumber', 'playerPosition', 'isRookie', 'assists', 'goals', 'games', 'hits', 'points'];

const dataArrays = [
[playerId, player.fullName, player.currentTeam.name, player.currentAge, player.primaryNumber, player.primaryPosition.name, player.rookie, season.assists, season.goals, season.games, season.hits, season.points],
];

const val = [header].concat(dataArrays).map(arr => arr.join(',')).join('\r\n');

fs.writeFile(`${playerId + playerSeason}.csv`, val, err => {
  if(err) console.error(err);
  else console.log('Ok');
})


        res.send(playerObject)

    })
    
    

    
    })

module.exports = router