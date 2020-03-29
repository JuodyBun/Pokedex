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

console.log(pokeName);

//API connection; first connect with .json file; then displays Pokemon info
fetch('https://pokeapi.co/api/v2/pokemon/10')
    .then(res =>  res.json())
    .then(data => {
        console.log(data);
        mainScreen.classList.remove('hide');
        //Display's name, id, height, and weight
        pokeName.textContent = data['name'];
        pokeId.textContent = data['id'];
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];

        //Displays Pokemon's data type(s)
        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = dataTypes[0]['type']['name'];
        //If second data type exists, it will display, if not it will hide
        if (dataSecondType) {
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = dataSecondType['type']['name'];
        } else  {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }

        //Displays Pokemon's sprite(s) if exists
        pokeFrontImage.src = data['sprites']['front_default'] || '';
        pokeBackImage.src = data['sprites']['back_default'] || '';
    });
