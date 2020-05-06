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
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');


// Constants and Variables
const TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy'
];
let prevUrl = null;
let nextUrl = null;

// FUNCTIONS
// Will capitalize first letter of string
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

// Will remove last instance of Pokemon
const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        mainScreen.classList.remove(type);
    }
};

// Get data for right-side of script - Pokemon list
const fetchPokeList = url => {
    fetch(url) // Can only fit 20 per page
    .then(res => res.json())
    // Navigation control; Prev, Next
    .then(data => {
        const { results, previous, next } = data;
        prevUrl = previous;
        nextUrl = next;

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
}

// Get data for left-side of script - each Pokemon
const fetchPokeData = id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res =>  res.json())
    .then(data => {
        resetScreen();

        //Declare values of Pokemon's data type(s)
        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];

        
        //If second data type exists, it will display, if not it will hide
        if(dataTypes[1]) {
            const dataFirstType = dataTypes[1];
            const dataSecondType = dataTypes[0];
            pokeTypeTwo.classList.remove('hide');
            pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
            pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
            mainScreen.classList.add(dataFirstType['type']['name'])
        }
        else {
            const dataFirstType = dataTypes[0];
            pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = "";
            mainScreen.classList.add(dataFirstType['type']['name'])
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
}

// Left-button click (PREV) to view Pokemon list
const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
};

// Right-button click (NEXT) to view Pokemon list
const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
};

// Clicks on and displays individual Pokemon's data
const handleListItemClick = (e) => {
    if (!e.target) return;

    const listItem = e.target;
    if (!listItem.textContent) return;

    const id = listItem.textContent.split('.')[0];
    fetchPokeData(id);
};

// Adding event listeners
leftButton.addEventListener('click', handleLeftButtonClick);
rightButton.addEventListener('click', handleRightButtonClick);
for (const pokeListItem of pokeListItems) {
    pokeListItem.addEventListener('click', handleListItemClick)
}

// Initialize App
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');