import * as actions from '../actions/actionTypes';

const databaseReducer = (state = [], action) => {
  let payload = [];

  switch(action.type) {
    case actions.FETCH_MOVIE:
      // console.log('Reducer State: ', state);
      // console.log('Reducer return State: ', {...state, [action.category]: action.payload});
      return {...state, [action.category]: action.payload};
    case actions.FETCH_MOVIES:
      // console.log('Reducer State: ', state);
      // console.log('Reducer return State: ', {...state, [action.category]: action.payload});
      return {...state, [action.category]: action.payload};
    case actions.SEARCH_MOVIE:
      // console.log('Reducer State: ', state);
      // console.log('Reducer return State: ', {...state, [action.category]: action.payload});
      return {...state, [action.category]: action.payload};
    case actions.ADD_FAVORITE:
      if(state[action.category]) {
        payload = [...state[action.category], action.payload]
      } else {
        payload = [action.payload];
      }
      // console.log('PayLoad: ', payload);
      // console.log('Reducer State: ', state);
      // console.log('Reducer return State: ', {...state, [action.category]: payload});
      return {...state, [action.category]: payload};
    case actions.DELETE_FAVORITE:
      payload = state[action.category].filter(item => item.id !== action.payload.id);
      // console.log('Reducer State: ', state);
      // console.log('Reducer State Favorite: ', {...state, [action.category]: payload});

      return {...state, [action.category]: payload};
    default:
      return state;
  }
}

export default databaseReducer;
