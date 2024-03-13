import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { getInfosUtilisateur } from "../../services/firebase/fonctionUtil";
import { useNavigation } from "@react-navigation/native";

export default function InfoProfil() {
  const navigation = useNavigation(); // Ajoutez cette ligne

  const [user, setUser] = useState(null);

  useEffect(() => {
    getInfosUtilisateur().then((infosUtilisateur) => {
      setUser(infosUtilisateur);
    });
  }, []);

  return (
    <View style={styles.conteneur}>
      <View style={styles.conteneurImageUtil}>
        <Image source={{ uri: user?.photoCouverture }} style={styles.imageCouverture} />
        <Image source={{ uri: user?.photoProfil }} style={styles.imageProfil} />
      </View>
      <Text style={styles.textNom}>{user?.pseudo}</Text>
      <Text style={styles.textbio}>{user?.bio}</Text>
      <View style={styles.conteneurStatus}>
        <View style={styles.infoStatus}>
          <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 16 }}>126</Text>
          <Text style={{ fontFamily: "Inter-Regular" }}>Publications</Text>
        </View>
        <View style={styles.infoStatus}>
          <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 16 }}>{user?.abonnes.length}</Text>
          <Text style={{ fontFamily: "Inter-Regular" }}>Abonnés</Text>
        </View>
        <View style={styles.infoStatus}>
          <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 16 }}>{user?.abonnements.length}</Text>
          <Text style={{ fontFamily: "Inter-Regular" }}>Abonnements</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bouton} onPress={() => navigation.navigate("ModifProfil")}>
        <Text style={styles.texteBouton}>Modifier le profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    // height: 400,
    paddingBottom: 20,
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "space-between",
  },

  conteneurImageUtil: {
    width: "100%",
    height: 200,
    alignItems: "center",
  },

  imageCouverture: {
    width: "100%",
    height: 125,
  },

  imageProfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // position: "absolute",
    top: "-25%",
    // left: "50%",
    borderWidth: 3,
    borderColor: "white",
  },

  textNom: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    top: -15,
  },

  textbio: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    paddingHorizontal: 10,
  },

  conteneurStatus: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
    width: "85%",
  },

  infoStatus: {
    alignItems: "center",
  },

  bouton: {
    // backgroundColor: "#EA5D55",
    backgroundColor: "#F27059",
    borderWidth: 2,
    borderColor: "#EA5D55",
    width: "40%",
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: "center",
  },

  texteBouton: {
    fontSize: 14,
    color: "white",
    fontFamily: "Inter-SemiBold",
  },
});
