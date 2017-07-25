import { combineReducers } from 'redux';
import { stats, gettingStats, trasnscript, gettingTranscript } from './homeReducer';

const rootReducer = combineReducers({
  stats,
  gettingStats,
  trasnscript,
  gettingTranscript,
});

export default rootReducer;