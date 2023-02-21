import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

import AboutScreen from './screens/About';
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';


const largura = Dimensions.get('screen').width

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',
    // borderWidth: 1
  },
  containerTop: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1
    margin: 5,
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
    width: largura-20,
    height: largura/4,

  },
  icon: {
    width: largura/1.1,
    height: largura /2.4,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})



const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#d4d9e2ff',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let img;

            if (route.name === 'Pesquisar') {
              img = focused ? require('./assets/find.png') : require('./assets/find-dark.png')
            } else if (route.name === 'Inicio') {
              img = focused ? require('./assets/ccb.png') : require('./assets/ccb-dark.png')
            }
            else if (route.name === 'Sobre') {
              img = focused ? require('./assets/about.png') : require('./assets/about-dark.png')
            }

            // You can return any component that you like here!
            return (
              <Image
                source={img}
                style={{
                  width: 40, height: 40,
                }}
              />
            )
          },
          tabBarOptions: { showLabel: false },
          tabBarActiveTintColor: '#043d60',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Pesquisar" component={SearchScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#d4d9e2ff' } }} />
        <Tab.Screen name="Inicio" component={HomeScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#d4d9e2ff' } }} />
        <Tab.Screen name="Sobre" component={AboutScreen} options={{ headerShown: true, headerStyle: { backgroundColor: '#d4d9e2ff' } }} />
        {/* name="Settings" */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}