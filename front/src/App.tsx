import React from "react";
import HighStock from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official'

import stockService from './services/stock.service';

interface IProps { }

interface IState {
  options: any;
}

export class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      options: null
    };
  }

  componentDidMount() {
    stockService.getAaplDailySeries()
      .then(response => {
        this.setState({ options: this.setOptions(response.data) });
      })
      .catch(error => {
        console.error(error)
      })
  } 

  setOptions = (responseData: any) => ({
    rangeSelector: {
      selected: 5
    },

    title: {
      text: "AAPL Historical Data (Not split adjusted)"
    },

    scrollbar: {
      enabled: false
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3
        },
        title: {
          text: "OHLC"
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true
        }
      },
      {
        labels: {
          align: "right",
          x: -3
        },
        title: {
          text: "Volume"
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      }
    ],
    chart: {
      borderWidth: 2,
      borderColor: '#000000',
      backgroundColor: '#F5F5F5'
    },

    tooltip: {
      split: true
    },

    series: [
      {
        type: "candlestick",
        data: (() => {
          var ohlcData = [];
          for (var i = 0; i < responseData.length; i++) {
            ohlcData.push([
              responseData[i][0], // Date
              responseData[i][1], // Open
              responseData[i][2], // High
              responseData[i][3], // Low
              responseData[i][4] // Close
            ]);
          }
          return ohlcData;
        })()
      },
      {
        type: "column",
        data: (() => {
          var columnData = [];
          for (var i = 0; i < responseData.length; i++) {
            columnData.push([
              responseData[i][0], // Date
              responseData[i][5]  // Volume
            ]);
          }
          return columnData;
        })(),
        yAxis: 1
      }
    ],
    plotOptions: {
      candlestick: {
        color: 'red',
        upColor: 'green'
      }
    },
  })


  render() {
    return (
      <div className="App">
        <HighchartsReact
          highcharts={HighStock}
          constructorType={"stockChart"}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default App;