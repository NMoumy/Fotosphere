// import { firestore, storage } from "./init";
import { getDownloadURL, ref, uploadString, getStorage, uploadBytes } from "firebase/storage";
import { auth, firestore } from "./init";
import {
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Firestore,
  where,
} from "firebase/firestore";

// Fonction pour créer un nouveau post
export const creerPost = async (userId, image, description) => {
  try {
    const firestore = getFirestore();

    // Récupérer les informations de l'utilisateur
    const userDocRef = doc(firestore, "utilisateurs", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const { pseudo, photoProfil } = userDocSnapshot.data();

    // Utiliser la fonction uploadImage pour télécharger l'image
    const imageUrl = await uploadImage(userId, image);

    const post = {
      imageUrl,
      likes: [],
      description,
      date: serverTimestamp(),
      pseudo,
      photoProfil,
    };

    // Ajouter le post à la collection globale de posts
    const postRef = await addDoc(collection(firestore, "posts"), post);

    // Ajouter le post à la collection de posts de l'utilisateur
    await setDoc(doc(firestore, "utilisateurs", userId, "posts", postRef.id), post);

    // Créer une collection "commentaires" vide pour le nouveau post
    const commentairesCollectionRef = collection(postRef, "commentaires");
    await setDoc(doc(commentairesCollectionRef), {});

    return postRef.id;
  } catch (error) {
    console.error("Erreur lors de la création du post :", error);
    throw error;
  }
};

// Fonction pour obtenir tous les posts de tous les utilisateurs
export const obtenirTousLesPosts = (rappel) => {
  const firestore = getFirestore();
  const requetePosts = query(collection(firestore, "posts"), orderBy("date", "desc"));

  const desabonner = onSnapshot(requetePosts, (instantane) => {
    const tousLesPosts = instantane.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    rappel(tousLesPosts);
  });

  // Assurez-vous que desabonner est une fonction
  if (typeof desabonner !== "function") {
    throw new Error("desabonner doit être une fonction");
  }

  return desabonner;
};

export const uploadImage = async (userId, image) => {
  try {
    // Télécharger l'image dans le stockage Firebase
    const storage = getStorage();
    const imageRef = ref(storage, `images/${userId}/${Date.now()}`);

    // Convertir l'image en Blob
    const response = await fetch(image);
    const blob = await response.blob();

    // Télécharger le Blob
    await uploadBytes(imageRef, blob);

    // Obtenir l'URL de l'image téléchargée
    const imageUrl = await getDownloadURL(imageRef);

    return imageUrl;
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image :", error);
    throw error;
  }
};

export const getInfosUtilisateur = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Aucun utilisateur connecté");

    const userRef = doc(firestore, "utilisateurs", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("Aucun document correspondant à l'utilisateur trouvé");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
    throw error;
  }
};

// export const getNombrePublications = async () => {
//   try {
//     const user = auth.currentUser;
//     if (!user) throw new Error("Aucun utilisateur connecté");

//     const q = query(collection(firestore, "publications"), where("userId", "==", user.uid));
//     const querySnapshot = await getDocs(q);

//     return querySnapshot.size;
//   } catch (error) {
//     console.error("Erreur lors de la récupération du nombre de publications :", error);
//     throw error;
//   }
// };