// API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://chatapplication-with-socketio-production.up.railway.app'
  : 'http://localhost:5000';

export default API_BASE_URL;