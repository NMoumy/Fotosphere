import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

export const navBarIcons = [
  {
    nom: "accueil",
    active: require("../../assets/images/accueil-active.png"),
    inactive: require("../../assets/images/accueil-inactive.png"),
  },
  {
    nom: "ajouter",
    active: require("../../assets/images/ajouter-active.png"),
    inactive: require("../../assets/images/ajouter-inactive.png"),
  },
  {
    nom: "profil",
    active: require("../../assets/images/profil-active.png"),
    inactive: require("../../assets/images/profil-inactive.png"),
  },
];

export default function NavBar({ icons }) {
  const [activeOnglet, setActiveOnglet] = useState("Accueil");

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveOnglet(icon.nom)}>
      <Image
        source={activeOnglet === icon.nom ? icon.active : icon.inactive}
        style={icon.nom === "ajouter" ? styles.iconAjouter : styles.icon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.conteneur}>
      {icons.map((icon, index) => (
        <Icon key={index} icon={icon} />
      ))}
    </View>
  );
}
9;

const styles = StyleSheet.create({
  conteneur: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 2,
    borderTopColor: "#D9D9D9",
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  iconAjouter: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});
