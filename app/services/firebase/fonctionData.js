import { firestore, storage } from "./init";
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
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString, getStorage, uploadBytes } from "firebase/storage";

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
      date: new Date().toISOString(),
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

// // Fonction pour mettre à jour le profil d'un utilisateur
// export const mettreAJourProfilUtilisateur = async (email, pseudo, bio, photoProfil, photoCouverture) => {
//   try {
//     const userRef = doc(firestore, "utilisateurs", email);

//     await setDoc(
//       userRef,
//       {
//         pseudo: pseudo,
//         bio: bio,
//         photoProfil: photoProfil,
//         photoCouverture: photoCouverture,
//       },
//       { merge: true }
//     );

//     console.log("Profil utilisateur mis à jour avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour du profil de l'utilisateur :", error);
//     throw error;
//   }
// };

// // Fonction pour ajouter un post pour un utilisateur
// export const ajouterPostUtilisateur = async (email, imageUrl, description) => {
//   try {
//     const userRef = doc(firestore, "utilisateurs", email);
//     const postRef = collection(userRef, "posts");

//     await addDoc(postRef, {
//       imageUrl: imageUrl,
//       description: description,
//       date: new Date().toISOString(),
//       likes: [],
//       commentaires: [],
//     });

//     console.log("Post ajouté avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'ajout du post :", error);
//     throw error;
//   }
// };

// // Fonction pour ajouter un commentaire à un post
// export const ajouterCommentaire = async (email, postId, commentaire) => {
//   try {
//     const userRef = doc(firestore, "utilisateurs", email);
//     const postRef = doc(userRef, "posts", postId);
//     const commentairesRef = collection(postRef, "commentaires");

//     await addDoc(commentairesRef, {
//       utilisateur: email,
//       contenu: commentaire,
//       date: new Date().toISOString(),
//     });

//     console.log("Commentaire ajouté avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'ajout du commentaire :", error);
//     throw error;
//   }
// };

// // Fonction pour ajouter un like à un post
// export const ajouterLike = async (email, postId) => {
//   try {
//     const userRef = doc(firestore, "utilisateurs", email);
//     const postRef = doc(userRef, "posts", postId);

//     await setDoc(
//       postRef,
//       {
//         likes: firestore.FieldValue.arrayUnion(email),
//       },
//       { merge: true }
//     );

//     console.log("Like ajouté avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'ajout du like :", error);
//     throw error;
//   }
// };

// // Fonction pour ajouter un abonnement à un utilisateur
// export const ajouterAbonnement = async (email, abonnementEmail) => {
//   try {
//     const userRef = doc(firestore, "utilisateurs", email);

//     await setDoc(
//       userRef,
//       {
//         abonnements: firestore.FieldValue.arrayUnion(abonnementEmail),
//       },
//       { merge: true }
//     );

//     console.log("Abonnement ajouté avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de l'ajout de l'abonnement :", error);
//     throw error;
//   }
// };

// // Fonction pour supprimer un abonnement à un utilisateur
// export const supprimerAbonnement = async (email, abonnementEmail) => {
//   try {
//     const userRef = doc(firestore, "utilisateurs", email);

//     await setDoc(
//       userRef,
//       {
//         abonnements: firestore.FieldValue.arrayRemove(abonnementEmail),
//       },
//       { merge: true }
//     );

//     console.log("Abonnement supprimé avec succès !");
//   } catch (error) {
//     console.error("Erreur lors de la suppression de l'abonnement :", error);
//     throw error;
//   }
// };

// // Fonction pour obtenir tous les posts d'un utilisateur
// export const obtenirPostsUtilisateur = async (email) => {
//   try {
//     const userRef = doc(firestore, "utilisateurs", email);
//     const postsRef = collection(userRef, "posts");
//     const snapshot = await getDocs(postsRef);
//     const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     return posts;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des posts de l'utilisateur :", error);
//     throw error;
//   }
// };

// // Fonction pour obtenir tous les commentaires d'un post
// export const obtenirCommentairesPost = async (email, postId) => {
//   try {
//     const userRef = doc(firestore, "utilisateurs", email);
//     const postRef = doc(userRef, "posts", postId);
//     const commentairesRef = collection(postRef, "commentaires");
//     const snapshot = await getDocs(commentairesRef);
//     const commentaires = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     return commentaires;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des commentaires du post :", error);
//     throw error;
//   }
// };
