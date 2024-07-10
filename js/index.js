import { UtilitiesUi, GamesApi, DisplayGames } from "../js/ui.js";
import {
  UtilitiesDetails,
  detailsAPi,
  displayDetailsData,
} from "../js/game-details.js";

const utilitUi = new UtilitiesUi();
const displayGames = new DisplayGames();
utilitUi.activeClass();

const utilitDetails = new UtilitiesDetails();

let gameCategory = null;

const loader = document.getElementById("loading");
loader.classList.remove("d-none");

document.addEventListener("DOMContentLoaded", async () => {
  const gameData = new GamesApi(gameCategory ? gameCategory : "mmorpg");
  const data = await gameData.fetchGames();
  displayGames.display(data);
  cardEvent(); // Call cardEvent after displaying data
  loader.classList.add("d-none");

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", async function () {
      gameCategory = utilitUi.getClickedElement();
      const gameData = new GamesApi(gameCategory ? gameCategory : "mmorpg");
      loader.classList.remove("d-none");
      const data = await gameData.fetchGames();
      displayGames.display(data);
      cardEvent(); // Call cardEvent after displaying data
      loader.classList.add("d-none");
    });
  });
});

document.getElementById("btnClose").addEventListener("click", function () {
  utilitDetails.closeDetailsBtn();
});

function cardEvent() {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", async function () {
      displayGames.displayDetails();

      const gameDetails = new detailsAPi(this.getAttribute("data-id"));
      loader.classList.remove("d-none");
      const data = await gameDetails.fetchDetails();
      const displayDetails = new displayDetailsData();
      displayDetails.display(data);
      loader.classList.add("d-none");
    });
  }
}

// Initial call to cardEvent to attach event listeners to any initial cards
cardEvent();
