// Homescreen.js
import React from 'react';
import { TouchableOpacity, TextInput, View, ScrollView, Text, Image, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { find } from '../FetchAPI';
import { SafeAreaView } from 'react-navigation'
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
// import styles from './style';


export default class SearchScreen extends React.Component {


  state = {
    ensaios: [],
    loading: ForceTouchGestureHandler
  };


  // componentDidMount() {
  //   this.getTest()

  // }

  getAll() {



    const controller = new AbortController()
    const signal = controller.signal
    find('ccb_rehearsal_manager', 'rehearsal', null, signal)
      .then(response => {

        console.log('CARGOS: ', response)
        this.setState({ ensaios: response.documents, loading: false })


        console.log("ENSAIOS")
        console.log(this.state.ensaios.map((cargo, idx) => (console.log(cargo))));
      });

    return () => {
      controller.abort()
    }


  }

  render() {

    

    if (this.state.loading === true) {
      return (
        <View style={styles.containerImage}>
          {/* <Image
            source={require('../../../res/img/loading.gif')}
            style={styles.imagemLoading} /> */}
          <Text>Carregando...</Text>
        </View>
      )
    }

    return (


      <View style={styles.main}>


        <View style={styles.container}>
          <Text style={styles.text}>Casa de oração:</Text>
          <View style={{ flex: 0.01, flexDirection: 'row' }} />
          <View style={styles.line}>
            <TextInput style={styles.input}
              placeholder="Pesquisar..."
              placeholderTextColor="#999999"
              textAlign='left'
              autoCapitalize="none"
              maxLength={16}
              clearButtonMode="always"
              onChangeText={(username) => this.setName(username)}
            />
            <TouchableOpacity onPress={() => this.getAll()}>
              <Text style={styles.button}>
                Buscar
              </Text>
            </TouchableOpacity>
          </View>
          {/* Lista de resultados: */}
          <View>

            {this.state.ensaios.map((cargo, idx) => (
              <TouchableOpacity key={idx} onPress={() => navigation.navigate('Nome', { cargo: name, cargoID: cargo._id })
              } style={{ ...styles.shadow }}>
                <Text style={styles.textList}>{cargo.locality.name}</Text>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>







        </View>






      </View>








    )
  }
}


const largura = Dimensions.get('screen').width

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'top',
    backgroundColor: 'white',
    //flex: 0.5,
    //height: largura / 10,
    padding: 1,
    margin: largura / 50,
    borderRadius: 5,
  },
  line: {
    flexDirection: 'row',
  },
  containerTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    // borderWidth: 1
  },
  containerMiddle: {
    flex: 1,

  },
  lines: {
    flexDirection: 'column'
  },
  button: {
    backgroundColor: '#043d60',
    //borderColor: '#ab8008',
    //borderWidth: 1,
    margin: 5,
    color: 'white',
    borderRadius: 7,
    fontSize: 16,
    overflow: 'hidden',
    padding: largura / 40,
    width: largura / 4,
    textAlign: 'center',
  },
  input: {
    backgroundColor: "#f3f3f3",
    textAlign: 'center',
    margin: 5,
    padding: largura / 40,
    height: largura / 10,
    borderRadius: 7,
    //borderColor: '#2F2F2F', //dark-gray 
    //borderWidth: 1,
    width: largura / 1.5
  },
  text: {
    padding: largura / 40,
    fontSize: largura / 15,
    color: "#043d60"
    //borderColor: '#2F2F2F', //dark-gray 
    //borderWidth: 1,

  },
  textList: {
    padding: largura / 40,
    fontSize: largura / 20,
    color: "#043d60"
    //borderColor: '#2F2F2F', //dark-gray 
    //borderWidth: 1,

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