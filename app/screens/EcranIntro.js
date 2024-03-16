import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, Image } from "react-native";
import { auth } from "../services/firebase/init";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function EcranIntro() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Accueil");
      } else {
        navigation.navigate("Inscription");
      }
    });

    // Se désabonner de l'écouteur d'état de connexion lorsque le composant est démonté
    return unsubscribe;
  }, []);

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
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
