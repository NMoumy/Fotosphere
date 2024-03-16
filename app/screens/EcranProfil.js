import { Platform, StatusBar, SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import NavBar, { navBarIcons } from "../components/main/NavBar";
import InfoProfil from "../components/profil/InfoProfil";
import PostProfil from "../components/profil/PostProfil";
import EnteteRetour from "../components/main/EnteteRetour";
import { ScrollView } from "react-native-virtualized-view"; //! Pour éviter le bug de FlatList
import { getInfosUtilisateur } from "../services/firebase/fonctionUtil";

export default function EcranProfil({ navigation }) {
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const chargerInfosUtilisateur = useCallback(async () => {
    setRefreshing(true);
    const infosUtilisateur = await getInfosUtilisateur();
    setUser(infosUtilisateur);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    chargerInfosUtilisateur();
  }, [chargerInfosUtilisateur]);

  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour navigation={navigation} titre={user?.pseudo} getEranProfil={user?.pseudo} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={chargerInfosUtilisateur} />}>
        <InfoProfil estEcranProfilAutre={false} />
        <PostProfil estEcranProfilAutre={false} />
      </ScrollView>
      <NavBar icons={navBarIcons} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
