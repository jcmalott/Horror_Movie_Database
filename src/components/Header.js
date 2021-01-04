import React from "react";
import {Link} from "react-router-dom";
import history from '../history';

class Header extends React.Component {
  constructor(props){
    super(props);
  }

  handleSearch(event) {
    // event.preventDefault();
    const searchTerm = document.querySelector('.search_fleid').value;
    console.log('Search Term: ' + searchTerm);
    history.push(`/search/${searchTerm}`);
  }

  render(){
    return(
      <header>
        <div className="row container-header">
          <div className="container-logo">
            <Link to="/"><img className="logo" src="/img/logo.jpg" alt="logo"/></Link>
            {/* <a href="/"><img className="logo" src="/img/logo.jpg" alt="logo"/></a> */}
          </div>
          <div className="container-searchBar">
            <form className="search" onSubmit={this.handleSearch}>
              <input className="search_fleid" type="text" placeholder="Search Movies"/>
              <a className="btn_search" onClick={this.handleSearch}><i className="fa fa-search"></i></a>
            </form>
          </div>
          <div className="container-favorites">
            <div className="container-btn-favorites">
              <a className="btn-favorites" href="#">
                <i className="fa fa-sort-desc"></i>
                <p>FAVORITES</p>
              </a>
            </div>
            <div className="favorite-panel">
              <ul className="favorite-list">
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
