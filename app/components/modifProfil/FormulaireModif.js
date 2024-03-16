import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Platform, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { modifierProfil, getInfosUtilisateur } from "../../services/firebase/fonctionUtil";
import { useNavigation } from "@react-navigation/native";

export default function FormulaireModif() {
  const navigation = useNavigation();

  const [photoProfil, setPhotoProfil] = useState(null);
  const [photoCouverture, setPhotoCouverture] = useState(null);
  const [pseudo, setPseudo] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchUserInfos = async () => {
      try {
        const user = await getInfosUtilisateur();
        setPhotoProfil(user.photoProfil);
        setPhotoCouverture(user.photoCouverture);
        setPseudo(user.pseudo);
        setBio(user.bio);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
      }
    };

    fetchUserInfos();
  }, []);

  const confirmerModifications = async () => {
    try {
      const nouvellesInfos = { pseudo, bio, photoProfil, photoCouverture };
      await modifierProfil(nouvellesInfos);
      alert("Profil mis à jour avec succès !");
      navigation.navigate("Profil");
    } catch (error) {
      // console.error("Erreur lors de la mise à jour du profil :", error);
      alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Désolé, nous avons besoin des permissions pour accéder à votre galerie !");
      }
    })();
  }, []);

  const choisirImage = async (setImage, aspect) => {
    let resultat = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect,
      quality: 1,
    });

    if (!resultat.cancelled) {
      setImage(resultat.assets[0].uri);
    }
  };

  return (
    <View style={styles.conteneur}>
      <View style={styles.conteneurImageUtil}>
        <TouchableOpacity
          onPress={() => choisirImage(setPhotoCouverture, [10, 4])}
          style={styles.imageCouvertureConteneur}
        >
          <Image source={{ uri: photoCouverture }} style={styles.imageCouverture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => choisirImage(setPhotoProfil, [3, 3])}>
          <Image source={{ uri: photoProfil }} style={styles.imageProfil} />
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="Pseudo" value={pseudo} onChangeText={setPseudo} maxLength={30} />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        multiline
        numberOfLines={4}
        maxLength={65}
        value={bio}
        onChangeText={setBio}
      />
      <View style={styles.conteneurBoutons}>
        <TouchableOpacity style={styles.boutonAnnuler} onPress={() => navigation.navigate("Profil")}>
          <Text style={styles.texteBoutonAnnuler}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boutonConfirmer} onPress={confirmerModifications}>
          <Text style={styles.texteBoutonConfirmer}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    paddingBottom: 20,
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    gap: 20,
  },
  conteneurImageUtil: {
    width: "100%",
    height: 200,
    alignItems: "center",
  },
  imageCouvertureConteneur: {
    width: "100%",
    height: 125,
  },
  imageCouverture: {
    width: "100%",
    height: "100%",
  },
  imageProfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    top: "-50%",
    borderWidth: 3,
    borderColor: "white",
  },
  input: {
    // height: 40,
    width: "88%",
    backgroundColor: "#F1F1F1",
    borderColor: "#E7E7E7",
    borderRadius: 5,
    margin: 8,
    borderWidth: 1,
    padding: 10,
  },
  conteneurBoutons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
  },
  boutonAnnuler: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: "#EA5D55",
    borderWidth: 2,
    width: "45%",
    alignItems: "center",
  },
  boutonConfirmer: {
    backgroundColor: "#F27059",
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#EA5D55",
    width: "45%",
    alignItems: "center",
  },
  texteBoutonConfirmer: {
    color: "white",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  texteBoutonAnnuler: {
    color: "#EA5D55",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
});
