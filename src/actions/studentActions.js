import toastr from 'toastr';

export function saveBegin(bool) {
  return {
    type: 'SAVE_BEGIN',
    isLoading: bool,
  };
}

export function saveErrored(response, error) {
  toastr.error("Save error occured.");
  console.log(error);
  return {
    type: 'SAVE_ERRORED',
    hasErrored: response,
  };
}

export function saveSuccess(user) {
  return {
    type: 'SAVE_SUCCESS',
    user,
  };
}

export function save(url, payload) {
  const type = payload.type;
  let method = '';
  if(type === 'add') {
    method = 'POST'
  } else {
    method = 'PUT'
  }
  return (dispatch) => {
    dispatch(saveBegin(true));
    const myInit = {
      method: method,
      headers: {
        'Accept': 'application/json;version=3',
        'Content-Type': "application/json",
      },
      body: JSON.stringify(payload),
    }
    fetch(url, myInit)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(saveBegin(false));
        return response;
      })
      .then((response) => response.json())
      .then((user) => dispatch(saveSuccess(user)))
      .catch((error) => dispatch(saveErrored(true, error)));
  };
}


export function getDataBegin(bool) {
  return {
    type: 'GET_DATA_BEGIN',
    isLoading: bool,
  };
}

export function getDataErrored(response, error) {
  toastr.error("Save error occured.");
  console.log(error);
  return {
    type: 'GET_DATA_ERRORED',
    hasErrored: response,
  };
}

export function getDataSuccess(user) {
  return {
    type: 'GET_DATA_SUCCESS',
    user,
  };
}

export function getData(url, payload) {
  return (dispatch) => {
    dispatch(getDataBegin(true));
    const myInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json;version=3',
        'Content-Type': "application/json",
      },
      body: JSON.stringify(payload),
    }
    fetch(url, myInit)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(getDataBegin(false));
        return response;
      })
      .then((response) => response.json())
      .then((user) => dispatch(getDataSuccess(user)))
      .catch((error) => dispatch(getDataErrored(true, error)));
  };
}