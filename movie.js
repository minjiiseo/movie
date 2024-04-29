const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYThhNTEyMTNmNWEwMTRlMzk2YjAzZWM2ODY4YTZiMSIsInN1YiI6IjY2MmI1OWNlYjU0MDAyMDExZTA0MmU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.05rWribbMg8c3nBPUga39J4s7VeEPXZ68bTTHhCYsW8',
  },
};

let callMovie = () => {
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then((response) => response.json())
    .then((response) => {
      loadMovie(response);
    })
    .catch((err) => console.error(err));
};

let loadMovie = (data) => {
  let movieInfo = data.results;

  const cardList = document.querySelector('.card-list');

  movieInfo.forEach((value) => {
    let movieCard = document.createElement('div');
    movieCard.setAttribute('class', 'movie-card');
    movieCard.setAttribute('id', value.id);
    movieCard.onclick = () => {
      alert('영화 id : ' + value.id);
    };

    let imgTag = document.createElement('img');
    imgTag.setAttribute('src', 'https://image.tmdb.org/t/p/w780' + value.poster_path);

    let titleTag = document.createElement('h3');
    titleTag.setAttribute('class', 'movie-title');
    titleTag.innerText = value.original_title;

    let descriptionTag = document.createElement('p');
    descriptionTag.innerText = value.overview;

    let ratingTag = document.createElement('p');
    ratingTag.innerText = 'rating : ' + value.vote_average;

    movieCard.appendChild(imgTag);
    movieCard.appendChild(titleTag);
    movieCard.appendChild(descriptionTag);
    movieCard.appendChild(ratingTag);

    cardList.appendChild(movieCard);
  });
};

const searchBtn = document.querySelector('#search-btn');
searchBtn.onclick = function () {
  let text = document.getElementById('search-input').value;
  let cards = Array.from(document.querySelectorAll('.movie-card'));

  cards.forEach((movie) => {
    movie.style.display = '';
  });

  cards = cards.filter((movie) => {
    return movie.childNodes[1].innerText.toUpperCase().search(text.toUpperCase()) < 0;
  });

  cards.forEach((movie) => {
    movie.style.display = 'none';
  });
};

callMovie();
