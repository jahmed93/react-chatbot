import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://52.172.254.231:13002/', // from env in future
  timeout: 5000,
  headers: {
    accept: 'application/json', // take from env in future
    authorization: 'Basic dXNlci1hcGk6cGFzc3dvcmQtYXBp', // take from env in future
    'ngrok-skip-browser-warning': '69420',
  },
});

const fetchData = async (url, method = 'GET', data = null, params = null) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
    });

    return response.data;
  } catch (error) {
    // Handle errors, log them, or throw further if needed
    console.error('Axios request error:', error);
    throw error;
  }
};

export default fetchData;
