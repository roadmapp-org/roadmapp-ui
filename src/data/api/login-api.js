import axios from 'axios';

export async function login(credentials) {
    const response = await axios.post('http://localhost:8080/auth/login', credentials);
    return response.data;
}