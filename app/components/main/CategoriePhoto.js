import React, { useState } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";

export default function CategoriePhoto({ onCategorieChange }) {
  const [categorieSelectionnee, setCategorieSelectionnee] = useState(0);
  const positionBarre = useState(new Animated.Value(0))[0];

  const selectionnerCategorie = (index) => {
    setCategorieSelectionnee(index);
    Animated.timing(positionBarre, {
      toValue: (Dimensions.get("window").width / 3) * index,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Informer le composant parent de la nouvelle catégorie sélectionnée
    onCategorieChange(index);
  };

  const categories = ["Nouveautés", "Populaires", "Abonnements"];

  return (
    <View style={styles.conteneur}>
      {categories.map((categorie, index) => (
        <View key={index} style={styles.categorie} onTouchEnd={() => selectionnerCategorie(index)}>
          <Text style={[styles.texte, categorieSelectionnee === index && styles.texteSelectionne]}>{categorie}</Text>
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
    // height: 40,
  },
  categorie: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  texte: {
    textAlign: "center",
    // fontWeight: "bold",
    fontSize: 14,
    color: "#7C8089",
    fontFamily: "Inter-ExtraBold",
  },
  texteSelectionne: {
    color: "#EA5D55",
  },
  barre: {
    position: "absolute",
    bottom: 0,
    height: 2,
    backgroundColor: "#EA5D55",
  },
  barreNonSelectionee: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "100%",
    backgroundColor: "#D9D9D9",
  },
});
