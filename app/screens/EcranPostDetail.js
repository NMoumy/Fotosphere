import { Platform, StatusBar, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";
import { getInfosUtilisateur } from "../services/firebase/fonctionUtil";
import { obtenirPostsUtilisateurConnecte, obtenirPostsParUserId } from "../services/firebase/fonctionPost";
import { obtenirDataAutreUser } from "../services/firebase/fonctionUtil";
import Post from "../components/main/Post";

export default function EcranProfilDetail({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const flatListRef = useRef();

  const { userAutre } = route.params;

  useEffect(() => {
    let unsubscribe;

    if (userAutre) {
      obtenirDataAutreUser(userAutre).then((data) => {
        setUser(data);
      });

      unsubscribe = obtenirPostsParUserId(userAutre, (data) => {
        setPosts(data);
      });
    } else {
      getInfosUtilisateur().then((infosUtilisateur) => {
        setUser(infosUtilisateur);
      });

      unsubscribe = obtenirPostsUtilisateurConnecte(setPosts);
    }

    return () => unsubscribe && unsubscribe();
  }, [userAutre]);

  useEffect(() => {
    if (route.params?.post && posts) {
      const index = posts.findIndex((post) => post.id === route.params.post.id);
      if (index >= 0) {
        flatListRef.current?.scrollToIndex({ index });
      }
    }
  }, [posts, route.params?.post]);

  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour navigation={navigation} titre={user ? user.pseudo : "Chargement..."} />
      <FlatList
        ref={flatListRef}
        data={posts}
        style={{ backgroundColor: "#FAFAFA" }}
        keyExtractor={(post) => post.id}
        renderItem={({ item: post }) => <Post post={post} user={user} estEcranAccueil={false} />}
        removeClippedSubviews={true}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
      />
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
