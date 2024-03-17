import { firestore } from "./init";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

// Fonction pour ajouter un commentaire à un post
export const ajouterCommentaire = async (postId, userId, message) => {
  try {
    const commentaire = {
      userId,
      message,
      date: serverTimestamp(), // Ajouter une date au commentaire
    };

    // Ajouter le commentaire à la collection de commentaires du post
    const commentairesCollectionRef = collection(firestore, "posts", postId, "commentaires");
    const commentaireRef = await addDoc(commentairesCollectionRef, commentaire);

    return commentaireRef.id;
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    throw error;
  }
};

// Fonction pour obtenir tous les commentaires d'un post et écouter les modifications en temps réel
export const obtenirCommentaires = (postId, setCommentaires) => {
  try {
    const commentairesCollectionRef = collection(firestore, "posts", postId, "commentaires");
    const querySnapshot = query(commentairesCollectionRef, orderBy("date", "desc")); // Trier les commentaires par date
    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
      const commentaires = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCommentaires(commentaires);
    });

    // Retourner la fonction unsubscribe pour arrêter d'écouter les modifications lorsque le composant est démonté
    return unsubscribe;
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    throw error;
  }
};
