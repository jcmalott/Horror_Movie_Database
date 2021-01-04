import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addMoviesToState, addFavoriteToState, deleteFavoriteFromState} from '../../../actions';
import * as Helper from '../../base';

class WhatsNext extends React.Component {
  componentDidMount(){
    if(!this.props.whatsNext) this.props.addMoviesToState('whatsNext', this.props.movies);
  }

  handleFavorite(sectionKey, movie, event) {
    const isFavored = Helper.isFavorite(event);
    if(isFavored) {
      this.props.addFavoriteToState(movie);
      Helper.displayFavoriteToList(sectionKey, event, movie, this.removeFavorite.bind(this));
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

  displayNextMovies() {
    return this.props.whatsNext.map(nextMovie => {
      return(
        <div className="movieID whatsNext" key={nextMovie.id} movieid={nextMovie.id}>
         <div className="container-movie-title">
           <div className="next-poster poster">
             <img src={`https://image.tmdb.org/t/p/original${nextMovie.poster_path}`} alt={nextMovie.title}/>
              <Link to={`/movie/${nextMovie.id}`}><span className="highlight"></span></Link>
              <a className="favorite"
                 onClick={(event) => this.handleFavorite('whatsNext', nextMovie, event)}>
                 <i className="fa fa-star-o"></i>
              </a>
           </div>
           <div className="container-next-description">
             <div className="next-description">
              <h3>{nextMovie.title}</h3>
              <p>{Helper.displayTagline(nextMovie.tagline)}</p>
              <div>
               <p>
                 {Helper.displayStars(nextMovie.vote_average)}
                 ({nextMovie.vote_count})
               </p>
              </div>
             </div>
           </div>
         </div>
        </div>
      );
     });
  }

  render(){
    if(!this.props.whatsNext) {
      return(
        <div className="movieID next-movies">
          <div className="loading"></div>
        </div>
      );
    } else {
      return(
        <div>
          {this.displayNextMovies()}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  // console.log('Map State: ', state);
  // console.log('Map State database: ', state.database);
  // console.log('Map State WhatsNext: ', state.database.whatsNext);
  return{
    database: state.database,
    whatsNext: state.database.whatsNext
  };
}

export default connect(mapStateToProps, {addMoviesToState, addFavoriteToState, deleteFavoriteFromState})(WhatsNext);
