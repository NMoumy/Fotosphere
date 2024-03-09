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
    const desabonner = obtenirTousLesPosts(
      (tousLesPosts) => {
        setPosts(tousLesPosts);
      },
      (postId, utilisateurMisAJour) => {
        setPosts((postsActuels) => {
          const index = postsActuels.findIndex((post) => post.id === postId);
          if (index !== -1) {
            const nouveauPost = { ...postsActuels[index], utilisateur: utilisateurMisAJour };
            return [...postsActuels.slice(0, index), nouveauPost, ...postsActuels.slice(index + 1)];
          } else {
            return postsActuels;
          }
        });
      }
    );

    // Nettoyer l'effet en se désabonner de l'écouteur de snapshot lorsque le composant est démonté
    return () => desabonner();
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
