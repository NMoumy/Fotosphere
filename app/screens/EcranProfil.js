import { View, Text, Platform, StatusBar, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import NavBar, { navBarIcons } from "../components/main/NavBar";
import InfoProfil from "../components/profil/InfoProfil";
import PostProfil from "../components/profil/PostProfil";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";

export default function EcranProfil() {
  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour titre="Paramètres"/>
      <ScrollView>
        <InfoProfil />
        <PostProfil />
      </ScrollView>
      <NavBar icons={navBarIcons} />
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
