function Pagination({ pokemon, pokemonPerPage, currentPage, setCurrentPage }) {
    // Number of pages we will have total
    const pages = Math.ceil(pokemon.length / pokemonPerPage)
    // Number of Pagination buttons we will have at once (currently limiting it to 3 buttons)
    const pageLimit = pages > 3 ? 3 : pages
    
    function nextPage() {
        setCurrentPage(currentPage + 1)
    }

    function previousPage() {
        setCurrentPage(currentPage - 1)
    }

    function changePage(e) {
        setCurrentPage(parseInt(e.target.textContent))
    }

    // Function that determines which pokemon to show for each page
    function getPokemonToShow() {
        const startIdx = currentPage * pokemonPerPage - pokemonPerPage
        const endIdx = startIdx + pokemonPerPage
        return pokemon.slice(startIdx, endIdx)
    }

    // Function that dynamically creates pagination buttons
    function getPaginationButtons() {
        // Determine which number button to start at 
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
        // Return a new array with numbers increment up from the start 
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
    }

    function formatAbilities(abilitiesArr) {
        return abilitiesArr.map(abilityObj => abilityObj.ability.name).join(', ')
    }

    return (
        <div className='Pagination'>
            <table className='Pagination__table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Abilities</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getPokemonToShow().map(poke => {
                            return (
                                <tr key={poke.name}>
                                    <td>{poke.name}</td>
                                    <td>{poke.height + 'dm'}</td>
                                    <td>{poke.weight + 'hg'}</td>
                                    <td className='td-abilities'>{formatAbilities(poke.abilities)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='Pagination__btns'>
                <button
                    onClick={previousPage}
                    disabled={currentPage === 1}
                    className='prev-next-btns'
                >
                    Previous Page
                </button>
                {
                    getPaginationButtons().map((item, idx) => 
                        <button
                            key={item}
                            onClick={changePage}
                            disabled={currentPage === item}
                        >
                            {item}
                        </button>
                    )
                }
                <button
                    onClick={nextPage}
                    disabled={currentPage === pages}
                    className='prev-next-btns'
                >
                    Next Page
                </button>
            </div>
        </div>
    )
}

export default Pagination