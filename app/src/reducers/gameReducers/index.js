import { combineReducers } from 'redux';

import regionReducer from './regionReducer';
import markersReducer from './markersReducer';
import markersLeftReducer from './markersLeftReducer';
import correctMarkerReducer from './correctMarkerReducer';
import startGameReducer from './startGameReducer';

export default combineReducers({
  region: regionReducer,
  markers: markersReducer,
  markersLeft: markersLeftReducer,
  correctMarker: correctMarkerReducer,
  startGame: startGameReducer
});
