import React from 'react';
import {connect} from 'react-redux';
import {addMovieToState, addFavoriteToState, deleteFavoriteFromState} from '../../../actions';
import * as Helper from '../../base';

class DailyMovie extends React.Component {

  componentDidMount() {
    if(!this.props.dailyMovie) this.props.addMovieToState('dailyMovie', this.props.movie);
    if(this.props.favorite) {
      console.log('Loading favorite');
      Helper.checkFavoriteOnLoad(this.props.favorite);
    };
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

  render() {
    if(!this.props.dailyMovie) {
      return(
        <div className="container-movie daily-movie">
          <div className="loading"></div>
        </div>
      );
    } else {
      const movie = this.props.dailyMovie;
      return(
        <div className="container-movie daily-movie">
          {Helper.displayVideo(movie)}
          {Helper.displayBanner(movie, null, this.handleFavorite.bind(this))}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  // console.log('Map State: ', state);
  // console.log('Map State database: ', state.database);
  // console.log('Map State DailyMovie: ', state.database.favorite);
  return {
    dailyMovie: state.database.dailyMovie,
    favorite: state.database.favorite
  };
}

export default connect(mapStateToProps, {addMovieToState, addFavoriteToState, deleteFavoriteFromState})(DailyMovie);
