import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

// shortens the title to be display to a limited number
// title -  title to shorten
// limit - how long the title can be
export const displayTitle = (title, limit = 16) => {
  var newTitle = '';

  // make a list of each word and add to a string as long as that string is below the limit
  title.split(' ').reduce((total, word) => {
    if(total === 0) {
      newTitle = word;
    } else if(word === '-') {
      // - means that there are multiple titles within that title
      // just display the first one
      total = limit;
    } else if((total + word.length) < limit) {
      newTitle += ' ' + word;
    }

    // +1 for the space between words
    return total + word.length + 1;
  }, 0);

  return (title.length > limit) ? newTitle + '...' : newTitle;
}

// adds a style sheet to HTML document
// sheetName - name of style sheet
export const addStyleSheet = (sheetName) => {
  const headContainer = document.querySelector('head');
  const link = document.createElement(`link`);
  link.className = "extra-sheet";
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `/${sheetName}.css`;
  headContainer.append(link);
}

// display the trailer of the movie that was passed
// if no trailer is given then just the title of the movie will be displayed
// - movie: movie that contains a trailer
export const displayVideo = (movie) => {
  const videos = movie.videos.results;
  return(
      <div className="container-trailer">
        {(videos.length > 0) ?
        <iframe className="trailer" title="movie trailer" src={`https://www.youtube.com/embed/${videos[0].key}`}></iframe> :
        <h2 className="no-poster">{this.props.dailyMovie.title}</h2>}
      </div>
  );
}

// display the poster, title, rating, and tagline of a movie
// clicking on the poster will take user to the movie page
// - movie: movie containing the information to be displayed
// - callback: handles what happens when star on poster is clicked
// - extraHTML: anything that needs to be displayed within the container but after this information above
export const displayBanner = (movie, extraHTML, callback) => {
  // onClick={(event) => this.handleFavorite('whatsNext', nextMovie, event)}>
  return(
    <div className="container-movie-details movieID daily-movie" movieid={movie.id}>
      <div className="container-movie-title">
        <div className="container-poster poster">
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>
          <Link to={`/movie/${movie.id}`}><span className="highlight"></span></Link>
          <a className="favorite"
             onClick={(event) => callback(movie, event)}>
            <i className="fa fa-star-o"></i>
          </a>
        </div>

        <div className="container-movie-description">
          <div className="movie-description">
           <h1>{movie.title}</h1>
            <div>
              <h3>
                {displayStars(movie.vote_average)}
                <p>({movie.vote_count})</p>
              </h3>
            </div>
            <h3>{displayTagline(movie.tagline)}</h3>
          </div>
        </div>
      </div>

      {extraHTML}
    </div>
  );
}

// Takes a ranking from 0 - 10 and displays it as a 0 - 5 star ranking system
// averageStars - number between 0 - 10
 export const displayStars = (averageStars) => {
  var maxStars = 5;
  var markup = [];
  const stars = Math.floor(averageStars) / 2;
  let countKey = 0;

  // add a filled in star
  for(var i = 0; i < Math.floor(stars); i++){
    markup.push(<i className="fa fa-star" key={countKey}></i>);
    countKey++;
  }
  // if there is a remainder of stars add half star
  if(Math.floor(averageStars) % 2 > 0) {
    markup.push(<i className="fa fa-star-half-o" key={countKey}></i>);
    countKey++;
    maxStars--;
  }
  // if there is less stars than 5 add empty star for each one that is missing
  for(var j = 0; j < maxStars - stars; j++){
    markup.push(<i className="fa fa-star-o" key={countKey}></i>);
    countKey++;
  }

  return markup;
 }

// remove any punctuation within string
// tagline - tagline of the movie
export const displayTagline = (tagline) => {
  return tagline.replace(/[^\w\s]|_/g, "");
}

// toggles the star on the poster of the movie that was passed
// event - event that called this function
// return - if the movie is currently favored
export const isFavorite = (event) => {
  let element = event.target;
  if(element.matches('a')) {
    element = element.firstChild;
  }

  return element.getAttribute('class').includes('fa-star-o');
}

// toggles the star on the poster of the movie that was passed
// event - event that called this function
// return - if the movie is currently favored
export const toggleFavorite = (event) => {
  let element = (event.target) ? event.target : event;
  if(element.matches('a')) {
    element = element.firstChild;
  }

  const starNotFilled = element.getAttribute('class').includes('fa-star-o');
  element.setAttribute('class', `${starNotFilled ? 'fa fa-star star-fill' : 'fa fa-star-o'}`);

}

//
// SectionKey - the list the movie belongs to from the state
// event - event that fired off this action
// movie - the movie that is being favored
// callback - function to call when the X is clicked
export const displayFavoriteToList = (sectionKey, event, movie, callback) => {
  const markup = `
    <li>
      <a class="favorited-item ${sectionKey}" movieid="${movie.id}">
        ${(movie.poster_path) ? `<img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title} poster"/>` : ''}
        <h4>${movie.title}</h4>
        <div class="highlight">
          <span class="btn-remove"><i class="fa fa-times"></i></span>
        </div>
      </a>
    </li>
  `;

  // just add a click listener if you have to
  document.querySelector('.favorite-list').insertAdjacentHTML('beforeend', markup);
  const clickRemove = document.querySelector(`.${sectionKey} .btn-remove`);
  clickRemove.addEventListener('click', () => {callback(event, movie)}, false);
}

// Removes the movie from being displayed in the favorite list
// movie - movie that is being removed
export const removeDisplayedFavorite = (movie) => {
  const target = document.querySelector(`.favorited-item[movieID="${movie.id}"]`);
  if(target) target.parentNode.remove(target);
}

export const checkFavoriteOnLoad = (movies) => {
  console.log('Movies: ', movies);
  movies.forEach(movie => {
    const target = document.querySelector(`[movieID="${movie.id}"] .favorite i`);
    console.log('Target: ', target);
    if(target) toggleFavorite(target);
  });
}
