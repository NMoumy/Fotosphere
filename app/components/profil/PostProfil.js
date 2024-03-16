import React, { useEffect, useState } from "react";
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Animated, Dimensions, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { obtenirPostsAimesParUtilisateur, obtenirPostsParUserId, obtenirPostsUtilisateurConnecte } from "../../services/firebase/fonctionPost";
import { auth } from "../../services/firebase/init";

export default function PostProfil({ userAutre, estEcranProfilAutre }) {
  const [categorieSelectionnee, setCategorieSelectionnee] = useState(0);
  const positionBarre = useState(new Animated.Value(0))[0];
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [postsAimes, setPostsAimes] = useState([]);
  const [postsAffiches, setPostsAffiches] = useState([]);

  useEffect(() => {
    let unsubscribe;

    if (estEcranProfilAutre) {
      unsubscribe = obtenirPostsParUserId(userAutre, setPosts);
    } else {
      unsubscribe = obtenirPostsUtilisateurConnecte(setPosts);
    }

    // Se désinscrire de l'écouteur lorsque le composant est démonté
    return () => unsubscribe();
  }, [userAutre, estEcranProfilAutre]);

  useEffect(() => {
    const obtenirPostsAimes = async () => {
      const userId = estEcranProfilAutre ? userAutre : auth.currentUser.uid;
      const posts = await obtenirPostsAimesParUtilisateur(userId);
      setPostsAimes(posts);
    };

    obtenirPostsAimes();
  }, [userAutre, estEcranProfilAutre]);

  useEffect(() => {
    if (categorieSelectionnee === 0) {
      setPostsAffiches(posts);
    } else if (categorieSelectionnee === 1) {
      setPostsAffiches(postsAimes);
    }
  }, [categorieSelectionnee, posts, postsAimes]);

  const selectionnerCategorie = (index) => {
    setCategorieSelectionnee(index);
    Animated.timing(positionBarre, {
      toValue: (Dimensions.get("window").width / 2) * index,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  
  const gererClick = (post) => {
    if (categorieSelectionnee === 0) {
    navigation.navigate("PostDetail", { post, userAutre: userAutre });
    }
  };

  const categories = [
    {
      nom: "galerie",
      active: require("../../assets/images/galerie-active.png"),
      inactive: require("../../assets/images/galerie-inactive.png"),
    },
    {
      nom: "coeur",
      active: require("../../assets/images/coeur-active.png"),
      inactive: require("../../assets/images/coeur-inactive.png"),
    },
  ];

  return (
    <View style={styles.conteneur}>
      <View style={styles.conteneurCategorie}>
        {categories.map((categorie, index) => (
          <View key={index} style={styles.categorie} onTouchEnd={() => selectionnerCategorie(index)}>
            <Image
              source={categorieSelectionnee === index ? categorie.active : categorie.inactive}
              style={styles.icon}
            />
          </View>
        ))}
        <View style={styles.barreNonSelectionee} />
        <Animated.View
          style={[
            styles.barre,
            { width: Dimensions.get("window").width / 2, transform: [{ translateX: positionBarre }] },
          ]}
        />
      </View>

      <View style={styles.conteneurImages}>
        <FlatList
          data={postsAffiches}
          renderItem={({ item }) => (
            <View style={styles.imageConteneur}>
              <TouchableOpacity onPress={() => gererClick(item)}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "white",
  },

  conteneurCategorie: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingTop: 10,
  },

  categorie: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },

  barre: {
    position: "absolute",
    bottom: 0,
    height: 2,
    backgroundColor: "#EA5D55",
  },

  barreNonSelectionee: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "100%",
    backgroundColor: "#D9D9D9",
  },

  conteneurImages: {
    flex: 1,
    minHeight: 345,
    backgroundColor: "#fafafa",
    paddingVertical: 10,
  },

  imageConteneur: {
    flex: 1,
    aspectRatio: 1,
    flexDirection: "column",
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    borderRadius: 4,
    width: "100%",
    aspectRatio: 1,
  },
});
