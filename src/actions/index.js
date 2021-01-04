import movies from '../apis/database';
import * as actions from './actionTypes';
const API_KEY = 'd7391feb13d2733727644a843c4e0d8c';

export const addMovieToState = (category, id) => async dispatch => {
  const response = await movies.get(`/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`);

  // console.log('Action Response: ', response.data);
  dispatch({type: actions.FETCH_MOVIE, category: category, payload: response.data});
}

export const searchMovie = (category, searchTerm) => async dispatch => {
  const response = await movies.get(`/search/movie?api_key=${API_KEY}&language=en-US&&query=${searchTerm}&page=1&include_adult=false`);

  const payload = (response.data.results.length < 6) ? response.data.results : response.data.results.splice(0, 6);
  // console.log('Action Response: ', payload);
  dispatch({type: actions.SEARCH_MOVIE, category: category, payload: payload});
}

export const addMoviesToState = (category, ids) => async dispatch => {
  let response;
  let moviesSearched = [];

  for(let i = 0; i < ids.length; i++){
    response =  await movies.get(`/movie/${ids[i]}?api_key=${API_KEY}&language=en-US&append_to_response=videos`);
    moviesSearched.push(response.data);
  }

  // console.log('IDs: ', ids);
  // console.log('Response Movies: ', moviesSearched);
  dispatch({type: actions.FETCH_MOVIES, category: category, payload: moviesSearched});
}

export const addFavoriteToState = (movie) => dispatch => {
  // category to add it to
  // movie to add it to
  dispatch({type: actions.ADD_FAVORITE, category: 'favorite', payload: movie});
}

export const deleteFavoriteFromState = (movie) => dispatch => {
  // console.log('Movie: ', movie);
  dispatch({type: actions.DELETE_FAVORITE, category: 'favorite', payload: movie});
}
