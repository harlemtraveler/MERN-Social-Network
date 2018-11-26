import axios from 'axios';

// This takes care of adding the token to every autherization request if we're logged in

const setAuthToken = token => {
  if(token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete Auth header
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;
