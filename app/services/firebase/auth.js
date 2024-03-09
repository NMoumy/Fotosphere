import { auth, firestore } from "./init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

// Fonction pour récupérer les informations de l'utilisateur à partir de Firestore
// async function getInfosUtilisateur(userId) {
//   try {
//     const userDocRef = doc(firestore, "utilisateurs", userId);
//     const docSnap = await getDoc(userDocRef);

//     if (docSnap.exists()) {
//       return docSnap.data();
//     } else {
//       console.log("No such document!");
//       return null;
//     }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
//     throw error;
//   }
// }

export { creerUtilisateur, connecterUtilisateur, deconnecterUtilisateur };
