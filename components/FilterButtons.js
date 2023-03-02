import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FilterButtons = ({ titulo, lista, bean, updateFilterBean }) => {
  const [beanState, setBeanState] = useState(bean);


  useEffect(() => {
    return () => {
      // Limpa o estado de bean quando o componente for desmontado
      setBeanState(bean);

    };
  }, [bean]);

  
  const handleButtonPress = (item) => {

    const newBean = {
      ...beanState,
      [item]: {
        ...beanState[item],
        isActive: !beanState[item].isActive,
      },
    };

    setBeanState(newBean);
    //Ao tirar o comentario daqui ai clicar nos botoes ele faz a busca automatica
    //updateFilterBean(newBean); 
    bean[item].isActive = newBean[item].isActive

  };

  return (
    <>
      <Text style={styles.textList}>{titulo}</Text>
      <View style={styles.footerWrapper}>
        {lista.map((item, idx) => (
          <TouchableOpacity
            key={item + "_" + idx}
            onPress={() => handleButtonPress(item)}
          >
            <Text
              style={[
                beanState[item].isActive
                  ? styles.activeBtn2
                  : styles.inactiveBtn,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textList: {
    fontSize: 20,
    color: "#043d60",
  },
  footerWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 10,
  },
  activeBtn: {
    maxWidth: 85,
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
    textTransform: "capitalize",
    overflow: "hidden",
    textAlign:"center",
  },
  activeBtn2: {
    maxWidth: 90,
    color: "#043d60",
    fontWeight: 'bold',
    // backgroundColor: "#043d60",
    height: 30,
    padding: 5,
    borderRadius: 13,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#043d60",
    marginRight: 5,
    marginTop: 5,
    textTransform: "capitalize",
    overflow: "hidden",
    textAlign:"center",
  },
  inactiveBtn: {
    maxWidth: 90,
    height: 30,
    padding: 5,
    borderRadius: 13,
    borderStyle: "solid",
    borderWidth: 1.3,
    borderColor: "rgba(131, 143, 158, 0.7)",
    marginRight: 5,
    marginTop: 5,
    textTransform: "capitalize",
    textAlign:"center",
  },
});

export default FilterButtons;