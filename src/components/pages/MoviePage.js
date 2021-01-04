import React from 'react';
import {connect} from 'react-redux';
import {addMovieToState, addFavoriteToState, deleteFavoriteFromState} from '../../actions';
import * as Helper from '../base';

class MoviePage extends React.Component {

  componentDidMount(){
    Helper.addStyleSheet('moviepage');
    this.props.addMovieToState('movieInfo', this.props.match.params.id);
    if(this.props.favorite) Helper.checkFavoriteOnLoad(this.props.favorite);
  }

  componentWillUnmount(){
    document.querySelectorAll('.extra-sheet').forEach(node => {
      node.parentNode.removeChild(node);
    });
  }

  handleFavorite(movie, event) {
    const isFavored = Helper.isFavorite(event);
    console.log('Favorited: ' + isFavored);
    if(isFavored) {
      this.props.addFavoriteToState(movie);
      Helper.displayFavoriteToList('dailyMovie', event, movie, this.removeFavorite.bind(this));
      Helper.toggleFavorite(event);
    }else {
      this.removeFavorite(event, movie);
    }
  }

   removeFavorite(event, movie) {
    this.props.deleteFavoriteFromState(movie);
    Helper.removeDisplayedFavorite(movie);
    Helper.toggleFavorite(event);
  }

  displayMovieInfo(){
    const movie = this.props.movie;
    const company = (movie.production_companies.length > 0) ? movie.production_companies[0].name : '';
    return(
      <div className="other-info">
      <div className="overview">
        <div className="release-date">
          <p className="detail-title">Released</p><p> {movie.release_date}</p>
        </div>
        <p>{movie.overview}</p>
      </div>
      <div className="extra-details">
        <div className="detail">
          <p className="detail-title">Runtime</p>
          <p>{(movie.runtime) ? movie.runtime + 'm' : '?'}</p>
        </div>
        <div className="detail">
          <p className="detail-title">Produced</p>
          <p>{company}</p>
        </div>
        <div className="detail">
          <p className="detail-title">Budget</p>
          <p>{displayMoney(movie.budget)}</p>
        </div>
        <div className="detail">
          <p className="detail-title">Revenue</p>
          <p>{displayMoney(movie.revenue)}</p>
        </div>
        <div className="detail">
          <p className="detail-title">Language</p>
          <p>{movie.original_language}</p>
        </div>
        <div className="detail">
          <p className="detail-title">Genres</p>
          <p>{displayGenres(movie.genres)}</p>
        </div>
      </div>
    </div>
    );
  }

  render(){
    if(!this.props.movie) {
      return(
        <div className="container-movie daily-movie">
          <div className="loading"></div>
        </div>
      );
    } else {
      return(
        <div className="container-information">
          <div className="logo-tmdb">
            <img src="../img/TMDB.svg" alt="TMDB Logo"/>
          </div>

          <div className="container-recommended">
            <div className="container-movie daily-movie">
              {Helper.displayVideo(this.props.movie)}
              {Helper.displayBanner(this.props.movie, this.displayMovieInfo(), this.handleFavorite.bind(this))}
            </div>
          </div>
        </div>
      );
    }
  }
}

// takes a number and turns it into a string that is easier to read
// money - number to turn into easier read string
export const displayMoney = (money) => {
  const value = money.toString();
  // check where a comma would be in the number
  const figures = Math.ceil(value.length / 3);
  var amount = '$';

  switch(figures) {
    case 2: // if the number is in the thousands
      amount += value.substring(0, value.length - 3) + ',' + value.substring(value.length - 3, value.length);
      break;
    case 3: // if number is in the millions
      amount += (money/1000000).toFixed(1) + ' million';
      break;
    case 4: // if number is in the billions
      amount += (money/1000000000).toFixed(1) + ' billion';
      break;
    default: // most likely to be a number below a thousand
      amount += value;
  }

  return amount;
}

export const displayGenres = (genres) => {
  var markup = ``;
  genres.forEach(genre => {
    markup += `${genre.name}, `;
  })

  return markup;
}

const mapStateToProps = (state) => {
  return{
    movie: state.database.movieInfo,
    favorite: state.database.favorite
  };
}

export default connect(mapStateToProps, {addMovieToState, addFavoriteToState, deleteFavoriteFromState})(MoviePage);
