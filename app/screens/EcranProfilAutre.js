import { View, Text, Platform, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import NavBar, { navBarIcons } from "../components/main/NavBar";
import InfoProfil from "../components/profil/InfoProfil";
import PostProfil from "../components/profil/PostProfil";
import EnteteRetour from "../components/nouveauPost/EnteteRetour";
import { ScrollView } from "react-native-virtualized-view"; //! Pour éviter le bug de FlatList
import { obtenirDataAutreUser } from "../services/firebase/fonctionUtil";

export default function EcranProfilAutre({ navigation, route }) {
  const nonProfil = "nonProfil";

  const [userData, setUserData] = useState(null);
  const { userId } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await obtenirDataAutreUser(userId);
      setUserData(data);
    };

    fetchUserData();
  }, [userId]);

  return (
    <SafeAreaView style={styles.conteneur}>
      <EnteteRetour
        navigation={navigation}
        titre={userData ? userData.pseudo : "Loading..."}
        getEranProfil={nonProfil}
      />
      <ScrollView>
        <InfoProfil userAutre={userData} userAutreId={userId} estEcranProfilAutre={true}/>
        <PostProfil userAutre={userId} estEcranProfilAutre={true}/>
      </ScrollView>
      {/* <NavBar icons={navBarIcons} /> */}
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
