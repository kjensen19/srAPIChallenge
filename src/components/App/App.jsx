import axios from 'axios'


function App(){

    const handleClick = () => {  axios({
        method: 'GET',
        url: '/api/player'
      }).then((response) => {
        console.log('get response: ', response.data)
      }).catch((error) => {
        console.log('client side get error', error)
      })
    }

    return(
        <button onClick={handleClick}>Test</button>
    )
}

export default App