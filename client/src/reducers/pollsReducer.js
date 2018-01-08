export default function(state = [], action) {
  switch (action.type) {
    case 'FETCH_ALL_POLLS':
      return { ...state, ['allPolls']: action.payload};
    case 'FETCH_POLL':
      return { ...state, ['poll']: action.payload};
    case 'FETCH_USER_POLLS':
      return { ...state, ['userPolls']: action.payload};
    case 'CREATE_POLL':
      return state;
    case 'ADD_VOTE':
      return { ...state, ['poll']: action.payload};  
    default:
      return state;
  }
}