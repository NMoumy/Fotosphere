import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, Image } from "react-native";
import React from "react";

export default function EcranIntro() {
  return (
    <SafeAreaView style={styles.conteneur}>
      <View style={styles.logo}>
        <Image style={styles.logoImage} source={require("../assets/images/logo.png")} />
        <Text style={styles.titreLogo}>FotoSphere</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    flex: 1,
    justifyContent: "center",
  },
  logoImage: {
    width: 250,
    height: 250,
    alignSelf: "center",
    resizeMode: "contain",
  },
  titreLogo: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 20,
    color: "#F27059",
    fontFamily: "Poppins-ExtraBold",
  },
});
