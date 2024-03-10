import { View, Text, Platform, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";
import { getInfosUtilisateur } from "../services/firebase/fonctionData";
import Post from "../components/main/Post";

export default function EcranProfil({ navigation, route }) {
  const [user, setUser] = useState(null);
  const { post } = route.params;

  useEffect(() => {
    getInfosUtilisateur().then((infosUtilisateur) => {
      setUser(infosUtilisateur);
    });
  }, []);
  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour navigation={navigation} titre={user?.pseudo} />
      <Post post={post} />
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
