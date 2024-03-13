import { auth, firestore } from "./init";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { uploadImage } from "./fonctionData";

// Fonction pour créer un nouveau post
export const creerPost = async (userId, image, description) => {
  try {
    // Utiliser la fonction uploadImage pour télécharger l'image
    const imageUrl = await uploadImage(userId, image);

    const post = {
      imageUrl,
      likes: [],
      description,
      date: serverTimestamp(),
      userId, // Stocker l'ID de l'utilisateur au lieu du pseudo et de la photo de profil
    };

    // Ajouter le post à la collection globale de posts
    const postRef = await addDoc(collection(firestore, "posts"), post);

    return postRef.id;
  } catch (error) {
    console.error("Erreur lors de la création du post :", error);
    throw error;
  }
};

// Fonction pour obtenir tous les posts
export const obtenirTousLesPosts = (rappelPost, rappelUtilisateur) => {
  const requetePosts = query(collection(firestore, "posts"), orderBy("date", "desc"));
  const desabonnementsUtilisateurs = [];

  const desabonner = onSnapshot(requetePosts, async (instantane) => {
    const tousLesPosts = [];
    for (let docSnapshot of instantane.docs) {
      const post = { id: docSnapshot.id, ...docSnapshot.data() };
      const userRef = doc(firestore, "utilisateurs", post.userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const utilisateur = userDoc.data();
        tousLesPosts.push({ ...post, utilisateur });
      }
    }

    rappelPost(tousLesPosts);

    // Ajouter un écouteur pour les modifications de chaque utilisateur
    tousLesPosts.forEach((post) => {
      const userRef = doc(firestore, "utilisateurs", post.userId);
      const desabonnementUtilisateur = onSnapshot(userRef, (userDoc) => {
        if (userDoc.exists()) {
          const utilisateurMisAJour = userDoc.data();
          rappelUtilisateur(post.id, utilisateurMisAJour);
        }
      });

      desabonnementsUtilisateurs.push(desabonnementUtilisateur);
    });
  });

  // Retourner une fonction pour se désabonner de tous les écouteurs
  return () => {
    desabonner();
    desabonnementsUtilisateurs.forEach((desabonnement) => desabonnement());
  };
};

// Fonction pour obtenir les posts de l'utilisateur connecté
export const obtenirPostsUtilisateurConnecte = (callback) => {
  const userId = auth.currentUser.uid;

  // Obtenir les posts de l'utilisateur connecté, ordonnés par date
  const userPostsQuery = query(collection(firestore, "posts"), where("userId", "==", userId), orderBy("date", "desc"));

  return onSnapshot(userPostsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    callback(posts);
  });
};

// Fonction pour obtenir les posts d'un utilisateur spécifique
export const obtenirPostsParUserId = (userId, callback) => {
  // Obtenir les posts de l'utilisateur spécifié, ordonnés par date
  const userPostsQuery = query(collection(firestore, "posts"), where("userId", "==", userId), orderBy("date", "desc"));

  return onSnapshot(userPostsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    callback(posts);
  });
};