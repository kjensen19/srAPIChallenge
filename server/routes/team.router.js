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



module.exports = router