import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button,
  Text,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';

import Dialog from 'react-native-dialog';
import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-community/async-storage';

const WeatherCard = props => {
  const city = props.city;
  const id = props.id;
  const API_key = '7e2bf3935574fb15eed6c0b9a072ebdc';
  const URL = 'http://api.openweathermap.org/data/2.5/weather?q=';

  const [{data, loading, error}, refetch] = useAxios(
    // eslint-disable-next-line prettier/prettier
    URL + city + '&units=metric&APPID=' + API_key
  );

  if (loading) {
    return <Text>Loading....</Text>;
  }

  if (error) {
    console.log('Error of data accessing');
    return <Text />;
  }

  const imagePath = 'http://openweathermap.org/img/wn/';
  const imageUrl = imagePath + data.weather[0].icon + '@2x.png';

  const refreshForecast = () => {
    refetch();
  };

  const deleteCard = () => {
    props.deleteCity(id);
  };

  return (
    <Card>
      <CardItem>
        <Body>
          <Text style={styles.title}>
            {' '}
            {city} : <Text style={styles.item}>{timeConverter(data.dt)}</Text>
          </Text>
          <Text />
          <Text style={styles.infoItem}>
            Main: <Text style={styles.item}>{data.weather[0].main}</Text>
          </Text>
          <Text style={styles.infoItem}>
            Temp: <Text style={styles.item}>{data.main.temp} °C </Text>
          </Text>
          <Text style={styles.infoItem}>
            Feels: <Text style={styles.item}>{data.main.feels_like} °C</Text>
          </Text>
          <Text style={styles.infoItem}>
            Min / Max:{' '}
            <Text style={styles.item}>
              {data.main.temp_min} / {data.main.temp_max} °C
            </Text>
          </Text>
        </Body>
        <Right>
          <Thumbnail source={{uri: imageUrl}} />
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button bordered small>
            <Text onPress={deleteCard}>Delete</Text>
          </Button>
        </Left>
        <Right>
          <Button bordered small>
            <Text onPress={refreshForecast}>Refresh</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

function timeConverter(UNIX_timestamp) {
  let timestamp = new Date(UNIX_timestamp * 1000);
  let year = timestamp.getFullYear();
  let month = timestamp.getMonth();
  let date = timestamp.getDate();
  let hours = timestamp.getHours();
  let minutes = '0' + timestamp.getMinutes();
  let seconds = '0' + timestamp.getSeconds();
  const time =
    // eslint-disable-next-line prettier/prettier
    date + '.' + month + '.' + year + ' ' +
    // eslint-disable-next-line prettier/prettier
    hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return time;
}

export default function App() {
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [cityName, setCityName] = React.useState('');
  const [cityList, setCityList] = React.useState([{name: ''}]);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const addCity = () => {
    setCityList([...cityList, {name: cityName}]);
    setDialogVisible(false);
  };

  const deleteCity = index => {
    setCityList(cityList.filter((city, i) => i !== index));
  };

  const cities = cityList.map((city, index) => {
    return <WeatherCard city={city.name} id={index} deleteCity={deleteCity} />;
  });

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cityList', JSON.stringify(cityList));
    } catch (e) {
      console.log('City saving error!');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cityList');
      if (value !== null) {
        setCityList(JSON.parse(value));
      }
    } catch (e) {
      console.log('City loading error!');
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    storeData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityList]);

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Weather App</Title>
        </Body>
        <Right>
          <Button>
            <Text onPress={openDialog}>Add</Text>
          </Button>
        </Right>
      </Header>
      <ScrollView>{cities}</ScrollView>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <Dialog.Input
          onChangeText={text => setCityName(text)}
          placeholder="cityname"
        />
        <Dialog.Button label="Cancel" onPress={closeDialog} />
        <Dialog.Button label="Add" onPress={addCity} />
      </Dialog.Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: 12,
  },
  infoItem: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
