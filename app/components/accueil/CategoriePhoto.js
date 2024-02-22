import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';

export default function CategoriePhoto() {
  const [categorieSelectionnee, setCategorieSelectionnee] = useState(0);
  const positionBarre = useState(new Animated.Value(0))[0];

  const selectionnerCategorie = (index) => {
    setCategorieSelectionnee(index);
    Animated.timing(positionBarre, {
      toValue: (Dimensions.get("window").width / 3) * index,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const categories = ["Nouveautés", "Populaires", "Abonnements"];

  return (
    <View style={styles.conteneur}>
      {categories.map((categorie, index) => (
        <View key={index} style={styles.categorie} onTouchEnd={() => selectionnerCategorie(index)}>
          <Text style={styles.texte}>{categorie}</Text>
        </View>
      ))}
      <View style={styles.barreNonSelectionee} />
      <Animated.View
        style={[
          styles.barre,
          { width: Dimensions.get("window").width / 3, transform: [{ translateX: positionBarre }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
  },
  categorie: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  texte: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#F4845F",
  },
  barre: {
    position: "absolute",
    bottom: 0,
    height: 3,
    backgroundColor: "#EA5D55",
  },
  barreNonSelectionee: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "100%",
    backgroundColor: "#F7B267",
  },
});