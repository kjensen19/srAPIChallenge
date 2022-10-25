import axios from 'axios'


function App(){



    const handleTeamClick = () => {  axios({
      method: 'GET',
      url: '/api/team'
    }).then((response) => {
      console.log('get response: ', response.data)
    }).catch((error) => {
      console.log('client side get error', error)
    })
  }

    return(
      <>

        <button onClick={handleTeamClick}>Test Team</button>
      </>
    )
}

export default App