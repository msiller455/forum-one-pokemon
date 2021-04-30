function Header({ avgWeight, mostBaseExpPokeName, filterForm }) {
    return (
        <header className='Header'>
            <h1>Forum One Pokemon App</h1>
            <h2>Average Weight of all Pokemon</h2>
            <p className='Header__p'>{avgWeight}</p>
            <h2>Pokemon with most base experience</h2>
            <p className='Header__p'>{mostBaseExpPokeName}</p>
            {filterForm}
        </header>
    )
}

export default Header