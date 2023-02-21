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
} from "react-native";
import {
  ForceTouchGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import { find } from "../FetchAPI";
import TextCentered from "./TextCentered";
// import styles from './style';

const SearchScreen = ({ navigation, route }) => {
  //variaveis tratadas separadamente
  const [seachName, setSeachName] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [ensaios, setEnsaios] = useState();
  const [loading, setLoading] = useState(
    // necessario para o IOS
    ForceTouchGestureHandler.forceTouchAvailable
  );

  const getAll = async () => {
    setEnsaios(null);
    const controller = new AbortController();
    const signal = controller.signal;
    // ordenação pelo nome do local
    const sort = { "locality.name": 1 };
    // filtra utilizando o campo de busca
    // regex => ^: iniciado por, i: coloca a string em maiusculo
    const filter = seachName
      ? { "locality.name": { $regex: "^" + seachName, $options: "i" } }
      : null;
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
          <Text style={styles.defaultButtonTab}>Sabado</Text>
          <Text style={styles.defaultButtonTab}>Domingo</Text>
        </View>

        <Text style={styles.textList}>Ordenação</Text>
        <View style={styles.footerWrapper}>
          <Text style={styles.defaultButtonTab}>Primeiro</Text>
          <Text style={styles.defaultButtonTab}>Segundo</Text>
          <Text style={styles.defaultButtonTab}>Terceiro</Text>
          <Text style={styles.defaultButtonTab}>Quarto</Text>
          <Text style={styles.defaultButtonTab}>Ultimo</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <>
      {loading ? (
        <TextCentered content={"Carregando..."} />
      ) : (
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
            {/* Botao do filtro */}
            <TouchableOpacity
              onPress={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              <Text style={styles.button}>Filtro</Text>
            </TouchableOpacity>
            {isExpanded ? <ExpandableView expanded={isExpanded} /> : ""}
            {/* Lista de resultados: */}
            {ensaios && ensaios.length > 0 && ensaios ? (
              <ScrollView>
                {ensaios.map((ensaio, idx) => (
                  <>
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        navigation.navigate("Nome", {
                          ensaio: ensaio.name,
                          ensaioID: ensaio._id,
                        })
                      }
                      style={{ ...styles.shadow }}
                    >
                      <Text style={styles.textList}>
                        {ensaio.locality.name}
                      </Text>
                      <Text style={styles.contentTextList}>
                        Encarregado: {ensaio.locality.music_manager_id.name}
                      </Text>
                      <Text
                        style={{
                          ...styles.contentTextList,
                          textTransform: "capitalize",
                        }}
                      >
                        {ensaio.day} {ensaio.name_week_day}
                      </Text>
                      <Text style={styles.contentTextList}>
                        {ensaio.time} hrs
                      </Text>
                      <View
                        style={{
                          borderBottomColor: "black",
                          borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                      />
                    </TouchableOpacity>
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
                <TextCentered content={"Não há resultados"} />
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default SearchScreen;

const largura = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  main: {
    flex: 1,
    // justifyContent: 'top',
    alignItems: "center",
  },
  container: {
    flex: 1,
    // justifyContent: 'top',
    // alignItems: 'top',
    backgroundColor: "white",
    //flex: 0.5,
    //height: largura / 10,
    padding: 1,
    margin: largura / 50,
    borderRadius: 5,
  },
  line: {
    flexDirection: "row",
  },
  containerTop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    // borderWidth: 1
  },
  containerMiddle: {
    flex: 1,
  },
  lines: {
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#043d60",
    //borderColor: '#ab8008',
    //borderWidth: 1,
    margin: 5,
    color: "white",
    borderRadius: 7,
    fontSize: 16,
    overflow: "hidden",
    padding: largura / 40,
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
    //borderColor: '#2F2F2F', //dark-gray
    //borderWidth: 1,
    width: largura / 1.5,
  },
  text: {
    padding: largura / 40,
    fontSize: largura / 15,
    color: "#043d60",
    //borderColor: '#2F2F2F', //dark-gray
    //borderWidth: 1,
  },
  textList: {
    padding: largura / 40,
    fontSize: largura / 20,
    color: "#043d60",
    //borderColor: '#2F2F2F', //dark-gray
    //borderWidth: 1,
  },

  contentTextList: {
    paddingStart: largura / 40,
    // fontSize: largura / 20,
    // color: "#043d60",
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
    justifyContent: "center",
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
    marginTop: 10,
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
  },
});
