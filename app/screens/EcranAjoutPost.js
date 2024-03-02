import { View, Text, Button, SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import React from "react";
import { genererUtilisateur } from "../services/firebase/generateurUtilisateurs";
import EnteteNouveauPost from "../components/nouveauPost/EnteteNouveauPost";
import AjoutPost from "../components/nouveauPost/AjoutPost";

export default function EcranAjoutPost() {
  return (
    <SafeAreaView style={styles.conteneur}>
      {/* <Button onPress={genererUtilisateur} title="Ajouter un post" /> */}
      <EnteteNouveauPost />
      <AjoutPost />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
