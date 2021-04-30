function Header({ avgWeight, mostBaseExpPokeName, filterForm }) {
    return (
        <header>
            <h2>Average Weight of all Pokemon</h2>
            <p>{avgWeight}</p>
            <h2>Pokemon with most base experience</h2>
            <p>{mostBaseExpPokeName}</p>
            {filterForm}
        </header>
    )
}

export default Header