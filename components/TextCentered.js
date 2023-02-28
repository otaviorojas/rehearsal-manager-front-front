import React from "react";
import { Text, View } from "react-native";

const TextCentered = ({content}) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>{content}</Text>
    </View>
  );
};

export default TextCentered;
