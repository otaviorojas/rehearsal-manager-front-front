import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FilterButtons from "./FilterButtons.js";
import { Button, Icon } from "react-native-elements";

const { height } = Dimensions.get("window");

const Modal = ({ bean, show, close, updateFilterBean }) => {
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const handleButtonPress = (item) => {

    updateFilterBean(item)

  };

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(state.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModalImmediate = () => {
    Animated.timing(state.modal, {
      duration: 0,
      useNativeDriver: true,
    }).start(close);
  };

  const clear = async () => {
    console.log("clear");
  };

  useEffect(() => {
    show ? openModal() : closeModal();
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >

        <View style={styles.lineSpaceBetwenn}>

          <View>
            <FilterButtons
              titulo={"Região"}
              lista={["carapicuiba", "osasco"]}
              bean={bean}
              updateFilterBean={updateFilterBean}
            />
          </View>
          <View >
            <TouchableOpacity style={styles.closeBtn}
              onPress={() => {
                closeModalImmediate();
              }}>
              <View>
                <Icon
                  size={19}
                  name='close'
                  color='#CFCCCC'
                />
              </View>
            </TouchableOpacity>
          </View>

        </View>

        <FilterButtons
          titulo={"Dia da Semana"}
          lista={["sabado", "domingo"]}
          bean={bean}
          updateFilterBean={updateFilterBean}
        />

        <FilterButtons
          titulo={"Posição no mês:"}
          lista={["primeiro", "segundo", "terceiro", "quarto", "ultimo"]}
          bean={bean}
          updateFilterBean={updateFilterBean}
        />


        <TouchableOpacity
          onPress={() => handleButtonPress(bean)}>
          <Text style={styles.activeBtn}>Buscar</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height / 7.5,
    //marginTop: 95,
    borderRadius: 20,
    justifyContent: "center",
    //width: height/1.8,
    width: "100%",
    height: height / 2.18,
    backgroundColor: "rgba(0, 0, 0, 0)",
    position: "absolute",
  },
  modal: {
    marginStart: height / 5,
    marginEnd: 5,
    height: "100%",
    backgroundColor: "#fff",
    // width: '90%',
    borderColor: "#043d60",
    borderWidth: 0.3,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f3f3f3",
  },
  indicator: {
    width: height / 20,
    backgroundColor: "#000000",
    height: 20,
    padding: 10,
    marginStart: height / 5,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
  },
  activeBtn: {
    marginStart: height / 5,
    borderRadius: 50,
    alignSelf: "center",
    color: "#f0f0f0",
    backgroundColor: "#043d60",
    height: 30,
    padding: 5,
    borderRadius: 13,
    borderStyle: "solid",
    borderWidth: 1.3,
    borderColor: "rgba(131, 143, 158, 0.7)",
    marginRight: 5,
    marginTop: 5,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    marginTop: 40,
    textAlign: "center",
  },
  lineSpaceBetwenn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingRight: 10,
  },
  closeBtn: {
    //esse botao fechar ta horrivel
    borderRadius: 8,
    borderStyle: "solid",
    padding: 5,
    //borderWidth: 0.1,
    borderColor: "rgba(131, 143, 158, 0.7)",
    justifyContent: "center",
  }
});

export default Modal;
