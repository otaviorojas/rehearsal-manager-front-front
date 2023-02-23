// Homescreen.js
import React from 'react';
import { TouchableOpacity, TextInput, View, ScrollView, Text, Image, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation'
// import styles from './style';
import { FontAwesome5 } from '@expo/vector-icons';

export default class AboutScreen extends React.Component {

  render() {

    return (



      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, color: "#043d60" }}>Versão:</Text>
        <Text style={{ fontSize: 15, color: "#000" }}>1.0.0</Text>
        <Text></Text>

        <Text style={{ fontSize: 25, color: "#043d60" }}>Contato:</Text>
        <Text style={{ fontSize: 15, color: "#000" }}>dev@gmail.com</Text>
      </View >

    )
  }
}


const largura = Dimensions.get('screen').width

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    // justifyContent: 'center',
    // borderWidth: 1
  },
  containerTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1
  },
  containerMiddle: {
    flex: 1,
  },
  button: {
    backgroundColor: 'black',
    borderColor: '#ab8008',
    borderWidth: 1,
    margin: 5,
    color: '#ab8008',
    borderRadius: 5,
    fontSize: 16,
    overflow: 'hidden',
    padding: largura / 40,
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    margin: 5,
    height: largura / 10,
    borderRadius: 5,
    borderColor: '#2F2F2F', //dark-gray 
    borderWidth: 1,
  },
  imageTop: {
    width: largura - 20,
    height: largura / 4,

  },
  icon: {
    width: largura / 1.1,
    height: largura / 2.4,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})