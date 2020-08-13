import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import Dialog from 'react-native-dialog';

import {
  Container,
  Header,
  Body,
  Text,
  Title,
  Left,
  Right,
  Button,
  Card,
  CardItem
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';

const MarkedPlace = (props) => {
  const place = props.title;
  const description = props.details;

  let apikey = '7d379c2782d64a30848cb8db15f5974c';
  let api_url = 'https://api.opencagedata.com/geocode/v1/json';

  let request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + place
    + '&pretty=1'
    + '&no_annotations=1';

  const [lat, setLatitude] = React.useState(0);
  const [lng, setLongitude] = React.useState(0);
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    fetch(request_url)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        setLatitude(data.results[0].geometry.lat);
        setLongitude(data.results[0].geometry.lng);
        setStatus(data.status.message);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Marker
      title={place}
      description={description}
      coordinate={{ latitude: lat, longitude: lng }}
      image={require('./img/place-marker.png')}
    />);
};


const App: () => React$Node = () => {
  const [initialRegion, setInitialRegion] = React.useState({
    latitude: 63.2278,
    longitude: 25.65769,
    latitudeDelta: 9.0,
    longitudeDelta: 9.0
  });

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [placeName, setPlaceName] = React.useState('');
  const [placeDesc, setPlaceDesc] = React.useState('');
  const [placeList, setPlaceList] = React.useState([]);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const addPlace = () => {
    setPlaceList([...placeList, { name: placeName, description: placeDesc }]);
    setDialogVisible(false);
    saveData(placeList);
  };

  const places = placeList.map((place, index) => {
    return <MarkedPlace
      key={index}
      title={place.name}
      details={place.description} />;
  });

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@markers', JSON.stringify(placeList))
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('@markers')
      if (value !== null) {
        setPlaceList(JSON.parse(value))
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  React.useEffect(() => {
    readData()
  }, [])

  return (
    <>
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>My Places</Title>
          </Body>
        </Header>

        <MapView style={{ flex: 1 }} region={initialRegion} onRegionChangeComplete={region => setInitialRegion(region)}>
          {places}
        </MapView>

        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={openDialog} style={styles.FloatButtonStyle}>
            <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
          </TouchableOpacity>
        </View>

        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Add a new place</Dialog.Title>
          <Dialog.Input
            placeholder="Name"
            onChangeText={text => setPlaceName(text)}
          />
          <Dialog.Input
            placeholder="Description"
            onChangeText={text => setPlaceDesc(text)}
          />
          <Dialog.Button label="Cancel" onPress={closeDialog} />
          <Dialog.Button label="Save" onPress={addPlace} />
        </Dialog.Container>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({

  FloatButtonStyle: {
    backgroundColor: '#0e42eb',
    borderColor: '#0e42eb',
    borderWidth: 1,
    height: 60,
    width: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    right: 60,
  },
});

export default App;
