const express = require('express');
const router = express.Router()
const axios = require('axios');



//GET Player Route

router.get('/', (req, res) =>{
    const playerId = 8476792
    axios({
        method: 'GET',
        url: `https://statsapi.web.nhl.com/api/v1/people/${playerId}`
    })
    .then(result => {
        console.log(result.data.people)
        res.send(result.data.people)
    })
    .catch(err => {
        console.log('GET failed', err)
        res.sendStatus(500)
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