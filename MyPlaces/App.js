
import React, {useState, Component} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import {
  Container,
  Header,
  Body,
  Text,
  Left,
  Right,
  Button,
  Title
} from 'native-base';

import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-community/async-storage';
import Geocoder from 'react-native-geocoder';

const App: () => React$Node = () => {
  const [myPlace, setMyPlace] = useState({
    latitude: 60.55,
    longitude: 22.24,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7
  });

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [place, setPlace] = useState({ name: '', desc: '' });
  const [placeList, setPlaceList] = useState([]);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  Geocoder.fallbackToGoogle("AIzaSyB8rjvDrB9lM67bpc1eafuYVw51OR3HQUA");

  const addPlace = async (place) => {  
    try {
      let res = await Geocoder.geocodeAddress(place.name);
      console.log(res.position);
      setPlaceList([...placeList, { title: place.name, description: place.desc, coords: { latitude: res.position.lat, longitude: res.position.lng } }]);
    }
    catch (err) {
      console.log(err);
    }    
    setDialogVisible(false);
  };

  const markers = placeList.map((item, index) => {
    return (
      <Marker 
          title={item.title} 
          description={item.description} 
          coordinate={item.coords}
          key={index} /> );
  });

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@placeList', JSON.stringify(placeList));
    } catch (e) {
      console.log('Places saving error!');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@placeList');
      if (value !== null) {
        setPlaceList(JSON.parse(value));
      }
    } catch (e) {
      console.log('Places loading error!');
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    storeData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeList]);


  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>My Places</Title>
        </Body>
      </Header>

      <MapView style={{ flex: 1 }} region={myPlace} onRegionChangeComplete={region => setMyPlace(region)}>
        <Marker coordinate={{ latitude: 60.4518, longitude: 22.2666}} />
      </MapView>

      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={openDialog} style={styles.FloatButtonStyle}>
          <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
        </TouchableOpacity>
      </View>

      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Add a new place</Dialog.Title>
        <Dialog.Input
          onChangeText={name => setPlace(name)}
          placeholder="Name"
        />
        <Dialog.Input
          onChangeText={desc => setPlace(desc)}
          placeholder="Description"
        />
        <Dialog.Button label="Cancel" onPress={closeDialog} />
        <Dialog.Button label="Save" onPress={addPlace} />
      </Dialog.Container>
    </Container>

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
