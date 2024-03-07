import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./firebaseConfig";

// Initialiser l'application Firebase
const app = initializeApp(firebaseConfig);

// Obtenir une connexion à la base de données Firestore
export const firestore = getFirestore(app);

// Initialiser le service d'authentification Firebase
export const auth = getAuth(app);

// Initialiser le service Storage
export const storage = getStorage(app);

// Noms des collections Firestore utilisées dans l'application
export const collectionUtilisateurs = "utilisateurs";
export const collectionPosts = "posts";
export const collectionCommentaires = "commentaires";

// Noms des champs pour les abonnements
export const champAbonnements = "abonnements";
export const champAbonnes = "abonnes";
