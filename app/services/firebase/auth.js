import { auth, firestore } from "./init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

// Fonction pour créer un nouvel utilisateur avec email, mot de passe et informations supplémentaires
async function creerUtilisateur(email, password, infosUtilisateur) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Récupérer l'ID de l'utilisateur créé
    const userId = user.uid;

    // Infos par défaut pour un nouvel utilisateur
    const infosParDefaut = {
      abonnes: [],
      abonnements: [],
      bio: "",
      ...infosUtilisateur, // Permet de remplacer les valeurs par défaut avec celles fournies
    };

    // Créer un document pour l'utilisateur dans Firestore avec les informations par défaut
    const userDocRef = doc(firestore, "utilisateurs", userId);
    await setDoc(userDocRef, infosParDefaut);

    return user;
  } catch (error) {
    // console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
}

// Fonction pour connecter un utilisateur avec email et mot de passe
async function connecterUtilisateur(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    // console.error("Erreur lors de la connexion de l'utilisateur :", error);
    throw error;
  }
}

// Fonction pour déconnecter un utilisateur
async function deconnecterUtilisateur(navigation) {
  try {
    await auth.signOut();
    console.log("Déconnexion réussie !");
    navigation.navigate('Connexion'); // Redirige vers la page de connexion
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
}

export { creerUtilisateur, connecterUtilisateur, deconnecterUtilisateur };
