import { View, Text, Platform, StatusBar, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";
import FormulaireModif from "../components/modifProfil/FormulaireModif";

export default function EcranModifProfil({navigation}) {
  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour navigation={navigation} titre="Modifier le profil" />
      <FormulaireModif />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
