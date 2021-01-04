import React from 'react';
import {connect} from 'react-redux';
import {searchMovie} from '../../actions';
import {addStyleSheet, checkFavoriteOnLoad} from '../base';
import MoviesDisplay from './Home/MoviesDisplay';

class SearchPage extends React.Component {
  componentDidMount(){
    addStyleSheet('searchpage');
    // console.log('Search Term: ', this.props.match.params.searchTerm);
    this.props.searchMovie('searchResults', this.props.match.params.searchTerm);
    if(this.props.favorite) checkFavoriteOnLoad(this.props.favorite);
  }

  componentWillUnmount(){
    document.querySelectorAll('.extra-sheet').forEach(node => {
      node.parentNode.removeChild(node);
    });
  }

  render(){
    return(
      <div className="container-search">
        <div className="logo-tmdb">
          <img src="../img/TMDB.svg" alt="TMDB Logo"/>
        </div>

        <div className="section-recommended">
          <div className="container-search-title">
            <h1>Results for</h1>
            <p>:</p>
          </div>
        </div>

        <MoviesDisplay sectionName="searchResults" displayTitle={false} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    searchResults: state.database.searchResults,
    favorite: state.database.favorite
  };
}

export default connect(mapStateToProps, {searchMovie})(SearchPage);
