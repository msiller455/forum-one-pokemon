import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import './App.css';

function App() {
  const [ allPokemon, setAllPokemon ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=60')
    .then(response => response.json())
    .then(data => {
      // The data response contains objects with another endpoint to fetch to for each individual pokemon.
      // The Promise.all returns all the data fetched organized in an array
      return Promise.all(
        data.results.map(poke => {
          return fetch(poke.url).then(res => res.json())
        })
      )
    })
    .then(data => setAllPokemon(data))
    .catch(error => setErrorMessage(error))
  }, [])

  function getAvgWeight() {
    return allPokemon.reduce((acc, currPoke) => acc + parseInt(currPoke.weight), 0) / allPokemon.length
  }

  function getMostBaseExpPokeName() {
    // Using a reducer to compare one pokemon's base exp to next one's, and keeping the bigger value's pokemon in the accumulater
    return allPokemon.reduce((maxBaseExpPoke, currPoke) => currPoke.base_experience > maxBaseExpPoke.base_experience ? currPoke : maxBaseExpPoke, allPokemon[0]).name
  }

  if(errorMessage) return <p>{errorMessage}</p>
  return (
    <div>
      Forum One Pokemon App
      {
        allPokemon.length ?
        <>
          <Header avgWeight={getAvgWeight()} mostBaseExpPokeName={getMostBaseExpPokeName()}/>
        </>
        :
        <p>Fetching data...</p>
      }
    </div>
  );
}

export default App;
