import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const[number1, setNumber1] = React.useState('0');
  const[number2, setNumber2] = React.useState('0');
  const[result, setResult] = React.useState('0');

  const buttonPressed = (calc) =>{
    switch(calc) {
      case '+':
        setResult(parseInt(number1)+parseInt(number2));
        break;
      case '-':
        setResult(parseInt(number1)-parseInt(number2));
        break;
      case '*':
        setResult(parseInt(number1)*parseInt(number2));
        break;
      case '/':
        if(number2 !== '0')
          setResult((parseInt(number1)/parseInt(number2)).toFixed(2));  
        else setResult('Division by Zero is forbidden');  
        break;
      case 'C':
        setNumber1(0);
        setNumber2(0);
        setResult(0);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        CALCULATOR
      </Text>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 1:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput value={number1} 
                    onChangeText={text => setNumber1(text)}
                    style={{textAlign:'center'}}
                    keyboardType={'numeric'}></TextInput>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 2:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput value={number2} 
                    onChangeText={text => setNumber2(text)}
                    style={{textAlign:'center'}}
                    keyboardType={'numeric'}></TextInput>
        </View>
      </View>
      <View style= {styles.buttonRow}>
        <Button title=" + " onPress={() => buttonPressed('+')}/>
        <Button title=" - " onPress={() => buttonPressed('-')}/>
        <Button title=" * " onPress={() => buttonPressed('*')}/>
        <Button title=" / " onPress={() => buttonPressed('/')}/>
        <Button title="Reset"  color="#808080" onPress={() => buttonPressed('C')}/>
      </View>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Result:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput value={result} 
                    style={{textAlign:'center'}} 
                    editable={false}></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row:{
    flexDirection: 'row',
    marginTop: 5
  },
  text:{
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: '#666',
    backgroundColor: '#b8e6f5',
    justifyContent: 'center',
  },
  textInput:{
    justifyContent: 'center',
    padding: 5,
    borderBottomWidth: 1.0,
    width: 200,
    marginLeft: 5,
  },
  buttonRow:{
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 320
  }
});
