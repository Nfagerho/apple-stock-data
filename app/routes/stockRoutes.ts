import axios from 'axios';
import { parseAvStockDataFromResponse } from '../services/stock-data.service.';
import express from 'express';

module.exports = (app: express.Application) => {
  app.get(`/api/stock/daily/aapl`, async (req: any, res: any) => {
    try {
      let response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=full&apikey=${process.env.API_KEY}`);
      return res.status(200).send(parseAvStockDataFromResponse(response));
    } catch (error) {
      console.log(error)
    }
  });
}