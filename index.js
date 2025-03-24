import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters(page, searchQuery) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const data = await response.json();
  return data;
}

async function characterCard(page, searchQuery) {
  const data = await fetchCharacters(page, searchQuery);
  maxPage = data.info.pages;
  pagination.textContent = `${page}/${maxPage}`;
  cardContainer.innerHTML = "";
  const characters = data.results;
  characters.forEach((character) => {
    const characterName = character.name;
    const imageSource = character.image;
    const status = character.status;
    const characterType = character.type ? character.type : "nill";
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

characterCard(page, searchQuery);

prevButton.addEventListener("click", () => {
  page === 1 ? (page = 1) : (page = page - 1);
  characterCard(page, searchQuery);
});

nextButton.addEventListener("click", () => {
  page === maxPage ? (page = maxPage) : (page = page + 1);
  characterCard(page, searchQuery);
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  searchQuery = data.query;
  characterCard(1, searchQuery);
});
