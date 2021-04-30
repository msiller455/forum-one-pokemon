import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Pagination from './components/Pagination/Pagination'
import './App.css';

function App() {
  const [ allPokemon, setAllPokemon ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ currentPage, setCurrentPage ] = useState(1)

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
    return allPokemon.reduce((acc, currPoke) => acc + parseInt(currPoke.weight), 0) / allPokemon.length + 'hg'
  }

  function getMostBaseExpPokeName() {
    // Using a reducer to compare one pokemon's base exp to the next one's, and keeping the bigger value's pokemon in the accumulator
    return allPokemon.reduce((maxBaseExpPoke, currPoke) => currPoke.base_experience > maxBaseExpPoke.base_experience ? currPoke : maxBaseExpPoke, allPokemon[0]).name
  }

  function getFilterOptions() {
    // Make a nested array of every pokemon's types objects and flatten it
    const typeArr = allPokemon.map(poke => poke.types).flat()
    // Return new array with only unique values using a Set
    return [...new Set(typeArr.map(typeObj => typeObj.type.name))]
  }

  function handleFilter(event) {
    setCurrentPage(1)
    setFilter(event.target.value)
  }

  function filterPokemonByType() {
    return allPokemon.filter(poke => poke.types.some(typeObj => typeObj.type.name === filter))
  }

  const filterForm = (
    <form>
      <label>Filter By Type</label>
      <select onChange={handleFilter}>
        <option value=''> No Filter </option>
        {
          getFilterOptions().map(option => {
            return <option key={option} value={option}>
              {option}
            </option>
          })
        }
      </select>
    </form>
  )

  if(errorMessage) return <p>{errorMessage}</p>
  return (
    <div>
      Forum One Pokemon App
      {
        allPokemon.length ?
        <>
          <Header 
            avgWeight={getAvgWeight()}
            mostBaseExpPokeName={getMostBaseExpPokeName()}
            filterForm={filterForm}
          />
          <Pagination 
            pokemon={filter ? filterPokemonByType() : allPokemon}
            pokemonPerPage={20}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
        :
        <p>Fetching data...</p>
      }
    </div>
  );
}

export default App;
