import axios from 'axios';

export default {
  getAaplDailySeries: async () => {
    // This is a bit odd. I would have call the remote api from here, but have to do it this way since assignment asks me to call it from backend. 
    return await axios.get(`/api/stock/daily/aapl`);
  }
}