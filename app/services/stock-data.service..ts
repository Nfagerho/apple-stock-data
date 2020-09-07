import { AxiosResponse } from 'axios';

export const parseAvStockDataFromResponse = (stockData: AxiosResponse<any>) => {
  var ohlcData: any = [];
  for (const date in stockData.data['Time Series (Daily)']) {
    const ohlcDataSerie = [];
    ohlcDataSerie.push(Date.parse(date))
    for (const key in stockData.data['Time Series (Daily)'][date]) {
      ohlcDataSerie.push(parseFloat(stockData.data['Time Series (Daily)'][date][key]))
    }
    ohlcData.push(ohlcDataSerie)
  }
  // Data needs to be sorted in ascending order
  ohlcData.reverse();

  return ohlcData;
}