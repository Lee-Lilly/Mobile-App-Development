import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
}
//individual square, gets value and onPress from props
const Square = (props) => {
  return (
    <View>
      <Text style={styles.buttonText} onPress={props.onPress}>
        {props.value}
      </Text>
    </View>
  );
}

const Board = () => {
  //game starts with Random player  
  const players = ['X', 'O'];
  let firstPlayer = players[Math.floor(Math.random() * players.length)];

  const xIsNext = (firstPlayer === 'X') ? true : false;

  //initialize the board state with 9 squares of null value and the status of first player  
  const [state, setState] = React.useState({ squares: Array(9).fill(null), gameTurn: xIsNext});

  const winner = calculateWinner(state.squares); 

  const renderSquare = (i) => {
    return (
      <Square value={state.squares[i]} onPress={() => { editSquare(i) }} />
    );
  };

  function editSquare(i) {
      //check winner
      if (!winner) {  //game continues ONLYIF the square includes null and no winner come out  
        if (state.squares.includes(null)) {
          state.squares[i] = state.gameTurn ? 'X' : 'O';
          setState({ ...state, squares: state.squares, gameTurn: !state.gameTurn });
        }
        else {
          // alert("A Draw !");
          return;
        }
      }
      else {
        alert("Game Over !");
        return;
      }
  }

  //report
  const status =
    (winner) ? 'Victory! Winner is: ' + winner :
      (!state.squares.includes(null)) ? 'A Draw !' :
        (state.gameTurn) ? 'Next Player: X' : 'Next Player: O';

  //refresh the board 
  const Restart = (xIsNext) => {
    setState({ squares: Array(9).fill(null), gameTurn: xIsNext })
  }

  return (
    <View>
      <View style={styles.banner}>
        <Text style={styles.bannerText}> {status} </Text>
      </View>
      <View style={styles.buttonRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.buttonRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.buttonRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
      <Button title="Restart" onPress={Restart} />
    </View>
  )
}

//help function for define a winner
function calculateWinner(squares) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  banner: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#5f9ea0',
    marginBottom: 20
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    justifyContent: 'space-around',
    width: 320,
  },
  buttonText: {
    backgroundColor: '#b8e6f5',
    width: 50,
    height: 50,
    color: "black",
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
