// Homescreen.js
import React from 'react';
import {
  TouchableOpacity,
  View,
  Linking, ScrollView, Text, Image, Dimensions, StyleSheet, ImageBackground
} from 'react-native';

const HomeScreen = ({ navigation, route }) => {

  console.disableYellowBox = true;
  return (
    <View style={styles.main}>
      <View style={styles.container}>

        <Image
          source={require('../assets/logo-ccb-light.png')}
          style={{ width: largura / 1.4, }}
          resizeMode="contain"
          resizeMethod="resize"
        />
        <View style={styles.lineSpaceBetwenn}>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.congregacaocristanobrasil.org.br/')
              }}>

              <View style={styles.c}>
                <Image
                  source={require('../assets/home_2.png')}
                  style={styles.icon}
                />

                <Text style={styles.text}>Portal Oficial</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.congregacaocristanobrasil.org.br/institucional/estatuto')
              }}>
              <Image
                source={require('../assets/est_ccb.png')}
                style={styles.icon}
              />

              <Text style={styles.text}>Estatuto</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>


    </View>
  );
};
export default HomeScreen;

const largura = Dimensions.get('screen').width

const styles = StyleSheet.create({

  main: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    backgroundColor: 'white',
    flex: 0.6,
    flexDirection: 'column',
    height: 100,
    padding: 45,
    margin: 15,
    borderRadius: 10,
  },
  buttonFilter: {
    backgroundColor: "#f3f3f3",
    borderColor: '#043d60',
    borderWidth: 0.2,
    margin: 5,
    color: "#043d60",
    borderRadius: 7,
    fontSize: 16,
    overflow: "hidden",
    padding: largura / 100,
    width: largura / 4,
    textAlign: "center",
    alignItems: 'center'
  },
  line: {
    flexDirection: "row",
  },
  lineSpaceBetwenn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: largura / 10, // largura do ícone
    height: largura / 10, // altura do ícone
    marginRight: 1, // espaçamento entre o ícone e o texto    
    alignSelf: 'center', // alinha a imagem no centro
  },
  text: {
    color: '#043d60', // cor do texto
    fontSize: largura / 30, // tamanho do texto
    fontWeight: 'bold', // negrito
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',

  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4d9e2ff', // cor de fundo do botão
    borderRadius: 8, // bordas arredondadas

    borderColor: '#043d60', // cor da borda
    height: largura / 5, // altura do botão
    width: largura / 4,
  },
})



