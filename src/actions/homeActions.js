export function gettingStats(bool) {
  return {
    type: 'GETTING_STATS',
    gettingStats: bool,
  };
}

export function getStatsErrored(error) {
  console.log(error);
  return {
    type: 'GET_STATS_ERRORED',
    hasErrored: error,
  };
}

export function getStatsSuccess(stats) {
  return {
    type: 'GET_STATS_SUCCESS',
    stats,
  };
}

export function getStats() {
  const url = 'http://demo5670791.mockable.io/stats';
  return (dispatch) => {
    dispatch(gettingStats(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(gettingStats(false));
        return response;
      })
      .then(response => response.json())
      .then(stats => dispatch(getStatsSuccess(stats)))
      .catch(error => dispatch(getStatsErrored(error)));
  };
}

export function gettingTranscript(bool) {
  return {
    type: 'GETTING_TRANSCRIPT',
    gettingTranscript: bool,
  };
}

export function getTranscriptErrored(error) {
  console.log(error);
  return {
    type: 'GET_TRANSCRIPT_ERRORED',
    hasErrored: error,
  };
}

export function getTranscriptSuccess(transcript) {
  return {
    type: 'GET_TRANSCRIPT_SUCCESS',
    transcript,
  };
}

export function getTranscript() {
  const url = 'http://demo5670791.mockable.io/transcript';
  return (dispatch) => {
    dispatch(gettingTranscript(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(gettingTranscript(false));
        return response;
      })
      .then(response => response.json())
      .then(transcript => dispatch(getTranscriptSuccess(transcript)))
      .catch(error => dispatch(getTranscriptErrored(error)));
  };
}
