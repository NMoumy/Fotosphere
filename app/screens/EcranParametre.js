import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";

export default function EcranParametre() {
  const deconnecterUtil = () => {
    console.log("Déconnexion de l'utilisateur");
  };

  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour titre="Paramètres" />
      <TouchableOpacity onPress={deconnecterUtil} style={styles.bouton}>
        <Text style={styles.boutonTexte}>Deconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  bouton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  boutonTexte: {
    color: "white",
    textAlign: "center",
  },
});
