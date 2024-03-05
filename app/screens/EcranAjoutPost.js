import { View, Text, Button, SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import React from "react";
import { genererUtilisateur } from "../services/firebase/generateurUtilisateurs";
import AjoutPost from "../components/nouveauPost/AjoutPost";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";

export default function EcranAjoutPost() {
  return (
    <SafeAreaView style={styles.conteneur}>
      {/* <Button onPress={genererUtilisateur} title="Ajouter un post" /> */}
      <EnteteRetour titre="Nouvelle publication" />
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
