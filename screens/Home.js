// Homescreen.js
import React from 'react';
import { TouchableOpacity, TextInput, View, ScrollView, Text, Image, Dimensions, StyleSheet,ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation'
// import styles from './style';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default class HomeScreen extends React.Component {

  render() {
    console.disableYellowBox = true; 
    return (
      <View style={{ flex: 1, justifyContent: 'top', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 0.5,
            flexDirection: 'row',
            height: 100,
            padding: 45,
            margin: 15,
            borderRadius: 10,
          }}>
  
          <Image
            source={require('../assets/logo-ccb-light.png')}
            style={{ width: 300 }}
            resizeMode="contain"
            resizeMethod="resize"
  
          />
        </View>
  
      </View>
    );
  }
}


const largura = Dimensions.get('screen').width
