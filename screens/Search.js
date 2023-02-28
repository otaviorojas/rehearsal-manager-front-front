// Homescreen.js
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ForceTouchGestureHandler, ScrollView } from "react-native-gesture-handler";
import { find } from "../FetchAPI";
// import styles from './style';
import { Icon } from "react-native-elements";
import FilterButtons from "../components/FilterButtons";
import Modal from "../components/Modal";
import FilterBean from "../FilterBean";
import TextCentered from "../components/TextCentered";
import EnsaiosList from "../components/EnsaiosList";
import { DAY, LOCALITY_NAME, NAME_WEEK_DAY } from "../constants/TagNames";

const SearchScreen = ({ navigation, route }) => {
  //variaveis tratadas separadamente
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedSort, setIsExpandedSort] = useState(false);
  const [ensaios, setEnsaios] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setLoading] = useState(
    // necessario para o IOS
    ForceTouchGestureHandler.forceTouchAvailable
  );

  const [filterBean, setFilterBean] = useState(new FilterBean());

  const getByFilters = async (bean) => {
    Keyboard.dismiss();
    setLoading(true);
    setEnsaios(null);
    const controller = new AbortController();
    const signal = controller.signal;

    const filters = [];

    const searchName = bean.searchName
      ? { "locality.name": { $regex: bean.searchName, $options: "i" } }
      : null;

    searchName ? filters.push(searchName) : "";

    // define em um formato key value a busca: nome do campo + valor
    const weekDay = getValidValues(bean, NAME_WEEK_DAY);
    const orWeekDay = { name_week_day: { $in: weekDay } };
    weekDay.length > 0 ? filters.push(orWeekDay) : "";

    const day = getValidValues(bean, DAY);
    const orDay = { day: { $in: day } };
    day.length > 0 ? filters.push(orDay) : "";

    // ordenação pelo nome da localidade
    const sort = { [LOCALITY_NAME]: 1 };

    const filter = filters.length > 0 ? { $and: filters } : null;
    find("ccb_rehearsal_manager", "rehearsal", filter, sort, signal).then(
      (response) => {
        setEnsaios(response.documents);
        setLoading(false);
      }
    );
    return () => {
      console.log("abortou");
      controller.abort();
    };
  };

  const getValidValues = (bean, tagName) => {
    const values = [];
    Object.entries(bean)
        .filter(([key, value]) => value.tagName == tagName)
        .map(([key, value]) => value.isActive === true ? values.push(key) : ""
        );
    return values;
}

  const sortByName = () => {
    setEnsaios((ensaio) => [...ensaio.reverse()]);
  };

  const ExpandableSortView = ({ expanded }) => {
    const height = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(height, {
        toValue: expanded ? 100 : 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }, [expanded, height]);

    return (
      <Animated.View
        style={{
          height,
          borderRadius: 10,
          margin: 5,
          backgroundColor: "#f0f0f0",
        }}
      >
        <View style={styles.lineSpaceBetwenn}>
          <Text style={styles.textList}>Ordenar por:</Text>
          <TouchableOpacity
            onPress={() => {
              setIsExpandedSort(false);
            }}
          >
            <Icon size={12} reverse name="close" color="#CFCCCC" />
          </TouchableOpacity>
        </View>

        <View style={styles.footerWrapper}>
          <TouchableOpacity
            onPress={() => {
              setIsPressed(!isPressed);
              sortByName();
            }}
          >
            {isPressed ? (
              <Text style={styles.sortButtonTab}>Nome ↓ </Text>
            ) : (
              <Text style={styles.sortButtonTab}>Nome ↑ </Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.text}>Casa de oração:</Text>
        <View style={{ flex: 0.01, flexDirection: "row" }} />
        <View style={styles.line}>
          <View style={{ flex: 5 }}>
            <TextInput
              style={styles.input}
              placeholder="Pesquisar..."
              placeholderTextColor="#999999"
              textAlign="left"
              autoCapitalize="none"
              maxLength={16}
              clearButtonMode="while-editing"
              onChangeText={(searchName) =>
                (filterBean.searchName = searchName)
              }
              onSubmitEditing={() => getByFilters(filterBean)}
              returnKeyType="search"
            ></TextInput>
          </View>
          <View style={{ position: "absolute", left: 258 }}>
            <TouchableOpacity onPress={() => getByFilters(filterBean)}>
              <Icon
                size={28}
                style={styles.button}
                name="search"
                color="#CFCCCC"
              />
              {/* <Text style={styles.button}>Buscar</Text> */}
            </TouchableOpacity>
          </View>

          {/* Botao FILTRO */}
          <TouchableOpacity
            style={{ flexDirection: "row", ...styles.button, width: 80 }}
            onPress={() => {
              setIsExpanded(!isExpanded);
              setIsExpandedSort(false);
            }}
          >
            <Icon size={28} name="list" color="#CFCCCC"></Icon>
            <Text style={{ color: "#CFCCCC", fontSize: 18, padding: 4 }}>
              Filtro
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de resultados: */}
        {ensaios && ensaios.length > 0 && ensaios ? (
          <>
            <View style={styles.lineSpaceBetwenn}>
              <Text style={styles.smallText}>
                Encontrados:{" "}
                <Text style={{ fontWeight: "bold" }}>{ensaios.length}</Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsExpanded(false);
                  setIsExpandedSort(!isExpandedSort);
                }}
              >
                <Text style={styles.smallText}>Ordenar ↑↓</Text>
              </TouchableOpacity>
            </View>
            {isExpandedSort ? (
              <ExpandableSortView expanded={isExpandedSort} />
            ) : (
              ""
            )}

            <EnsaiosList ensaios={ensaios} />
          </>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading ? <TextCentered content={"Carregando..."} /> : ""}
          </View>
        )}
      </View>

      <Modal
        bean={filterBean}
        show={isExpanded}
        close={() => {
          console.log("close");
          setIsExpanded(false);
        }}
      />
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
    // padding: 1,
    // margin: 0,
    borderRadius: 5,
    width: "100%",
    height: "100%",
  },
  line: {
    flexDirection: "row",
  },
  lineSpaceBetwenn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  lines: {
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#043d60",
    margin: 8,
    color: "white",
    borderRadius: 12,
    // fontSize: 16,
    overflow: "hidden",
    padding: largura / 130,
    width: largura / 8,
    textAlign: "center",
  },
  buttonFilter: {
    backgroundColor: "#f3f3f3",
    borderColor: "#043d60",
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
    // padding: largura / 40,
    height: 42,
    borderRadius: 12,
    width: "100%",
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
  sortButtonTab: {
    maxWidth: 100,
    height: 30,
    padding: 5,
    borderRadius: 13,
    borderStyle: "solid",
    borderWidth: 1.3,
    borderColor: "rgba(131, 143, 158, 0.7)",
    marginRight: 10,
    marginTop: -10,
  },
  footerWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    padding: largura / 40,
  },
});


