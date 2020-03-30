// DOM Objects
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');

console.log(pokeListItems);

// Constants and Variables
const TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy'
];

// Functions
// Will capitalize first letter of string
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

// Will remove last instance of Pokemon
const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        mainScreen.classList.remove(type);
    }
};

// Get data for left-side of script - each Pokemon
fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(res =>  res.json())
    .then(data => {
        resetScreen();

        //Displays Pokemon's data type(s)
        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = capitalize(dataTypes[0]['type']['name']);
        //If second data type exists, it will display, if not it will hide
        if (dataSecondType) {
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
        } else  {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }
        //Changes the background color to Pokemon's type
        mainScreen.classList.add(dataFirstType['type']['name']);

        //Display's name, id, height, and weight
        pokeName.textContent = capitalize(data['name']);
        pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];

        //Displays Pokemon's sprite(s) if exists 
        pokeFrontImage.src = data['sprites']['front_default'] || '';
        pokeBackImage.src = data['sprites']['back_default'] || '';
    });

// Get data for right-side of script - Pokemon list
fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20') // Can only fit 20 per page
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const { results } = data;

        for (let i = 0; i < pokeListItems.length; i++) {
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];

            if (resultData) {
                const { name, url } = resultData;
                const urlArray = url.split('/');
                const id = urlArray[urlArray.length - 2];
                pokeListItem.textContent = id + '. ' + capitalize(name);
            } else {
                pokeListItem.textContent = '';
            }
        }
    });