import React, {useState, useEffect} from 'react';
import './App.css';

// import from firebase
import firebase from 'firebase/app';
import "firebase/firestore";

// import from material-ui 
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Container } from '@material-ui/core';

// styles for Material-UI
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 60,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: 20,
  },
  card: {
    borderRadius: 1,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    position: 'relative',
    width: '350px',
    borderStyle: 'solid',
    margin: theme.spacing(2),
  },
  marginAutoItem: {
    margin: 'auto',
    width: '50%',
  },
}));

const firebaseConfig = {
  apiKey: "AIzaSyDQWd9Gl0EcNbA1QQ0r-fxD9tJbXN02BBc",
  authDomain: "shoppinglist-fc84c.firebaseapp.com",
  databaseURL: "https://shoppinglist-fc84c.firebaseio.com",
  projectId: "shoppinglist-fc84c",
  storageBucket: "shoppinglist-fc84c.appspot.com",
  messagingSenderId: "752927173327",
  appId: "1:752927173327:web:d85cab1e0363d9038925ba",
  measurementId: "G-50S22SJ2YD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  // material-UI classes
  const classes = useStyles();
  // loading state
  const [loading, setLoading] = useState(true);
  // shopping list items state
  const [items, setItems] = useState([]);
  //new item
  const [item, setItem] = useState('');
  const [count, setCount] = useState(1); 
  
  // load shopping list items
  useEffect(() => {
    const fetchData = async () => {
      // database
      const db = firebase.firestore();
      // data
      const data = await db.collection("items").get();
      // shopping list items: name, count and id
      const items = data.docs.map(doc => {
        return {
          name: doc.data().name,
          count: doc.data().count,
          id: doc.id
        };
      });
      // set states
      setItems(items);
      setLoading(false);
    }
    // loading called only once
    fetchData();
  }, []); 

  // render loading... text
  if (loading) return (<p>Loading...</p>);

  // create shopping list items
  const db_items = items.map((item, index) => {
    return (
      <Card key={index} variant="elevated" className={classes.card}>
          <CardContent className={classes.title} color="title">
              {item.name} {item.count}  
          </CardContent>
          <CardActions>
              <Button 
                  size="small" 
                  color="secondary"
                  onClick={() => deleteItem(item)}>DEL</Button>
          </CardActions>
        </Card>);
  });

  // add a new item to data base and shopping list items
  const addItem = async () => {
    // create a new shopping list item
    let newItem = { name: item, count: count, id: '' };
    // add to database
    const db = firebase.firestore();
    let doc = await db.collection('items').add(newItem);
    // get added doc id and set id to newItem
    newItem.id = doc.id;
    // refresh the form
    setItems([...items, newItem]);
    setItem("");
    setCount(1);
  }

  // delete item from database and UI
  const deleteItem = async (item) => {
    // remove from db
    const db = firebase.firestore();
    db.collection('items').doc(item.id).delete();
    // delete from items state and update state
    let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
    setItems(filteredArray);  
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Shopping List
        </p>
      </header>
      <FormControl className={classes.formControl}>
        <TextField 
            id="input-item"
            value={item}
            placeholder ="Item" 
            variant="filled"
            size ="small"
            onChange={e => setItem(e.target.value)} required />
      </FormControl>
      <FormControl className={classes.selectEmpty}>
        <InputLabel shrink id="simple-select-label">Count</InputLabel>
        <Select
          id="select-count"
          labelId="simple-select-label"
          value={count}
          type="number"
          onChange={e => setCount(e.target.value)} required >
      
          <MenuItem value='1'>1</MenuItem>
          <MenuItem value='2'>2</MenuItem>
          <MenuItem value='3'>3</MenuItem>
          <MenuItem value='4'>4</MenuItem>
          <MenuItem value='5'>5</MenuItem>
          <MenuItem value='6'>6</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button variant="contained" color="primary" onClick={() => addItem()}>ADD</Button>
      </FormControl>
      <Container className={classes.marginAutoItem}>{db_items}</Container>
    </div>
  );
}

export default App;
