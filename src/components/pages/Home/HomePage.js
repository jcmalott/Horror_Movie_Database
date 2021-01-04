import React from 'react';
import DailyMovie from './DailyMovie';
import WhatsNext from './WhatsNext';
import MoviesDisplay from './MoviesDisplay';
import {movieLog} from '../../movies';

class HomePage extends React.Component {

  componentDidMount(){
  }

  render(){
    return(
      <div className="container-home">
        <div className="logo-tmdb">
          <img src="img/TMDB.svg" alt="TMDB Logo"/>
        </div>

        <div className="section-recommended">
          <div>
            <h1>Daily Recommended Movie</h1>
          </div>

          <div className="container-recommended">
            <DailyMovie movie={movieLog.daily}/>
            <div className="container-next-movies">
              <h3 className="next-movie-title">Whats Next ...</h3>
              <div className="whats-next-movies">
                <WhatsNext movies={movieLog.next}/>
              </div>
            </div>
          </div>

        </div>
        <MoviesDisplay sectionName="our picks" movieList={movieLog.ourPicks} displayTitle={true} />
        <MoviesDisplay sectionName="funny" movieList={movieLog.funny} displayTitle={true} />
        <MoviesDisplay sectionName="remake" movieList={movieLog.remake} displayTitle={true} />
        <MoviesDisplay sectionName="classic" movieList={movieLog.classic} displayTitle={true} />
      </div>
    );
  }
}

export default HomePage;
