export class UtilitiesUi {
  constructor() {
    this.clickedElement = null;
  }

  // Methods
  activeClass() {
    document.addEventListener("DOMContentLoaded", () => {
      const navLinks = document.querySelectorAll(".nav-link");

      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          navLinks.forEach((link) => link.classList.remove("active"));
          e.currentTarget.classList.add("active");
          this.clickedElement = e.target.getAttribute("data-category");
        });
      });
    });
  }

  getClickedElement() {
    return this.clickedElement;
  }
}

export class GamesApi {
  constructor(gameCategory) {
    this.data = null;
    this.gameCategory = gameCategory || "shooter";
  }

  async fetchGames() {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f48877c46amsh40c9d6708285f3ap1b56cdjsnb4ea931f7ef4",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      let response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.gameCategory}`,
        options
      );
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error("Error Fetching Data:", error);
    }
  }
}

export class DisplayGames {
  constructor() {
    this.gamesArr = [];
  }

  display(data) {
    this.gamesArr = data.map((game) => ({
      title: game.title,
      short_description: game.short_description,
      genre: game.genre,
      platform: game.platform,
      thumbnail: game.thumbnail,
      id: game.id,
    }));

    let cartona = "";
    for (var i = 0; i < this.gamesArr.length; i++) {
      cartona += `
      <div class="col">
            <div class="card item h-100 bg-transparent" role="button" data-id="${this.gamesArr[i].id}">
              <div class="card-body">
                <figure class="position-relative">
                  <img class="card-img-top object-fit-cover h-100" src="${this.gamesArr[i].thumbnail}" alt="">
                </figure>
                <figcaption>
                  <div class="hstack justify-content-between">
                    <h3 class="h6 small text-white">${this.gamesArr[i].title}</h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                  </div>
                  <p class="card-text small text-center opacity-50 text-white-50">${this.gamesArr[i].short_description}</p>
                </figcaption>
              </div>
              <footer class="card-footer small hstack justify-content-between">
                <span class="badge badge-color">${this.gamesArr[i].genre}</span>
                <span class="badge badge-color">${this.gamesArr[i].platform}</span>
              </footer>
            </div>
          </div>
      `;
    }
    document.getElementById("gameData").innerHTML = cartona;
  }

  displayDetails() {
    document.getElementById("games").classList.add("d-none");
    document.getElementById("details").classList.remove("d-none");
  }

}
