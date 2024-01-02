const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector("#inputBox");

const showMoviesData = (data) => {
  movieContainer.innerHTML = "";
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-Info");
  movieElement.innerHTML = `<h2>${Title}</h2>
                         <p><strong>Rating : &#11088</strong>${imdbRating}</p>`;
  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-Genre");

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = element;
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += `<p><strong>Released Date :</strong>${Released}</p>
                            <p><strong>Duration :</strong>${Runtime}</p> 
                            <p><strong> Actor :</strong>${Actors}</p> 
                            <p><strong> plot :</strong>${Plot}</p> `;
  //creating div for movie poster
  const moviePoster = document.createElement("div");
  moviePoster.classList.add("movie-post");
  moviePoster.innerHTML = `<img src="${Poster}"/>`;
  movieContainer.appendChild(moviePoster);
  movieContainer.appendChild(movieElement);
};
// Getting data from api
const getMovieInfo = async (movie) => {
  try {
    const apiKey = "880c065";
    const URL = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;

    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Unable to find");
    }
    const data = await response.json();

    showMoviesData(data);
  } catch (error) {
    showErrorMessage("no movie found");
  }
};

// For showing error massage
const showErrorMessage = (massage) => {
  movieContainer.innerHTML = `<h2>${massage}</h2>`;
  movieContainer.classList.add("noBackround");
};
const handleSubmission = (e) => {
  e.preventDefault();
  //   console.log(inputBox.value);

  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    getMovieInfo(movieName);
  } else {
    showErrorMessage("Enter your movie name to get information");
  }
};

searchForm.addEventListener("submit", handleSubmission);
