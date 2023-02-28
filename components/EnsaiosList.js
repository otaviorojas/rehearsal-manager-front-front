import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";

const EnsaiosList = ({ ensaios }) => {
  //Montango a URL para o MAPA (baseado no SO)
  const url = (ensaio) => {
    return Platform.select({
      ios:
        "maps:0,0?q=" +
        ensaio.locality.address +
        "-" +
        ensaio.locality.zip_code,
      android:
        "geo:0,0?q=" + ensaio.locality.address + "-" + ensaio.locality.zip_code,
    });
  };

  return (
    <ScrollView>
      {ensaios.map((ensaio, idx) => (
        <>
          <Text
            key={`${ensaio.locality.name}_${idx}`}
            style={styles.textLocalityName}
          >
            {ensaio.locality.name}
          </Text>
          <View key={`content_${idx}`} style={styles.line}>
            <View key={`column_info_${idx}`} style={styles.colunms}>
              <Text style={styles.contentTextList}>
                <Text style={{ fontWeight: "bold" }}>Encarregado: </Text>{" "}
                {ensaio.locality.music_manager_id.name}
              </Text>
              <Text style={styles.contentTextList}>
                <Text style={styles.contentTextBold}>Dia do mês: </Text>{" "}
                {ensaio.day} {ensaio.name_week_day}
              </Text>
              <Text style={styles.contentTextList}>
                <Text style={styles.contentTextBold}>Horário: </Text>
                {ensaio.time}
              </Text>
            </View>

            <View key={`column_map_${idx}`} style={styles.colunms}>
              {/* Pendente: Limpar o endereço antigo antes de atualizar */}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(url(ensaio));
                }}
              >
                <Icon
                  reverse
                  name="map"
                  type="ionicon"
                  color="#043d60"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            key={`line_${idx}`}
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </>
      ))}
    </ScrollView>
  );
};

const largura = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  textLocalityName: {
    padding: largura / 40,
    fontSize: largura / 20,
    color: "#043d60",
    fontWeight: "bold",
  },
  contentTextList: {
    paddingStart: largura / 40,
    fontSize: largura / 25,
    textTransform: "capitalize",
  },
  contentTextBold: {
    fontWeight: "bold",
    textTransform: "none",
  },
  colunms: {
    flexDirection: "column",
    justifyContent: "center",
    width: largura - largura / 4,
  },
  line: {
    flexDirection: "row",
  },
});

export default EnsaiosList;
