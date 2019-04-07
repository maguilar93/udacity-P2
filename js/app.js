/*
 * Create a list that holds all of your cards
 */
let cards = document.querySelectorAll(".card");
let cardsArr = [...cards];
let openCardsArr = [];
let deck = document.querySelector(".deck");
let clicks = [];
let moves = document.querySelector(".moves");
let stars = document.querySelector(".stars");
let winning = [];
let firstStar = stars.firstElementChild;
let playAgain = document.getElementById("restart");
let congratsMsg = document.getElementById("congratsDialog");
let score = document.querySelector(".score");
let timerDisplay = document.getElementById("timerDisplay");
let restart = document.querySelector(".restart");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function 
function reset() {
  cardsArr = shuffle(cardsArr);
  for (let i = 0; i < cardsArr.length; i++) {
    cardsArr.forEach(i => deck.appendChild(i));
    cardsArr[i].classList.remove("open", "show", "match");
  }
  winning.length = 0;
  clicks.length = 0;
  moves.innerHTML = 0;
  openCardsArr.length = 0;
  timerDisplay.innerHTML = 0;
  clearTimer();
}
reset();

restart.addEventListener("click", clearTimer);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// main function to show elements on click
function showCard() {
  if (
    event.target.nodeName === "LI" &&
    !event.target.classList.contains("open")
  ) {
    event.target.classList.add("open");
    event.target.classList.add("show");
    addOpenCardsToArr();
    countMoves();
    ratingStars();
    matchCards();
    won();
  }
}

// function to add cards to array
function addOpenCardsToArr() {
  openCardsArr.push(event.target);
}

// function to check if cards match or not
function matchCards() {
  const first = openCardsArr[0];
  const second = openCardsArr[1];
  for (let openCard of openCardsArr) {
    if (first.innerHTML === second.innerHTML) {
      openCard.classList.add("match");
      openCard.classList.remove("open", "show");
      winning.push(openCard);
    } else {
      setTimeout(function wrongMatch() {
        openCard.classList.remove("open", "show");
      }, 1000);
    }
  }
  for (let i = 0; i < openCardsArr.length; i++) {
    removeCards();
  }
}

// function to remove the cards from array once used
function removeCards() {
  openCardsArr.length = 0;
}

// function to count moves - every click, count moves
function countMoves() {
  clicks.push(event.target);
  moves.innerHTML = clicks.length;
}

// function to rate stars
function ratingStars() {
  if (moves.innerHTML < 20 && moves.innerHTML >= 0) {
    firstStar.style.display = "inline";
    firstStar.nextElementSibling.style.display = "inline";
  } else if (moves.innerHTML >= 20 && moves.innerHTML < 40) {
    firstStar.style.display = "none";
  } else {
    firstStar.nextElementSibling.style.display = "none";
  }
}

// function to congratulate the player if all cards are turned
function won() {
  if (winning.length === 16) {
    congratsMsg.showModal();
    clearInterval(timer);
    score.innerHTML = `You scored ${stars.innerHTML} in  ${
      timerDisplay.innerHTML
    } secs`;
  }

  playAgain.addEventListener("click", function() {
    congratsMsg.close();
    reset();
    clearTimer();
  });
}

// function to start timer when first click
function timer() {
  var sec = 0;
  timer = setInterval(function() {
    if (clicks.length >= 1) {
      sec += 1;
      timerDisplay.innerHTML = sec;
    }
  }, 1000);
}

// function to restart function after clearing it
function clearTimer() {
  clearInterval(timer);
  var sec = 0;
  timer = setInterval(function() {
    if (clicks.length >= 1) {
      sec += 1;
      timerDisplay.innerHTML = sec;
    }
  }, 1000);
}
