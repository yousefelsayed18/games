export class UtilitiesDetails {
  closeDetailsBtn() {
    document.getElementById("games").classList.remove("d-none");
    this.resetFields();
  }

  resetFields() {
    document.getElementById("gameTitle").innerHTML = "";
    document.getElementById("gameImage").setAttribute("src", "");
    document.getElementById("gameCategory").innerHTML = "";
    document.getElementById("gamePlatform").innerHTML = "";
    document.getElementById("gameStatus").innerHTML = "";
    document.getElementById("gameDescription").innerHTML = "";
    document.getElementById("gameLink").setAttribute("href", "");
  }
}

export class detailsAPi {
  constructor(id) {
    this.data = null;
    this.id = id;
  }

  async fetchDetails() {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f48877c46amsh40c9d6708285f3ap1b56cdjsnb4ea931f7ef4",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      let response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`,
        options
      );
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error("Error Fetching Data:", error);
    }
  }
}

export class displayDetailsData {
  display(data) {
    this.gameDetails = {
      title: data.title,
      thumbnail: data.thumbnail,
      genre: data.genre,
      platform: data.platform,
      status: data.status,
      description: data.description,
      game_url: data.game_url,
    };

    document.getElementById("gameTitle").innerHTML = this.gameDetails.title;
    document
      .getElementById("gameImage")
      .setAttribute("src", this.gameDetails.thumbnail);
    document.getElementById("gameCategory").innerHTML = this.gameDetails.genre;
    document.getElementById("gamePlatform").innerHTML =
      this.gameDetails.platform;
    document.getElementById("gameStatus").innerHTML = this.gameDetails.status;
    document.getElementById("gameDescription").innerHTML =
      this.gameDetails.description;
    document
      .getElementById("gameLink")
      .setAttribute("href", this.gameDetails.game_url);
  }
}
