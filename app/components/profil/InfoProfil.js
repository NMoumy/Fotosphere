import React from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function InfoProfil() {
  const nomUtilisateur = "mododo8990.";
  const bio = "Élaboré dans le respect de l'environnement et des animaux.🍱";
  const nbAbonnes = 100;
  const nbAbonnements = 200;
  const nbPublications = 50;

  const suivreUtilisateur = () => {
    // Logique pour suivre l'utilisateur
  };

  return (
    <View style={styles.conteneur}>
      <View style={styles.conteneurImageUtil}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/18644057/pexels-photo-18644057/free-photo-of-prairie-rural-mouton-troupeau.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
          }}
          style={styles.imageCouverture}
        />
        <Image
          source={{
            uri: "https://images.pexels.com/photos/18189033/pexels-photo-18189033/free-photo-of-animal-mignon-herbe-fourrure.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
          }}
          style={styles.imageProfil}
        />
      </View>
      <Text style={styles.textNom}>{nomUtilisateur}</Text>
      <Text style={styles.textbio}>{bio}</Text>
      <View style={styles.conteneurStatus}>
        <View style={styles.infoStatus}>
          <Text style={{ fontFamily: "Inter-ExtraBold" }}>{nbPublications}</Text>
          <Text style={{ fontFamily: "Inter-Regular" }}>Publications</Text>
        </View>
        <View style={styles.infoStatus}>
          <Text style={{ fontFamily: "Inter-ExtraBold" }}>{nbAbonnes}</Text>
          <Text style={{ fontFamily: "Inter-Regular" }}>Abonnés</Text>
        </View>
        <View style={styles.infoStatus}>
          <Text style={{ fontFamily: "Inter-ExtraBold" }}>{nbAbonnements}</Text>
          <Text style={{ fontFamily: "Inter-Regular" }}>Abonnements</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bouton} onPress={suivreUtilisateur}>
        <Text style={styles.texteBouton}>Suivre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    // height: 400,
    paddingBottom: 20,
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "space-between",
  },

  conteneurImageUtil: {
    width: "100%",
    height: 200,
    alignItems: "center",
  },

  imageCouverture: {
    width: "100%",
    height: 125,
  },

  imageProfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // position: "absolute",
    top: "-25%",
    // left: "50%",
    borderWidth: 5,
    borderColor: "white",
  },

  textNom: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    top: -15,
  },

  textbio: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    paddingHorizontal: 10,
  },

  conteneurStatus: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
    width: "100%",
  },

  infoStatus: {
    alignItems: "center",
  },

  bouton: {
    backgroundColor: "#F27059",
    borderWidth: 2,
    borderColor: "#EA5D55",
    width: "45%",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },

  texteBouton: {
    fontSize: 16,
    color: "white",
    fontFamily: "Inter-SemiBold",
  },
});
