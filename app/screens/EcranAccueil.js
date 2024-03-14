import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, ScrollView, RefreshControl, FlatList } from "react-native";
import Entete from "../components/main/Entete";
import CategoriePhoto from "../components/main/CategoriePhoto";
import Post from "../components/main/Post";
import NavBar, { navBarIcons } from "../components/main/NavBar";
import { obtenirTousLesPosts } from "../services/firebase/fonctionPost"; // Assurez-vous que le chemin est correct
import React, { useEffect, useState } from "react";

export default function EcranAccueil() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const chargerPosts = () => {
    return obtenirTousLesPosts(
      (tousLesPosts) => {
        setPosts(tousLesPosts);
        setRefreshing(false);
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
  };

  useEffect(() => {
    const desabonner = chargerPosts();
    return () => desabonner();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    chargerPosts();
  }, []);

  const renderItem = ({ item }) => (
    <Post key={item.id} post={item} estEcranAccueil={true} />
  );

  return (
    <SafeAreaView style={styles.conteneur}>
      <Entete />
      <CategoriePhoto />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
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