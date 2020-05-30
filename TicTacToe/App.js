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
  //game turn of Random first player  
  const players = ['X', 'O'];
  let firstPlayer = players[Math.floor(Math.random() * players.length)];

  let xIsNext = null;
  if (firstPlayer === 'X') {
    xIsNext = true;
  }
  else {
    xIsNext = false;
  }

  //initialize the board with 9 squares of null value, get the first player  
  const [state, setState] = React.useState({ squares: Array(9).fill(null), gameTurn: xIsNext, clicks: 0 });

  function editSquare(i) {
    //clickable ONLYIF square is null
    if (state.squares[i] == null) {
      state.clicks = state.clicks + 1;
      state.squares[i] = state.gameTurn ? 'X' : 'O';
      setState({ squares: state.squares, gameTurn: !state.gameTurn, clicks: state.clicks });
    }  
    //check winner after each click
    const winner = calculateWinner(state.squares);
    if (winner != null) {
      alert("Game Over ! Winner is: Player " + winner);
    } //if all squares are filled but no winner, then claim a draw
    else if (!state.squares.includes(null) && winner == null) {
      alert("A Draw !");
    }        
  }
 
  const renderSquare = (i) => {
    return (
      <Square value={state.squares[i]} onPress={() => { editSquare(i) }} />
    );
  };

  //refresh the board
  const Restart = () => {
    setState({ squares: Array(9).fill(null), gameTurn: xIsNext })
  }

  const player = state.gameTurn ? 'X' : 'O';
  
  return (
    <View>
      <View style={styles.banner}>
        <Text style={styles.bannerText}> Next Player:  {player} </Text>
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
    width: 320
  },
  buttonText: {
    backgroundColor: '#b8e6f5',
    width: 50,
    height: 50,
    color: "white",
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
