import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

export default function EnteteRetour({ navigation, titre }) {
  return (
    <View style={styles.conteneur}>
      <TouchableOpacity style={{ zIndex: 2, position: "relative" }} onPress={() => navigation.goBack()}>
        <Image source={require("../../assets/images/fleche.png")} style={styles.btnRetour} />
      </TouchableOpacity>
      <Text style={styles.texteEntete}>{titre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "white",
  },
  btnRetour: {
    height: 40,
    width: 40,
    marginLeft: 5,
  },
  texteEntete: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    width: "100%",
    position: "absolute",
  },
});