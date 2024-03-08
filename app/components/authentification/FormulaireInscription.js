import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { creerUtilisateur } from "../../services/firebase/auth";

export default function FormulaireInscription() {
  const [pseudo, setPseudo] = useState("");
  const [courriel, setCourriel] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const navigation = useNavigation();

  const gererInscription = async () => {
    try {
      const infosUtilisateur = {
        pseudo,
        photoProfil:
          "https://firebasestorage.googleapis.com/v0/b/fotosphere.appspot.com/o/images%2FDefaut%2Fprofil-defaut.jpg?alt=media&token=540934c0-97c6-4b0e-8d25-ec6eeabbe3eb",
        photoCouverture:
          "https://firebasestorage.googleapis.com/v0/b/fotosphere.appspot.com/o/images%2FDefaut%2Fcouverture-defaut.jpg?alt=media&token=5c48ad39-07a2-4c7a-881b-2c59f7c6a9c3",
        abonnes: [],
        abonnements: [],
        bio: "",
      };
      await creerUtilisateur(courriel, motDePasse, infosUtilisateur);
      // L'utilisateur a été créé avec succès, naviguer vers l'écran modifProfil
      navigation.navigate("Accueil");
    } catch (error) {
      // Une erreur s'est produite lors de la création de l'utilisateur
      console.error("Erreur lors de l'inscription : ", error);
    }
  };

  return (
    <View style={styles.conteneur}>
      <Text style={styles.titreInscription}>Inscription</Text>
      <TextInput style={styles.input} onChangeText={setPseudo} value={pseudo} placeholder="Pseudo" />
      <TextInput style={styles.input} onChangeText={setCourriel} value={courriel} placeholder="Courriel" />
      <TextInput
        style={styles.input}
        onChangeText={setMotDePasse}
        value={motDePasse}
        placeholder="Mot de passe"
        secureTextEntry
      />
      <TouchableOpacity style={styles.bouton} onPress={gererInscription}>
        <Text style={styles.texteBouton}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boutonConnexion} onPress={() => navigation.navigate("Connexion")}>
        <Text>Déjà un compte ? Connecte-toi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    height: 450,
    borderRadius: 20,
    width: "85%",
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    shadowColor: "black",
    elevation: 20,
  },
  titreInscription: {
    fontFamily: "Inter-Bold",
    fontSize: 30,
    color: "#EA5D55",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  bouton: {
    backgroundColor: "#EA5D55",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  texteBouton: {
    color: "#fff",
    fontFamily: "Inter-Bold",
  },
  boutonConnexion: {},
});
