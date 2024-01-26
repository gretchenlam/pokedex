import './App.css';
import { useState } from "react"; 
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "", 
    pokedexNum: "", 
    img: "", 
    hp: "",
    attack: "",
    defense: "",
    specialAttack: "",
    specialDefense: "",
    speed: "",
    type1: "",
    type2: ""
  });

  function lowerCaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        if (response.data.types.length > 1) {
          setPokemon({
            name: pokemonName, 
            pokedexNum: response.data.id, 
            img: response.data.sprites.other.showdown.front_default, 
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            specialAttack: response.data.stats[3].base_stat,
            specialDefense: response.data.stats[4].base_stat,
            speed: response.data.stats[5].base_stat,
            type1: response.data.types[0].type.name,
            type2: response.data.types[1].type.name
          })
        } else {
          setPokemon({
            name: pokemonName, 
            pokedexNum: response.data.id, 
            img: response.data.sprites.other.showdown.front_default, 
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            specialAttack: response.data.stats[3].base_stat,
            specialDefense: response.data.stats[4].base_stat,
            speed: response.data.stats[5].base_stat,
            type1: response.data.types[0].type.name
          });
        }
        console.log(response)
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokedex</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(lowerCaseFirstLetter(event.target.value));
          }}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='DisplaySection'>
        {!pokemonChosen ? (
          <h1>Please choose a Pokemon</h1>  
        ) : (
          <>
            <h1>{capitalizeFirstLetter(pokemon.name)}</h1>
            <img src={pokemon.img}/>
            <h2>Pokedex Number: {pokemon.pokedexNum}</h2>
            <h3>Type: {pokemon.type1} {pokemon.type2}</h3>
            <h4>Base Stats</h4>
            <h4>HP: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Special Attack: {pokemon.specialAttack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
            <h4>Special Defense: {pokemon.specialDefense}</h4>
            <h4>Speed: {pokemon.speed}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
