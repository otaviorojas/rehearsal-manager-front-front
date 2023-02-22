// Homescreen.js
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Keyboard
} from "react-native";
import {
  ForceTouchGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import { find } from "../FetchAPI";
import TextCentered from "./TextCentered";
// import styles from './style';
import { Icon } from 'react-native-elements'



const SearchScreen = ({ navigation, route }) => {
  //variaveis tratadas separadamente
  const [seachName, setSeachName] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [address, setAddress] = useState(false);
  const [ensaios, setEnsaios] = useState();
  const [isLoading, setLoading] = useState(
    // necessario para o IOS
    ForceTouchGestureHandler.forceTouchAvailable
  );

  const getAll = async () => {
    Keyboard.dismiss()
    setLoading(true)
    setEnsaios(null);
    setIsExpanded(false);
    const controller = new AbortController();
    const signal = controller.signal;
    // ordenação pelo nome do local
    const sort = { "locality.name": 1 };
    // filtra utilizando o campo de busca
    // regex => ^: iniciado por, i: coloca a string em maiusculo
    //se retirar o ^ a busca fica LIKE 
    const filter = seachName
      ? { "locality.name": { $regex: "^" + seachName, $options: "i" } }
      : null;
    console.log(filter)
    find("ccb_rehearsal_manager", "rehearsal", filter, sort, signal).then(
      (response) => {
        console.log("REGISTROS: ", response);
        setEnsaios(response.documents);
        setLoading(false);
      }
    );

    return () => {
      console.log("abortou");
      controller.abort();
    };
  };

  const getByFilters = (variableName, value) => {

    Keyboard.dismiss()
    setLoading(true)
    setEnsaios(null);
    setIsExpanded(false);
    const controller = new AbortController();
    const signal = controller.signal;

    // define em um formato key value a busca: nome do campo + valor
    var search = {};
    search[variableName] = value;

    find("ccb_rehearsal_manager", "rehearsal", search, signal).then(
      (response) => {
        console.log("REGISTROS: ", response);
        setEnsaios(response.documents);
        setLoading(false);
      }
    );
    return () => {
      console.log("abortou");
      controller.abort();
    };

  };

  //Montango a URL para o MAPA (baseado no SO)
  const url = Platform.select({
    ios: 'maps:0,0?q=' + address + '',
    android: 'geo:0,0?q=' + address + '',
  })

  const ExpandableView = ({ expanded = false }) => {
    const [height] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.timing(height, {
        toValue: expanded ? 200 : 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }, [expanded, height]);

    // console.log('rerendered');

    return (
      <Animated.View style={{ height, backgroundColor: "#f0f0f0" }}>
        <Text style={styles.textList}>Dia da Semana</Text>
        <View style={styles.footerWrapper}>

          <TouchableOpacity
            onPress={() => {
              getByFilters('name_week_day', 'sabado');
            }}>
            <Text style={styles.defaultButtonTab}>Sabado</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              //setSearchFilters('domingo');
              getByFilters('name_week_day', 'domingo');
            }}>
            <Text style={styles.defaultButtonTab}>Domingo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.textList}>Ordenação</Text>
        <View style={styles.footerWrapper}>
          <TouchableOpacity
            onPress={() => {
              getByFilters('day', 'primeiro');
            }}>
            <Text style={styles.defaultButtonTab}>Primeiro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              getByFilters('day', 'segundo');
            }}>
            <Text style={styles.defaultButtonTab}>Segundo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              getByFilters('day', 'terceiro');
            }}>
            <Text style={styles.defaultButtonTab}>Terceiro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              getByFilters('day', 'quarto');
            }}>
            <Text style={styles.defaultButtonTab}>Quarto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              getByFilters('day', 'ultimo');
            }}>
            <Text style={styles.defaultButtonTab}>Ultimo</Text>
          </TouchableOpacity>
        </View>
      </Animated.View >
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.text}>Casa de oração:</Text>
        <View style={{ flex: 0.01, flexDirection: "row" }} />
        <View style={styles.line}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar..."
            placeholderTextColor="#999999"
            textAlign="left"
            autoCapitalize="none"
            maxLength={16}
            clearButtonMode="always"
            onChangeText={(username) => setSeachName(username)}
          />
          <TouchableOpacity onPress={() => getAll()}>
            <Text style={styles.button}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* View dos botoes: filtro e limpar */}
        <View style={styles.line}>
          {/* Botao FILTRO*/}
          <TouchableOpacity
            onPress={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <Text style={styles.buttonFilter}>Filtro</Text>
            <Text style={{ ...styles.contentTextList, textTransform: "capitalize" }} />
          </TouchableOpacity>
          {/* Botao do LIMPAR */}
          <TouchableOpacity
            onPress={() => {
              setEnsaios(null);
              setIsExpanded(false)
              Keyboard.dismiss()
            }}
          >
            <Text style={styles.buttonFilter}>Limpar</Text>

            <Text style={{ ...styles.contentTextList, textTransform: "capitalize" }} />

          </TouchableOpacity>
        </View>


        {isExpanded ? <ExpandableView expanded={isExpanded} /> : ""}


        {/* Lista de resultados: */}
        {ensaios && ensaios.length > 0 && ensaios ? (

          <ScrollView>
            <Text style={styles.smallText}>Encontrados: <Text style={{ fontWeight: 'bold' }}>{ensaios.length}</Text></Text>
            {ensaios.map((ensaio, idx) => (
              <>
                {/* Ativar esse touchable em caso futuro (pagina de detalhes) */}
                {/* <TouchableOpacity 
                  key={idx}
                  onPress={() =>
                    navigation.navigate("Nome", {
                      ensaio: ensaio.name,
                      ensaioID: ensaio._id,
                    })
                  }
                  style={{ ...styles.shadow }}
                > */}
                <Text style={styles.textLocalityName}>
                  {ensaio.locality.name}
                </Text>
                <View key={idx} style={styles.line}>

                  <View style={styles.colunms}>
                    <Text style={styles.contentTextList}>
                      <Text style={{ fontWeight: 'bold' }}>Encarregado: </Text> {ensaio.locality.music_manager_id.name}
                    </Text>
                    <Text
                      style={{
                        ...styles.contentTextList,
                        textTransform: "capitalize",
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', textTransform: "none", }}>Dia do mês: </Text> {ensaio.day} {ensaio.name_week_day}
                    </Text>
                    <Text style={styles.contentTextList}>
                      <Text style={{ fontWeight: 'bold', textTransform: "none", }}>Horário: </Text>{ensaio.time}
                    </Text>
                    <Text></Text>
                  </View>

                  <View style={styles.colunms}>

                    {/* Pendente: Limpar o endereço antigo antes de atualizar */}
                    <TouchableOpacity key={idx} onPress={() => {
                      setAddress(ensaio.locality.address + ' - ' + ensaio.locality.zip_code)
                      Linking.openURL(url)
                    }
                    }>
                      <Icon key={idx}
                        reverse
                        name='map'
                        type='ionicon'
                        color='#043d60'
                      />

                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                {/* </TouchableOpacity> */}
              </>
            ))}


          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading ? <TextCentered content={"Carregando..."} /> : ""}
            {/* <TextCentered content={"Não há resultados"} /> */}

          </View>
        )}
      </View>
    </View>


  );
};

export default SearchScreen;

const largura = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 1,
    margin: largura / 50,
    borderRadius: 5,
  },
  line: {
    flexDirection: "row",
  },
  colunms: {
    flexDirection: "column",
    justifyContent: "center",
    width: largura - (largura / 4),
  },
  lines: {
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#043d60",
    margin: 5,
    color: "white",
    borderRadius: 7,
    fontSize: 16,
    overflow: "hidden",
    padding: largura / 40,
    width: largura / 4,
    textAlign: "center",
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
  },
  input: {
    backgroundColor: "#f3f3f3",
    textAlign: "center",
    margin: 5,
    padding: largura / 40,
    height: largura / 10,
    borderRadius: 7,
    width: largura / 1.5,
  },
  text: {
    padding: largura / 40,
    fontSize: largura / 15,
    color: "#043d60",
  },
  smallText: {
    padding: largura / 40,
    fontSize: largura / 30,
    color: "#043d60",
  },
  textList: {
    padding: largura / 40,
    fontSize: largura / 20,
    color: "#043d60",
  },
  textLocalityName: {
    padding: largura / 40,
    fontSize: largura / 20,
    color: "#043d60",
    fontWeight: 'bold',
  },
  contentTextList: {
    paddingStart: largura / 40,
    fontSize: largura / 25,
  },
  defaultButtonTab: {
    // justifyContent: 'center',
    // alignItems: 'center',
    maxWidth: 80,
    height: 30,
    padding: 5,
    borderRadius: 13,
    borderStyle: "solid",
    borderWidth: 1.3,
    borderColor: "rgba(131, 143, 158, 0.7)",
    marginRight: 10,
    marginTop: -10,
  },
  buttonTab: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 150,
    height: 30,
    padding: 10,
    borderRadius: 13,
    borderStyle: "solid",
    borderWidth: 1.3,
    borderColor: "#1994fc",
    marginRight: 10,
    marginTop: 10,
  },
  footerWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    padding: largura / 40,
  },
});
