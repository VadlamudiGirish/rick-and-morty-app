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
let maxPage = 1;
let page = 1;
const searchQuery = "";

async function fetchCharacters(page) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const data = await response.json();
  return data;
}

async function characterCard(page) {
  const data = await fetchCharacters(page);
  maxPage = data.info.pages;
  const cardContainer = document.querySelector('[data-js="card-container"]');
  cardContainer.innerHTML = "";
  const characters = data.results;
  characters.forEach((character) => {
    const characterName = character.name;
    const imageSource = character.image;
    const status = character.status;
    const characterType = character.type;
    const occurences = character.episode.length;
    const cardElement = createCharacterCard(
      imageSource,
      characterName,
      status,
      characterType,
      occurences
    );
    cardContainer.append(cardElement);
  });
}
await characterCard();
pagination.textContent = `${page}/${maxPage}`;

prevButton.addEventListener("click", async () => {
  page === 1 ? (page = 1) : (page = page - 1);
  pagination.textContent = `${page}/${maxPage}`;
  await characterCard(page);
});

nextButton.addEventListener("click", async () => {
  page === maxPage ? (page = maxPage) : (page = page + 1);
  pagination.textContent = `${page}/${maxPage}`;
  await characterCard(page);
});
