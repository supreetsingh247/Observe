export function stats(state = [], action) {
  switch (action.type) {
    case 'GET_STATS_SUCCESS':
      return action.stats;
    default:
      return state;
  }
}

export function gettingStats(state = [], action) {
  switch (action.type) {
    case 'GETTING_STATS':
      return action.gettingStats;
    default:
      return state;
  }
}

export function transcript(state = [], action) {
  switch (action.type) {
    case 'GET_TRANSCRIPT_SUCCESS':
      return action.transcript;
    default:
      return state;
  }
}

export function gettingTranscript(state = [], action) {
  switch (action.type) {
    case 'GETTING_TRANSCRIPT':
      return action.gettingTranscript;
    default:
      return state;
  }
}