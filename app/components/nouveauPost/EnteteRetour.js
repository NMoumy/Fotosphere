import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

export default function EnteteRetour({ navigation, titre, getEranProfil }) {
  return (
    <View style={styles.conteneur}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require("../../assets/images/fleche.png")} style={styles.btnRetour} />
      </TouchableOpacity>
      <Text style={styles.texteEntete}>{titre}</Text>
      {titre === getEranProfil ? (
        <TouchableOpacity onPress={() => navigation.navigate("Parametre")}>
          <Image source={require("../../assets/images/parametre.png")} style={styles.btnParametre} />
        </TouchableOpacity>
      ) : (
        <View style={{height: 40, width: 40}}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  btnRetour: {
    height: 40,
    width: 40,
  },
  btnParametre: {
    height: 25,
    width: 25,
  },
  texteEntete: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    // backgroundColor: "red",
    color: "#222222",
  },
});
