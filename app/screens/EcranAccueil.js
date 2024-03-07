import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, ScrollView, Button } from "react-native";
import Entete from "../components/main/Entete";
import CategoriePhoto from "../components/main/CategoriePhoto";
import Post from "../components/main/Post";
import NavBar, { navBarIcons } from "../components/main/NavBar";
import { obtenirTousLesPosts } from "../services/firebase/fonctionData"; // Assurez-vous que le chemin est correct
import { useEffect, useState } from "react";

export default function EcranAccueil() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const recupererPosts = async () => {
      const donnees = await obtenirTousLesPosts();
      setPosts(donnees);
    };

    recupererPosts();
  }, []);

  return (
    <SafeAreaView style={styles.conteneur}>
      <Entete />
      <CategoriePhoto />
      <ScrollView style={styles.conteneurPosts}>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <NavBar icons={navBarIcons} />
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