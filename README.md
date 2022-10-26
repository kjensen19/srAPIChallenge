# sportradarAPIChallenge

## Description

    Duration: ~4 days

The basic challenge was to access a collection of API endpoints to extract player or team data, transform that data into the requested pieces, and then load it to a CSV file. The app presents two inputs for player(ID and Seaosn) or two inputs for team(ID and Season) information. These parameters are captured and sent to the server via a GET request, on the server side the params are extracted and then used in the requisite API endpoints. The API calls are made concurrently, utilizing async functions to create an array of promises that contain the needed data once fulfilled. This data is parsed to extract the actual required pieces and then a CSV file is constructed with headers and the data. This file is sent back to the client as a download.

The majority of the unit testing was done via Postman, and console logging (and manual testing). Obviously in an appplication of this size that was manageable but it is not a scalable approach. If I was to continue working on this app I would want to incorporate more rigorous testing with something like Jest, which I have not used but have been reading up on.

In terms of future features, obviously further input validation would be towards the top of my list. While controlling the year input is a step towards controlling some sources of user errors, I would want to add a check to the team options that disables teams who were not active in that season. A similar piece of logic with players/seasons would be another large step in the right direction. Also on the client side I would love to revfactor the season list to generate recursively since it ends up being (year)(year+1), (year+1)(year+1+1) etc. I would also like to expand the inputs/APIs queried to build more robust data as well as providing the option to write multiple records to CSV before downloading on the client side.


### Prerequisites
- [Node.js](https://nodejs.org/en/)


## Installation


1. Make sure you have a recent copy of NodeJS installed
2. Open up your editor of choice and run an `npm install`(react 18 etc)
3. Run `npm run server` in your terminal to start the node runtime
4. Run `npm run client` in your terminal to start the React engine
5. The `npm run client` command will open up a new browser tab for you!


## Usage
1. On page load a basic input page is displayed, featuring the inputs outlined above and buttons to submit
2. After entering a player ID and selecting a season pressing the Player Info button will extract information on that player and season
3. After extraction and transformation this data is sent back to the client as a CSV file
4. The same process takes place when querying the team access point, except that both team and season are select menus
5. After a successful cycle the inputs are cleared and the client can enter new information to produce a new CSV file


## Built With
HTML/CSS/JS
Material UI
React 18
Nodejs
axios/express for http requests
NHL APIs


## Acknowledgement
Thank you to Pat S. for fielding my rambling questions, Sportradar for providing a code challenge with such a great culture of respect behind it. Also thanks to Matt Black for equipping me to handle these types of challenges (and being a passionate advocate for Ruby), L'engle for being amazing and my family for giving me the space to work and the encouragment to chase my passions.


## Support
If you have suggestions or issues, please email me at kjensen19@gmail.com