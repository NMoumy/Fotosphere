import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";

export default function Entete() {
  return (
    <View style={styles.conteneur}>
      <Text style={styles.logo}>FotoSphere</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {},

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F27059",
    // fontFamily: "Poppins-ExtraBold",
    textAlign: "center",
    padding: 20,
  },
});
