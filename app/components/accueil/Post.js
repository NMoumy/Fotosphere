import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function Post({ post }) {
  return (
    <View style={styles.containeur}>
      <View style={styles.entetePost}>
        <View style={styles.infoProfil}>
          <Image source={{ uri: post.photoDeProfil }} style={{ width: 50, height: 50 }} />
          <Text>{post.user}</Text>
        </View>
        <Text>{post.date}</Text>
      </View>

      <Image source={{ uri: post.imageUrl }} style={{ width: "100%", height: 275 }} />

      <View style={styles.infoPost}>
        <Text>{post.description}</Text>
        <Text>{post.likes}</Text>
        {/* <Text>{post.commentaires}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containeur: {
    paddingVertical: 15,
  },
  entetePost: {},
  infoProfil: {},
  infoPost: {},
});
