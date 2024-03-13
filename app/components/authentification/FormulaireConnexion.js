import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { connecterUtilisateur } from "../../services/firebase/auth"; // Import the function
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/init";

export default function FormulaireConnexion() {
  const [courriel, setCourriel] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.navigate("Accueil");
      } else {
        // L'utilisateur est déconnecté
        console.log('Utilisateur déconnecté');
      }
    });
  
    // Se désabonner de l'écouteur d'état de connexion lorsque le composant est démonté
    return unsubscribe;
  }, []);

  const gererConnexion = async () => {
    try {
      const user = await connecterUtilisateur(courriel, motDePasse);
      console.log("User connecter avec succès");
      navigation.navigate("Accueil");
    } catch (error) {
      console.error("Error pendant la connexion: ", error);
    }
  };

  return (
    <View style={styles.conteneur}>
      <Text style={styles.titreConnexion}>Connexion</Text>
      <TextInput style={styles.input} onChangeText={setCourriel} value={courriel} placeholder="Courriel" />
      <TextInput
        style={styles.input}
        onChangeText={setMotDePasse}
        value={motDePasse}
        placeholder="Mot de passe"
        secureTextEntry
      />
      <TouchableOpacity style={styles.bouton} onPress={gererConnexion}>
        <Text style={styles.texteBouton}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boutonInscription} onPress={() => navigation.navigate("Inscription")}>
        <Text>Nouveau utilisateur ? Inscrit toi</Text>
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
  titreConnexion: {
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
  boutonInscription: {},
});
