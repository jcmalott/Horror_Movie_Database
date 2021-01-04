import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addMoviesToState, addFavoriteToState, deleteFavoriteFromState} from '../../../actions';
import * as Helper from '../../base';
import {displayStars, displayTitle, turnToClass} from '../../base';

class MoviesDisplay extends React.Component {

  componentDidMount(){
    if(!this.props.moviesDisplay && this.props.movieList){
      this.props.addMoviesToState(nameToCategory(this.props.sectionName), this.props.movieList);
    } else if(!this.props.searchMovie){
      // console.log('DID NOT REDISPLAY');
    }
  }

  //sectionKey, movie,
  handleFavorite(sectionName, movie, event) {
    const isFavored = Helper.isFavorite(event);
    if(isFavored) {
      this.props.addFavoriteToState(movie);
      Helper.displayFavoriteToList(sectionName, event, movie, this.removeFavorite.bind(this));
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

  displayList(sectionName, movies) {
    // console.log('Funny : ', this.props.moviesDisplay);

    return movies.map(movie => {
      return(
        <div className={`container-list-movie movieID ${sectionName}`} key={movie.id} movieid={movie.id}>
         <div className="movie-poster-container">
           <div className="display-movie-poster poster">
             {(movie.poster_path) ?
               <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/> :
               <h2 className="no-poster">{Helper.displayTitle(movie.title)}</h2>
             }
            <Link to={`/movie/${movie.id}`}><span className="highlight"></span></Link>
            <a className="favorite"
               onClick={(event) => this.handleFavorite(sectionName, movie, event)}>
              <i className="fa fa-star-o"></i></a>
           </div>
            <div className="display-poster-description">
              <h4>{Helper.displayTitle(movie.title)}</h4>
              <p>Runtime: {(movie.runtime) ? movie.runtime + 'm' : ' ?'}</p>
              <div>
                <p>
                  {Helper.displayStars(movie.vote_average)}
                  ({movie.vote_count})
                </p>
             </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render(){
    if(!this.props.moviesDisplay && !this.props.searchMovie) {
      return(
        <div className="section-movies">
          <div className="loading"></div>
        </div>
      );
    } else {
      return(
        <div className="section-movies">
          {(this.props.displayTitle) ?
            <div>
              <h2>{this.props.sectionName}</h2>
            </div>
          : ``}
          <div className={`row container-movies ${this.props.sectionName}`}>
            {this.displayList(this.props.sectionName, (this.props.moviesDisplay) ? this.props.moviesDisplay : this.props.searchMovie)}
          </div>
        </div>
      );
    }
  }
}

const nameToCategory = (name) => {
  return name.replace(' ', '');
}

const mapStateToProps = (state, ownProps) => {
  // console.log('Map State: ', state);
  // console.log('Map State database: ', state.database);
  // console.log('Map State Funny: ', state.database[nameToCategory(ownProps.sectionName)]);
  return{
    moviesDisplay: state.database[nameToCategory(ownProps.sectionName)],
    searchMovie: state.database.searchDisplay
  };
}

export default connect(mapStateToProps, {addMoviesToState, addFavoriteToState, deleteFavoriteFromState})(MoviesDisplay);
