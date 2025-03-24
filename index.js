import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters(pageNumber) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
  );
  const data = await response.json();
  return data;
}
const characters = await fetchCharacters(1);
console.log("characters: ", characters);

function characterCard() {
  const cardContainer = document.querySelector('[data-js="card-container"]');
  const cardElement = createCharacterCard();
  cardContainer.append(cardElement);
  console.log(cardContainer);
}

characterCard();
