import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function Post({ post }) {
  return (
    <View style={styles.containeur}>
      <View style={styles.entetePost}>
        <View style={styles.infoProfil}>
          <Image source={{ uri: post.photoDeProfil }} style={{ width: 40, height: 40, borderRadius: 50 }} />
          <Text style={{ fontFamily: "Inter-Bold", color: "#222222" }}>{post.user}</Text>
        </View>
        <Text style={{ color: "#7C8089", fontFamily: "Inter-Regular", }}>{post.date}</Text>
      </View>

      <View style={styles.conteneurMedia}>
        <Image source={{ uri: post.imageUrl }} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
      </View>

      <View style={styles.infoPost}>
        <Text style={{ fontFamily: "Inter-Regular", color: "#222222" }}>{post.description}</Text>

        <View style={styles.containeurIcons}>
          <View style={styles.containeurLikes}>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/coeur.png")}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <Text style={{ color: "#7C8089" }}>{post.likes}</Text>
          </View>

          <View style={styles.containeurCommentaires}>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/commentaire.png")}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <Text style={{ color: "#7C8089" }}>100</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containeur: {
    paddingVertical: 15,
    color: "red",
    // width: "98%",
    // alignItems: "center",
  },
  entetePost: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 5,
    alignItems: "center",
  },
  infoProfil: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  conteneurMedia: {
    width: "100%",
    height: 325,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#EFEFEF",
  },
  infoPost: {
    paddingHorizontal: 10,
    paddingTop: 5,
    // backgroundColor: "grey",
  },
  containeurIcons: {
    flexDirection: "row",
    gap: 20,
    // backgroundColor: "red",
  },
  containeurLikes: {
    flexDirection: "row",
    paddingTop: 10,
    gap: 5,
    alignItems: "center",
  },
  containeurCommentaires: {
    flexDirection: "row",
    paddingTop: 10,
    gap: 5,
    alignItems: "center",
  },
});
