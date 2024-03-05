import { View, Text, Platform, StatusBar, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import FormulaireInscription from '../components/authentification/FormulaireInscription'

export default function EcranInscription() {
  return (
    <SafeAreaView style={styles.conteneur}>
        <FormulaireInscription />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    backgroundColor: "#EA5D55",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
