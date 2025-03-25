export function createCharacterCard(
  imageSource,
  characterName,
  status,
  characterType,
  occurences
) {
  const liElement = document.createElement("li");
  liElement.className = "card";
  liElement.innerHTML = `<div class="card__image-container">
  <h2 class="card__title">${characterName}</h2>
            <img
              class="card__image"
              src=${imageSource}
              alt="Rick Sanchez"
            />
            <div class="card__image-gradient"></div>
          </div>
          <div class="card__content">
            <dl class="card__info">
              <dt class="card__info-title">Status</dt>
              <dd class="card__info-description">${status}</dd>
              <dt class="card__info-title">Type</dt>
              <dd class="card__info-description">${characterType}</dd>
              <dt class="card__info-title">Occurrences</dt>
              <dd class="card__info-description">${occurences}</dd>
            </dl>
          </div>`;
  return liElement;
}
