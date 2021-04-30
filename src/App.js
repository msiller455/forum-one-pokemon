import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [ allPokemon, setAllPokemon ] = useState([])


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
  }, [])

  return (
    <div>
      Forum One Pokemon App
    </div>
  );
}

export default App;
