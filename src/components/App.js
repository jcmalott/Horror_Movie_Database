import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import Header from './Header'
import history from '../history'
import HomePage from './pages/Home/HomePage';
import MoviePage from './pages/MoviePage';
import SearchPage from './pages/SearchPage';

//****************************
//************TO DO***********
//****************************
// - add state to this page so that you can reload home without calling database
const App = () => {
    return(
      <div>
        <Router history={history}>
          <div>
            <Header />
            <div className="container-main">
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/movie/:id" exact component={MoviePage}/>
              <Route path="/search/:searchTerm" exact component={SearchPage}/>
            </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
}

export default App;
