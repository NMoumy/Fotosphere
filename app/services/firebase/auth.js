import { auth, firestore } from "./init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Fonction pour créer un nouvel utilisateur avec email, mot de passe et informations supplémentaires
async function creerUtilisateur(email, password, infosUtilisateur) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Récupérer l'ID de l'utilisateur créé
    const userId = user.uid;

    // Créer un document pour l'utilisateur dans Firestore avec les informations supplémentaires
    const userDocRef = doc(firestore, "utilisateurs", userId);
    await setDoc(userDocRef, infosUtilisateur);

    return user;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
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
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    throw error;
  }
}

// Fonction pour déconnecter un utilisateur
async function deconnecterUtilisateur() {
  try {
    await auth.signOut();
    console.log("Déconnexion réussie !");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
}

export { creerUtilisateur, connecterUtilisateur, deconnecterUtilisateur };
