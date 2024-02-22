import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";

export default class CategoriePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorieSelectionnee: 0,
      positionBarre: new Animated.Value(0), // Position initiale de la barre
    };
  }

  selectionnerCategorie = (index) => {
    this.setState({ categorieSelectionnee: index });
    Animated.timing(this.state.positionBarre, {
      toValue: (Dimensions.get("window").width / 3) * index, // Divisez la largeur totale par le nombre de catégories
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const categories = ["Nouveautés", "Populaires", "Abonnements"];
    return (
      <View style={styles.conteneur}>
        {categories.map((categorie, index) => (
          <View key={index} style={styles.categorie} onTouchEnd={() => this.selectionnerCategorie(index)}>
            <Text style={styles.texte}>{categorie}</Text>
          </View>
        ))}
        <View style={styles.barreNonSelectionee} />
        <Animated.View
          style={[
            styles.barre,
            { width: Dimensions.get("window").width / 3, transform: [{ translateX: this.state.positionBarre }] },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conteneur: {
    backgroundColor: "dodgerblue",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
  },
  categorie: {
    backgroundColor: "white",
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
    backgroundColor: "red",
  },
  barreNonSelectionee: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "100%",
    backgroundColor: "orange",
  },
});
