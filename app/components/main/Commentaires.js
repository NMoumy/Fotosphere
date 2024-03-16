import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function Commentaires({ commentaires }) {
  if (!commentaires) {
    return null;
  }

  return (
    <ScrollView style={styles.conteneur}>
      {commentaires.map((commentaire, index) => (
        <View key={index} style={styles.commentaire}>
          <View style={styles.commentaireImage}>
            <Image
              source={
                typeof commentaire.userId.photoProfil === "string"
                  ? { uri: commentaire.userId.photoProfil }
                  : require("../../assets/images/image-defaut.jpg")
              }
              style={styles.imageProfil}
            />
          </View>
          <View style={styles.commentaireTexte}>
            <Text style={styles.utilisateur}>
              {commentaire.userId ? commentaire.userId.pseudo : "Utilisateur inconnu"}
            </Text>
            <Text style={styles.texte}>{commentaire.message}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    padding: 15,
    maxWidth: "100%",
  },
  commentaire: {
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  commentaireImage: {
    flexDirection: "row",
  },
  imageProfil: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  commentaireTexte: {
    // marginLeft: 10,
    paddingLeft: 10,
    flexShrink: 1,
  },
  utilisateur: {
    fontFamily: "Inter-SemiBold",
    color: "#222222",
  },
  texte: {
    fontFamily: "Inter-Regular",
    color: "#222222",
  },
});
