import { firestore } from "./init";
import { updateDoc, arrayUnion, arrayRemove, onSnapshot, doc, getDoc } from "firebase/firestore";

// Fonction pour basculer les likes
export const basculerLike = async (postId, userId) => {
    const postRef = doc(firestore, "posts", postId);

    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) {
        throw new Error("Le post n'existe pas");
    }

    const post = postDoc.data();
    if (post.likes.includes(userId)) {
        // Si l'utilisateur a déjà aimé le post, supprimer son ID de la liste des likes
        await updateDoc(postRef, {
            likes: arrayRemove(userId),
        });
    } else {
        // Sinon, ajouter son ID à la liste des likes
        await updateDoc(postRef, {
            likes: arrayUnion(userId),
        });
    }
};

// Fonction pour obtenir les likes d'un post
export const obtenirLikes = (postId, callback) => {
    const postRef = doc(firestore, "posts", postId);

    const unsubscribe = onSnapshot(postRef, (postDoc) => {
        if (postDoc.exists()) {
            const post = postDoc.data();
            callback(post.likes);
        } else {
            console.log("Le post n'existe pas");
            callback([]);
        }
    });

    // Retourner la fonction de désinscription pour pouvoir arrêter l'écoute
    return unsubscribe;
};