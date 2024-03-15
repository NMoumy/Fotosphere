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
  limit,
  getDocs,
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
export const obtenirTousLesPosts = async () => {
  let requetePosts = query(collection(firestore, "posts"), orderBy("date", "desc"));
  const instantane = await getDocs(requetePosts);
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

  return tousLesPosts;
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

// Fonction pour obtenir les posts aimés par l'utilisateur actuel ou un autre utilisateur
export const obtenirPostsAimesParUtilisateur = async (userId) => {
  const requetePostsAimes = query(collection(firestore, "posts"), where("likes", "array-contains", userId), orderBy("date", "desc"));
  const instantane = await getDocs(requetePostsAimes);
  const postsAimes = [];

  for (let docSnapshot of instantane.docs) {
    const post = { id: docSnapshot.id, ...docSnapshot.data() };
    const userRef = doc(firestore, "utilisateurs", post.userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const utilisateur = userDoc.data();
      postsAimes.push({ ...post, utilisateur });
    }
  }

  return postsAimes;
};