import React, { useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumb'

const App = () => {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()
    setLoadMore(data.next)

    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
      })
    }
    createPokemonObject(data.results)
  }
  allPokemons.sort((a, b) => a.id - b.id)
  useEffect(() => {
    getAllPokemons()
  }, [])


  return (
    <>
      <div className="app-contaner">
        <div className="title">
          <span>Pokémon</span>
          <span>Gotta catch 'em all</span>
        </div>
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemons.map((pokemonStats, index) =>
              <PokemonThumb
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.other.dream_world.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
                data={allPokemons}
              />)}

          </div>
          <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
        </div>
      </div>

    </>
  );
}

export default App;
