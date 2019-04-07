// Shuffle cards - display none original / show new card
shuffle(cardsArr);
for (let i = 0; i < cards.length; i++) {
  const newCard = document.createElement("span");
  newCard.innerHTML = cardsArr[i].innerHTML;
  cards[i].appendChild(newCard);

  const originalCard = cards[i].firstElementChild;
  originalCard.style.display = "none";
}

console.log(cardsArr);
for (let card of cardsArr) {
  const newCard = document.createElement("span");
  newCard.innerHTML = card.innerHTML;
  card.appendChild(newCard);
}
