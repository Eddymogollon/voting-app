import axios from 'axios';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: 'FETCH_USER', payload: res.data});
};

export const fetchAllPolls = () => async dispatch => {
  const res = await axios.get('/api/all-polls');

  dispatch({type: 'FETCH_ALL_POLLS', payload: res.data});
}

export const fetchPoll = (pollId) => async dispatch => {
  const poll = { 
    "_id": pollId
  }
  // Create a poll
  const res = await axios.post('/api/get-poll', poll);
  dispatch({type: 'FETCH_POLL', payload: res.data});
}

export const fetchUserPolls = () => async dispatch => {
  const res = await axios.get('/api/user-polls');
  dispatch({type: 'FETCH_USER_POLLS', payload: res.data});
};

export const createPoll = (poll) => async dispatch => {
  // Create a poll
  await axios.post('/api/create-poll', poll);
  dispatch({type: 'CREATE_POLL', payload: 'nose'});
};

export const addVote = (vote) => async dispatch => {
  const res = await axios.post('/api/add-vote', vote);
  dispatch({type: 'ADD_VOTE', payload: res.data});
};