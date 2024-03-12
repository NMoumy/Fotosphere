import { View, Text, Platform, StatusBar, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";
import { getInfosUtilisateur, obtenirPostsUtilisateurConnecte } from "../services/firebase/fonctionData";
import PostDetail from "../components/postDetail/PostDetail";
import NavBar, { navBarIcons } from "../components/main/NavBar";

export default function EcranProfilDetail({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const flatListRef = useRef(); // Ajoutez cette ligne

  useEffect(() => {
    getInfosUtilisateur().then((infosUtilisateur) => {
      setUser(infosUtilisateur);
    });

    const unsubscribe = obtenirPostsUtilisateurConnecte(setPosts);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (route.params?.post) {
      const index = posts.findIndex((post) => post.id === route.params.post.id);
      if (index >= 0) {
        flatListRef.current?.scrollToIndex({ index });
      }
    }
  }, [posts, route.params?.post]);

  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour navigation={navigation} titre={user?.pseudo} />
      <FlatList
        ref={flatListRef}
        data={posts}
        style={{ backgroundColor: "#FAFAFA"}}
        keyExtractor={(post) => post.id}
        renderItem={({ item: post }) => <PostDetail post={post} user={user} />}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
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
});
