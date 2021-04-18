const pokedex = document.getElementById("pokedex");
console.log(pokedex);

//function to fetch the pokemons
const fetchPokemon=()=>{

    const promises = [];
    for(let i = 1; i <= 150; i++){
                //This is the fetchAPI
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        //promise
        //For each one of the requests we will push that promise on to uor list of promises
        promises.push(fetch(url).then((res) => res.json()));
    }
    //this will let all those individual asyncronist and run in paralel.
    Promise.all(promises).then(results =>{
        //the Map function will hiterate through an Array with some sort of items and it wll create a new array by converting each item in some way
        const pokemon = results.map(data =>({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join(", ")
        }));
        displayPokemon(pokemon);
    })
};
const displayPokemon = (pokemon) =>{
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(pokeman =>`
    <li class="card">
        <img class="card-image" src="${pokeman.image}"/ >
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
    </li>
    `)
    .join('');
    pokedex.innerHTML = pokemonHTMLString;
}
fetchPokemon();