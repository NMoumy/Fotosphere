import { View, Text, Platform, StatusBar, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

export default function EcranInscription() {
  return (
    <SafeAreaView style={styles.conteneur}>
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
