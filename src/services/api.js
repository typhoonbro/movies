//URl da API https://api.themoviedb.org/3/
//key ?api_key=74048dfa0c3d514d9d355d41d3c9aea5
import axios from 'axios';



const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});
export default api;