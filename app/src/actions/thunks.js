import _ from 'lodash';
import {
  SET_REGION,
  SET_INITIAL_MARKERS,
  SET_MARKERS,
  SET_CORRECT_MARKER,
  REMOVE_CORRECT_MARKER,
  TOGGLE_GAME_WON,
  TOGGLE_GAME_LOST,
  START_GAME,
  STOP_GAME,
  GAME_NEXT_REGION,
} from '../actions';
import { requestPoints, clearScore } from './score';
import { addLife, removeLife, resetLife } from './life';

/**
 * Checks if pressed marker during game is correct.
 * If true starts next level.
 * TODO: If false, alerts user.
 */
export const handleMarkerPress = markerId => {
  return (dispatch, getState) => {
    const {
      game: { correctMarker },
    } = getState();

    if (markerId === correctMarker.id) {
      dispatch(correctMarkerChosen(correctMarker.id));
    } else {
      dispatch(wrongMarkerChosen());
    }
  };
};

// The player has chosen the correct marker
export const correctMarkerChosen = markerId => {
  return (dispatch, getState) => {
    const { game } = getState();

    // Demand GameBar to add the remaining time to the current score
    dispatch(requestPoints());

    // If markers left will be empty call lastCorrectMarker
    if (game.markersLeft.length === 1) {
      dispatch(lastCorrectMarker());
    } else {
      // Remove correctMarker from the list of markers left
      dispatch({ type: REMOVE_CORRECT_MARKER, payload: game.correctMarker });

      // Setup next correct marker
      dispatch(randomizeCorrectMarker());
    }
  };
};

// The player has chosen an incorrect marker and lost the game
export const wrongMarkerChosen = () => {
  return (dispatch, getState) => {
    dispatch(removeLife());
    const { game } = getState();
    if (game.playerLife.life <= 0) {
      dispatch({ type: STOP_GAME });
      dispatch({ type: TOGGLE_GAME_LOST });
    }
  };
};

// The player has finished a region
export const lastCorrectMarker = () => {
  return (dispatch, getState) => {
    const {
      game: { region },
    } = getState();

    // Player wins the game if this was the last region
    if (region === 5) {
      dispatch({ type: TOGGLE_GAME_WON });
    } else {
      // Setup next region
      dispatch(addLife());
      dispatch(setupNextRegion());
    }
  };
};

// Setup the next region/level to play
export const setupNextRegion = (initialRegion = false) => {
  return (dispatch, getState) => {
    const {
      game: { region },
    } = getState();

    // Just take the next region, no randomization
    const newRegion = initialRegion ? 1 : region + 1;
    dispatch({ type: SET_REGION, payload: newRegion });
    dispatch({ type: SET_INITIAL_MARKERS, payload: newRegion });
    dispatch({ type: SET_MARKERS, payload: newRegion });
    dispatch(randomizeCorrectMarker());

    dispatch({ type: GAME_NEXT_REGION });
    dispatch({ type: START_GAME });
  };
};

// Randomize the next correct marker for a region/level
export const randomizeCorrectMarker = () => {
  return (dispatch, getState) => {
    const { game } = getState();

    // Randomize a new correct marker from the markers left list
    const id = _.random(0, game.markersLeft.length - 1);
    const correctMarker = _.nth(game.markersLeft, id);

    dispatch({ type: SET_CORRECT_MARKER, payload: correctMarker });
  };
};

export const timeRanOut = () => {
  return dispatch => {
    dispatch({ type: TOGGLE_GAME_LOST });
    dispatch({ type: STOP_GAME });
  };
};

export const resetGame = () => {
  return (dispatch, getState) => {
    dispatch(clearScore());
    dispatch(resetLife());
    dispatch(setupNextRegion(true));
  };
};
