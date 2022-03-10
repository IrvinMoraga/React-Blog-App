import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://irvin-react-blog-app-v2.herokuapp.com/',
});
