import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Platform, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function FormulaireModif() {
  const [imageProfil, setImageProfil] = useState(
    "https://images.pexels.com/photos/18053574/pexels-photo-18053574/free-photo-of-homme-appareil-photo-ete-photographe.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
  );
  const [imageCouverture, setImageCouverture] = useState(
    "https://images.pexels.com/photos/20165766/pexels-photo-20165766/free-photo-of-bois-paysage-eau-ete.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
  );
  const [pseudo, setPseudo] = useState("");
  const [bio, setBio] = useState("");

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
          onPress={() => choisirImage(setImageCouverture, [10, 4])}
          style={styles.imageCouvertureConteneur}
        >
          <Image source={{ uri: imageCouverture }} style={styles.imageCouverture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => choisirImage(setImageProfil, [3, 3])}>
          <Image source={{ uri: imageProfil }} style={styles.imageProfil} />
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="Pseudo" />
      <TextInput style={styles.input} placeholder="Bio" multiline numberOfLines={4} maxLength={65} />
      <View style={styles.conteneurBoutons}>
        <TouchableOpacity style={styles.boutonAnnuler} onPress={() => console.log("Annuler")}>
          <Text style={styles.texteBoutonAnnuler}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boutonConfirmer} onPress={() => console.log("Confirmer")}>
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
    height: 40,
    width: "88%",
    backgroundColor: "#F1F1F1",
    // borderColor: "grey",
    borderColor: "#E7E7E7",
    borderRadius: 5,
    margin: 12,
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
