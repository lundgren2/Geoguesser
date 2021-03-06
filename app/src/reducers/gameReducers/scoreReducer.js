import {
  ADD_POINTS,
  SUBTRACT_POINTS,
  CLEAR_SCORE,
  REQUEST_POINTS,
} from '../../actions';

const initialState = {
  score: 0.0,
  requestPoints: false,
};

const scoreboard = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POINTS:
      return {
        score: state.score + action.payload,
        requestPoints: false,
      };

    case SUBTRACT_POINTS:
      let newScore = 0.0;
      if (state.score >= action.payload)
        newScore = state.score - action.payload;
      return {
        score: newScore,
        requestPoints: false,
      };

    case REQUEST_POINTS:
      return {
        ...state,
        requestPoints: true,
      };

    case CLEAR_SCORE:
      return {
        ...state,
        score: 0.0,
      };

    default:
      return state;
  }
};

export default scoreboard;
