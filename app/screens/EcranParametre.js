import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'

export default function EcranParametre() {
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
