import { Text, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import EnteteRetour from "../components/main/EnteteRetour";
import { deconnecterUtilisateur } from "../services/firebase/auth";

export default function EcranParametre({ navigation }) {
  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour titre="Paramètres" navigation={navigation} />
      <TouchableOpacity onPress={() => deconnecterUtilisateur(navigation)} style={styles.bouton}>
        <Text style={styles.boutonTexte}>Deconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  bouton: {
    backgroundColor: "#F27059",
    borderColor: "#EA5D55",
    borderWidth: 2,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
    width: "92%",
    borderRadius: 5,
    margin: 10,
  },
  boutonTexte: {
    color: "white",
    textAlign: "center",
    fontFamily: "Inter-Bold",
  },
});
