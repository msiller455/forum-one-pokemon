function Header({ avgWeight, mostBaseExpPokeName }) {
    return (
        <header>
            <h2>Average Weight of all Pokemon</h2>
            <p>{avgWeight}hg</p>
            <h2>Pokemon with most base experience</h2>
            <p>{mostBaseExpPokeName}</p>

        </header>
    )
}

export default Header