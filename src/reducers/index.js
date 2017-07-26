import { combineReducers } from 'redux';
import { stats, gettingStats, transcript, gettingTranscript } from './homeReducer';

const rootReducer = combineReducers({
  stats,
  gettingStats,
  transcript,
  gettingTranscript,
});

export default rootReducer;