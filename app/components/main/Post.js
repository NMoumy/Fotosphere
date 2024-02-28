import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, StatusBar } from "react-native";
import React, { useState } from "react";
import Commentaires from "./Commentaires";

export default function Post({ post }) {
  const [activeLike, setActiveLike] = useState(false);
  const [nombreLikes, setNombreLikes] = useState(post.likes);
  const [modalVisible, setModalVisible] = useState(false);
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
        <View style={styles.infoProfil}>
          <Image
            source={{ uri: post.photoDeProfil }}
            style={{ width: 40, height: 40, borderRadius: 50, borderWidth: 1, borderColor: "#D9D9D9" }}
          />
          <Text style={{ fontFamily: "Inter-Bold", color: "#222222" }}>{post.user}</Text>
        </View>
        <Text style={{ color: "#7C8089", fontFamily: "Inter-Regular" }}>{post.date}</Text>
      </View>

      <View style={styles.conteneurMedia}>
        <Image source={{ uri: post.imageUrl }} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
      </View>

      <View style={styles.infoPost}>
        <Text style={{ fontFamily: "Inter-Regular", color: "#222222" }}>{post.description}</Text>

        <View style={styles.conteneurIcons}>
          <View style={styles.conteneurLikes}>
            <TouchableOpacity onPress={basculerLike}>
              <Image
                source={
                  activeLike
                    ? require("../../assets/images/coeur-rempli.png")
                    : require("../../assets/images/coeur.png")
                }
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <Text style={{ color: "#7C8089" }}>{nombreLikes}</Text>
          </View>

          <View style={styles.conteneurCommentaires}>
            <TouchableOpacity onPress={ouvrirCommentaires}>
              <Image
                source={require("../../assets/images/commentaire.png")}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <Text style={{ color: "#7C8089" }}>{post.commentaires.length}</Text>
          </View>
        </View>

        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.supperpostion}>
            <View style={styles.conteneurGlobalCommentaires}>
              <TouchableOpacity onPress={fermerCommentaires}>
                <Text style={{ fontSize: 30, textAlign: "right", marginRight: 10 }}>✕</Text>
              </TouchableOpacity>
              <Commentaires commentaires={post.commentaires} />
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
    // width: "98%",
    // alignItems: "center",
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
    // backgroundColor: "grey",
  },
  conteneurIcons: {
    // Conteneur des likes et commentaires
    flexDirection: "row",
    gap: 20,
    // backgroundColor: "red",
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
    paddingTop: StatusBar.currentHeight,
  },
  conteneurGlobalCommentaires: {
    // Conteneur des commentaires global
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderTopWidth: 2,
    // borderColor: "#D9D9D9",
    width: "100%",
    height: "70%",
    // justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
  },
});
