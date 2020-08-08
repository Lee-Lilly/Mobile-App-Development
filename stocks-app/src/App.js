import React, {useState} from 'react';
import './App.css';

// import for Material-UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//import LineChart from rechart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// styles for Material-UI
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  // material-UI classes
  const classes = useStyles();
  // hook for stock symbol
  const [symbol, setSymbol] = useState('');
  // hook  for response data
  const [timeSeries, setTimeSeries] = useState([]);

  // load stocks
  const API_KEY = 'EQHF5OBA6LEAH4NG';
  const URL_PATH = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY';
  
  const loadStock = (symbol) => {
    console.log(symbol);

    const url = URL_PATH + '&symbol=' + symbol + '&apikey=' + API_KEY;
    const axios = require('axios').default;
    
    // use axios to get data
    axios.get(url)
      .then(res => {
        console.log(res.statusText);
        console.log(res.data["Time Series (Daily)"]);

        let container = [];
        let count = 0;
        let countMAX = 12; //take only 12 first

        // loop json object with keys (dates)
        Object.keys(res.data["Time Series (Daily)"]).forEach(function (key) {
          // add count and take only countMAX 
          count++;
          if (count < countMAX) {
            // push loaded json data to array with keys: data, open, etc...
            container.push(
              {
                'date': key,
                'open': res.data["Time Series (Daily)"][key]["1. open"],
                'high': res.data["Time Series (Daily)"][key]["2. high"],
                'low': res.data["Time Series (Daily)"][key]["3. low"],
                'close': res.data["Time Series (Daily)"][key]["4. close"],
                'volume': res.data["Time Series (Daily)"][key]["5. volume"],
              }
            );
          }
        });
        setTimeSeries(container);
      });
  } 

  // handle stock symbol change from InputLabel
  const handleChange = event => {
    setSymbol(event.target.value);
    loadStock(event.target.value);
  }

  return (
    <div className="App">
      <h1>Stock - Time Series</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={symbol}
          onChange={handleChange}
        >
          <MenuItem value='AAPL'>Apple</MenuItem>
          <MenuItem value='AMZN'>Amazon</MenuItem>
          <MenuItem value='NOK'>Nokia</MenuItem>
          <MenuItem value='TSLA'>Tesla</MenuItem>
        </Select>
      </FormControl>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <LineChart
            data={timeSeries}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin', 'dataMax']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="close" stroke="#82ca9d" />
            <Line type="monotone" dataKey="high" stroke="#ff0000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
