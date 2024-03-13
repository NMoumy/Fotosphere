import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Commentaires from "./Commentaires";
import { ajouterCommentaire, obtenirCommentaires } from "../../services/firebase/fonctionCommentaire";
import { getInfosUtilisateur } from "../../services/firebase/fonctionUtil";
import { useNavigation } from "@react-navigation/native";

export default function Post({ post }) {
  const [activeLike, setActiveLike] = useState(false);
  const [nombreLikes, setNombreLikes] = useState(post.likes);
  const [modalVisible, setModalVisible] = useState(false);
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");
  const [commentaires, setCommentaires] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = obtenirCommentaires(post.id, setCommentaires);

    // Arrêter d'écouter les modifications lorsque le composant est démonté
    return () => unsubscribe();
  }, [post.id]);

  const soumettreCommentaire = async () => {
    try {
      const infosUtilisateur = await getInfosUtilisateur();
      await ajouterCommentaire(post.id, infosUtilisateur, nouveauCommentaire);
      setNouveauCommentaire("");
      console.log("Commentaire ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de la soumission du commentaire:", error);
    }
  };

  const basculerLike = () => {
    setActiveLike(!activeLike);
    if (!activeLike) {
      setNombreLikes(nombreLikes + 1);
    } else {
      setNombreLikes(nombreLikes - 1);
    }
  };

  const ouvrirCommentaires = () => {
    setModalVisible(true);
  };

  const fermerCommentaires = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.conteneur}>
      <View style={styles.entetePost}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfilAutre", { userId: post.userId })}>
          <View style={styles.infoProfil}>
            <Image
              source={
                typeof post.utilisateur.photoProfil === "string"
                  ? { uri: post.utilisateur.photoProfil }
                  : require("../../assets/images/image-defaut.jpg")
              }
              style={{ width: 40, height: 40, borderRadius: 50, borderWidth: 1, borderColor: "#D9D9D9" }}
            />
            <Text style={{ fontFamily: "Inter-Bold", color: "#222222" }}>{post.utilisateur.pseudo}</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ color: "#7C8089", fontFamily: "Inter-Regular" }}>
          {post.date ? new Date(post.date.seconds * 1000).toLocaleDateString("fr-CA") : "Loading..."}
        </Text>
      </View>

      <View style={styles.conteneurMedia}>
        <Image
          source={
            typeof post.imageUrl === "string" ? { uri: post.imageUrl } : require("../../assets/images/image-defaut.jpg")
          }
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>

      <View style={styles.infoPost}>
        <Text style={{ fontFamily: "Inter-Regular", color: "#222222" }}>{post.description}</Text>

        <View style={styles.conteneurIcons}>
          <TouchableOpacity onPress={basculerLike} style={styles.conteneurLikes}>
            <Image
              source={
                activeLike ? require("../../assets/images/coeur-rempli.png") : require("../../assets/images/coeur.png")
              }
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
            <Text style={{ color: "#7C8089" }}>{nombreLikes.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ouvrirCommentaires} style={styles.conteneurCommentaires}>
            <Image
              source={require("../../assets/images/commentaire.png")}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
            <Text style={{ color: "#7C8089" }}>{commentaires ? commentaires.length : 0}</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.supperpostion}>
            <View style={styles.conteneurGlobalCommentaires}>
              <View style={styles.enteteCommentaire}>
                <View />
                <Text style={styles.enteteTexte}>{commentaires?.length || 0} commentaires</Text>
                <TouchableOpacity onPress={fermerCommentaires} style={{}}>
                  <Image style={styles.btnQuitter} source={require("../../assets/images/btn-quitter.png")} />
                </TouchableOpacity>
              </View>
              <Commentaires commentaires={commentaires} />
              <View style={styles.conteneurAjoutCommentaire}>
                <TextInput
                  type="text"
                  placeholder="Ajouter un commentaire"
                  style={styles.ajoutCommentaire}
                  value={nouveauCommentaire}
                  onChangeText={setNouveauCommentaire}
                  onSubmitEditing={soumettreCommentaire}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    // Conteneur global
    paddingVertical: 15,
    color: "red",
  },
  entetePost: {
    // Contenuer du profil et de la date
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 5,
    alignItems: "center",
  },
  infoProfil: {
    // du nom et de la photo de profil
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  conteneurMedia: {
    // Conteneur de l'image
    width: "100%",
    height: 325,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#D9D9D9",
  },
  infoPost: {
    // Conteneur des likes, commentaires et description
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  conteneurIcons: {
    // Conteneur des likes et commentaires
    flexDirection: "row",
    gap: 20,
  },
  conteneurLikes: {
    // Conteneur des likes
    flexDirection: "row",
    paddingTop: 10,
    gap: 5,
    alignItems: "center",
  },
  conteneurCommentaires: {
    // Conteneur des commentaires
    flexDirection: "row",
    paddingTop: 10,
    gap: 5,
    alignItems: "center",
  },
  supperpostion: {
    // Conteneur de la superposition des commentaires
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    // paddingTop: -StatusBar.currentHeight,
  },

  conteneurGlobalCommentaires: {
    // Conteneur des commentaires global
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "70%",
    position: "absolute",
    bottom: 0,
  },
  enteteCommentaire: {
    // Entête des commentaires
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
  },
  enteteTexte: {
    // Texte de l'entête
    alignItems: "flex-start",
    fontFamily: "Inter-SemiBold",
    color: "#EA5D55",
    textAlign: "center",
    fontSize: 16,
  },
  btnQuitter: {
    height: 20,
    aspectRatio: 1,
    // paddingRight: 10,
  },
  conteneurAjoutCommentaire: {
    backgroundColor: "#black",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#D9D9D9",
  },
  ajoutCommentaire: {
    backgroundColor: "#F1F1F1",
    padding: 7,
    borderRadius: 25,
    width: "95%",
  },
});
