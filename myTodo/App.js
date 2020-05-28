import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView, Keyboard } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <TodoList />
    </View>
  );
}

const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}> SIMPLE TODO LIST </Text>
    </View>
  );
};

const TodoList = () => {
  const [todo, setTodo] = React.useState({ text: '' });
  const [todoList, setTodoList] = React.useState([]);

  const addTodo = () => {
    if (todo.text !== '') {
      //add todo to the List
      const newTodo = { text: todo.text }
      setTodoList([...todoList, todo.text]);
      setTodo({ text: '' });
    }
    else {
      alert('Empty field can not be added');
    }
    Keyboard.dismiss();
  }
  const deleteTodo = (index) => {
    //use filter function for keep unselected item
    setTodoList(todoList.filter((todo, i) => i !== index));
  }

  const list = todoList.map((todo, index) => {
    return ( //todo item + delete function with confirmation
      <View style={styles.itemRow}>
        <Text>{todo}</Text>
        <Text style={styles.itemDelete} onPress={() =>
          deleteTodo(index)}> x </Text>
      </View>
    )
  });

  return (
    <View>
      <View style={styles.inputRow}>
        <View style={styles.inputBox}>
          <TextInput placeholder="add todo item"
            value={todo.text}
            onChangeText={text => setTodo({ text })}
            style={{ textAlign: 'center' }}></TextInput>
        </View>
        <Button title="Add" onPress={addTodo} />
      </View>
      <ScrollView>
        {list}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e4f1f5',
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
  inputBox: {
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 5,
    margin: 2,
    flex: 1
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  itemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold'
  }
});
