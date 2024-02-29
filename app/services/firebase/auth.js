import { auth } from "./init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Fonction pour créer un nouvel utilisateur avec email et mot de passe
async function creerUtilisateur(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
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
