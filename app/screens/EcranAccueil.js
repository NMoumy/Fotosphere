import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import Entete from "../components/main/Entete";
import CategoriePhoto from "../components/main/CategoriePhoto";
import Post from "../components/main/Post";
import NavBar, { navBarIcons } from "../components/main/NavBar";
import { obtenirTousLesPosts } from "../services/firebase/fonctionPost"; // Assurez-vous que le chemin est correct
import React, { useEffect, useState } from "react";
import { obtenirAbonnements } from "../services/firebase/fonctionAbonnement";

export default function EcranAccueil() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [categorieSelectionnee, setCategorieSelectionnee] = useState(0); // Ajoutez cet état

  const flatListRef = React.useRef(); // Ajoutez cette ligne

  const onCategorieChange = (index) => {
    setCategorieSelectionnee(index);
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // Ajoutez cette ligne
  };

  const chargerPosts = async () => {
    let tousLesPosts = await obtenirTousLesPosts();
    let postsFiltres;

    switch (categorieSelectionnee) {
      case 0: // Nouveautés
        postsFiltres = tousLesPosts; // Pas de filtrage pour les nouveautés
        break;
      case 1: // Populaires
        postsFiltres = [...tousLesPosts].sort((a, b) => b.likes.length - a.likes.length);
        break;
      case 2: // Abonnements
        const abonnements = await obtenirAbonnements();
        postsFiltres = tousLesPosts.filter((post) => {
          return abonnements.includes(post.userId);
        });
        break;
    }

    setPosts(postsFiltres); // Mettez à jour les posts ici
    setRefreshing(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    chargerPosts();
  }, [categorieSelectionnee]); // Ajoutez categorieSelectionnee comme dépendance

  useEffect(() => {
    onRefresh();
  }, [onRefresh]); // Appellez onRefresh au montage du composant

  const renderItem = ({ item }) => <Post key={item.id} post={item} estEcranAccueil={true} />;

  return (
    <SafeAreaView style={styles.conteneur}>
      <Entete />
      <CategoriePhoto onCategorieChange={onCategorieChange} />
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={50}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
