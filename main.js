
const poke_container = document.querySelector(".poke-container")
const search= document.querySelector(".search")
const searchBtn= document.querySelector(".searchBtn")
const searchInput= document.querySelector(".searchInput")

const pokemon_count=151



const bg_color = {
    grass: '#8BD369',
    fire: '#FF603F',
    water: '#3399FF',
    bug: '#AABB22',
    normal: '#AAAA99',
    flying: '#9AA8FA',
    poison: '#B76EA4',
    electric: '#FFD34E',
    ground: '#E2C56A',
    fairy: '#F1A8EC',
    psychic: '#FF6EA4',
    fighting: '#C56E5C',
    rock: '#C5B679',
    dragon: '#7766EE',
    ice: '#66CCFF', 
}

searchBtn.addEventListener('click', () => {
    search.classList.toggle('active')
  })

 searchInput.addEventListener("input", (e)=>{
const searchValue = searchInput.value.toLowerCase()
const pokemonNames = document.querySelectorAll(".poke-name")
//console.log(pokemonNames)
pokemonNames.forEach((pokemonName) => {
    pokemonName.parentElement.parentElement.style.display = 'block'

    if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = 'none'
    }
  })
})

const fetchPokemons = async()=>{
    for (let i = 1; i < pokemon_count; i++) {
        await getPokemon(i);
    }
} 

const getPokemon= async(id)=>{
    const url=`https://pokeapi.co/api/v2/pokemon/${id}`
    const res= await fetch(url)
    const data= await res.json()
    createPokemonCard(data)
}
fetchPokemons()
const createPokemonCard = (pokemon)=>{
    const PokemonDiv= document.createElement("div")
    PokemonDiv.classList.add("pokemon")

    const pokemonId=pokemon.id.toString().padStart(3,'0')

    const pokemonType = pokemon.types[0].type.name
    const pokemonBg = bg_color[pokemonType]
    PokemonDiv.style.backgroundColor = `${pokemonBg}`
    const pokemonDivInnerHTML=`
    <div class="image-container">
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
      alt="First Pokemon"
    />
  </div>
  <div class="poke-info">
    <span class="poke-id">#${pokemonId}</span>
    <h3 class="poke-name">${pokemon.name}</h3>
    <div class="small">
      <small class="poke-exp"
        ><i class="fa-solid fa-flask"></i> <span>${pokemon.base_experience} </span></small
      >
      <small class="poke-weight"
        ><i class="fa-sol fa-weight-scale"></i>
        ${pokemon.weight} kg </small
      >

    </div>
    <div class="poke-type">
      <i class="fa-brands fa-uncharted"></i> ${pokemonType}
    </div>

  </div>`
  PokemonDiv.innerHTML = pokemonDivInnerHTML
  poke_container.appendChild(PokemonDiv)
}

fetchPokemons()
