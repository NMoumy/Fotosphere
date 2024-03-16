import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { getInfosUtilisateur } from "../../services/firebase/fonctionUtil";
import { useNavigation } from "@react-navigation/native";
import { sAbonner, seDesabonner } from "../../services/firebase/fonctionAbonnement";
import { obtenirNombrePostsParUserId } from "../../services/firebase/fonctionPost";
import { auth } from "../../services/firebase/init";

export default function InfoProfil({ userAutre, userAutreId, estEcranProfilAutre }) {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const userEcran = estEcranProfilAutre ? userAutre : user;
  const [estAbonne, setEstAbonne] = useState(false);
  const [nombrePosts, setNombrePosts] = useState(0);

  useEffect(() => {
    getInfosUtilisateur().then((infosUtilisateur) => {
      setUser(infosUtilisateur);
      setEstAbonne(infosUtilisateur.abonnements.includes(userAutreId));

      const id = estEcranProfilAutre ? userAutreId : auth.currentUser.uid;

      if (id) {
        obtenirNombrePostsParUserId(id).then((nombrePosts) => {
          setNombrePosts(nombrePosts);
        });
      }
    });
  }, [userAutreId, estEcranProfilAutre]);

  const basculerAbonnement = () => {
    if (estAbonne) {
      seDesabonner(userAutreId);
    } else {
      sAbonner(userAutreId);
    }
    setEstAbonne(!estAbonne);
  };

  return (
    <View style={styles.conteneur}>
      <View style={styles.conteneurImageUtil}>
        <Image source={{ uri: userEcran?.photoCouverture }} style={styles.imageCouverture} />
        <Image source={{ uri: userEcran?.photoProfil }} style={styles.imageProfil} />
      </View>
      <Text style={styles.textNom}>{userEcran?.pseudo}</Text>
      <Text style={styles.textbio}>{userEcran?.bio}</Text>
      <View style={styles.conteneurStatus}>
        <View style={styles.infoStatus}>
          <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 16 }}>{nombrePosts}</Text>
          <Text style={{ fontFamily: "Inter-Regular" }}>Publications</Text>
        </View>
        <View style={styles.infoStatus}>
          <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 16 }}>{userEcran ? userEcran.abonnes.length : 0}</Text>
          <Text style={{ fontFamily: "Inter-Regular" }}>Abonnés</Text>
        </View>
        <View style={styles.infoStatus}>
          <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 16 }}>{userEcran ? userEcran.abonnements.length : 0}</Text>
          <Text style={{ fontFamily: "Inter-Regular" }}>Abonnements</Text>
        </View>
      </View>
      {estEcranProfilAutre ? (
        <TouchableOpacity style={estAbonne ? styles.boutonDesabonne : styles.bouton} onPress={basculerAbonnement}>
          <Text style={estAbonne ? styles.texteBoutonDesabonne : styles.texteBouton}>
            {estAbonne ? "Se désabonner" : "Suivre"}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.bouton} onPress={() => navigation.navigate("ModifProfil")}>
          <Text style={styles.texteBouton}>Modifier le profil</Text>
        </TouchableOpacity>
      )}
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
  boutonDesabonne: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#EA5D55",
    width: "40%",
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: "center",
  },
  texteBoutonDesabonne: {
    fontSize: 14,
    color: "#EA5D55",
    fontFamily: "Inter-SemiBold",
  },
});
