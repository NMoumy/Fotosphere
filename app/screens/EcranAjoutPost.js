import { View, Text, Button, SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import React from "react";
import AjoutPost from "../components/nouveauPost/AjoutPost";
import EnteteRetour from "../components/main/EnteteRetour";

export default function EcranAjoutPost({ navigation }) {
  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour navigation={navigation} titre="Nouvelle publication" />
      <AjoutPost />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
