import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, ScrollView } from "react-native";
import Entete from "../components/accueil/Entete";
import CategoriePhoto from "../components/accueil/CategoriePhoto";
import Post from "../components/accueil/Post";
import { POSTS } from "../data/Posts";

export default function App() {
  return (
    <SafeAreaView style={styles.conteneur}>
      <Entete />
      <CategoriePhoto />
      <ScrollView style={styles.conteneurPosts}>
        {POSTS.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  conteneurPosts: {
    flex: 1,
    height: "100%",
    backgroundColor: "#FAFAFA",
    // paddingVertical: 10,
  },
});
