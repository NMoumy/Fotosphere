import { StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar } from "react-native";
import React, { Component } from "react";

export default class Entete extends Component {
  render() {
    return (
      <View style={styles.conteneur}>
        <Text style={styles.logo}>FotoSphere</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conteneur: {
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F27059",
    // fontFamily: "Poppins-ExtraBold",
    textAlign: "center",
    padding: 20,
  },
});
