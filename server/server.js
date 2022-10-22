const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const playerRouter = require('./routes/player.router')
const teamRouter = require('./routes/team.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/player', playerRouter)
app.use('/api/team', teamRouter)


app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});