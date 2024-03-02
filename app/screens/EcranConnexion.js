import { View, Text, StyleSheet, StatusBar, Platform, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import FormulaireConnexion from '../components/authentification/FormulaireConnexion';

import React from 'react'

export default function EcranConnexion() {
  return (
    <SafeAreaView style={styles.conteneur}>
        <FormulaireConnexion />
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
