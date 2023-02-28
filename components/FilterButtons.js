import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FilterButtons = ({ titulo, lista, bean }) => {
  return (
    <>
      <Text style={styles.textList}>{titulo}</Text>
      <View style={styles.footerWrapper}>
        {lista.map((item, idx) => (
          <TouchableOpacity
            key={item + "_" + idx}
            onPress={() => {
              bean[item].isActive = !bean[item].isActive;
            }}
          >
            <Text
              style={[
                bean[item].isActive
                  ? styles.activeBtn
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
    padding: 20,
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
    marginRight: 10,
    marginTop: -10,
    textTransform: "capitalize",
  },
  inactiveBtn: {
    maxWidth: 80,
    height: 30,
    padding: 5,
    borderRadius: 13,
    borderStyle: "solid",
    borderWidth: 1.3,
    borderColor: "rgba(131, 143, 158, 0.7)",
    marginRight: 10,
    marginTop: -10,
    textTransform: "capitalize",
  },
});

export default FilterButtons;
