import { View, Text, Platform, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import NavBar, { navBarIcons } from "../components/main/NavBar";
import InfoProfil from "../components/profil/InfoProfil";
import PostProfil from "../components/profil/PostProfil";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";
import { ScrollView } from "react-native-virtualized-view"; //! Pour éviter le bug de FlatList

export default function EcranProfil({ navigation }) {
  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour navigation={navigation} titre="Paramètres" />
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
