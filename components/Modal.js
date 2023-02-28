import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import FilterButtons from "./FilterButtons.js";

const { height } = Dimensions.get("window");

const Modal = ({ bean, show, close, getByFilters }) => {
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

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
        <View style={styles.indicator} />

        <FilterButtons
          titulo={"Dia da Semana"}
          lista={["sabado", "domingo"]}
          bean={bean}
        />

        <FilterButtons
          titulo={"Posição no mês:"}
          lista={["primeiro", "segundo", "terceiro", "quarto", "ultimo"]}
          bean={bean}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 95,
    borderRadius: 20,
    justifyContent: "center",
    width: "100%",
    height: "30%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    position: "absolute",
  },
  modal: {
    marginStart: 30,
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
    width: 50,
    height: 5,
    marginStart: 290,
    backgroundColor: "#ccc",
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 5,
  },
  text: {
    fontSize: 15,
    marginTop: 40,
    textAlign: "center",
  },
  btn: {
    width: "40%",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
});

export default Modal;
