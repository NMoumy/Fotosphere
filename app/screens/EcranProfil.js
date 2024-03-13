import { Platform, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import NavBar, { navBarIcons } from "../components/main/NavBar";
import InfoProfil from "../components/profil/InfoProfil";
import PostProfil from "../components/profil/PostProfil";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";
import { ScrollView } from "react-native-virtualized-view"; //! Pour éviter le bug de FlatList
import { getInfosUtilisateur } from "../services/firebase/fonctionUtil";

export default function EcranProfil({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getInfosUtilisateur().then((infosUtilisateur) => {
      setUser(infosUtilisateur);
    });
  }, []);

  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour navigation={navigation} titre={user?.pseudo} getEranProfil={user?.pseudo} />
      <ScrollView>
        <InfoProfil />
        <PostProfil />
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
});
