import { updateDoc, arrayUnion, arrayRemove, doc, onSnapshot, getDoc } from "firebase/firestore";
import { auth, firestore } from "./init";

// Fonction pour s'abonner à un autre utilisateur
export const sAbonner = async (userId) => {
    try {
        const idUtilisateur = auth.currentUser.uid;

        // Ajouter l'ID de l'utilisateur à la liste des abonnements de l'utilisateur actuel
        const refDocUtilisateur = doc(firestore, "utilisateurs", idUtilisateur);
        await updateDoc(refDocUtilisateur, {
            abonnements: arrayUnion(userId),
        });

        // Ajouter l'ID de l'utilisateur actuel à la liste des abonnés de l'autre utilisateur
        const refDocAutreUtilisateur = doc(firestore, "utilisateurs", userId);
        await updateDoc(refDocAutreUtilisateur, {
            abonnes: arrayUnion(idUtilisateur),
        });
    } catch (erreur) {
        console.error("Erreur lors de l'abonnement :", erreur);
        throw erreur;
    }
};

// Fonction pour se désabonner d'un autre utilisateur
export const seDesabonner = async (userId) => {
    try {
        const idUtilisateur = auth.currentUser.uid;

        // Supprimer l'ID de l'utilisateur de la liste des abonnements de l'utilisateur actuel
        const refDocUtilisateur = doc(firestore, "utilisateurs", idUtilisateur);
        await updateDoc(refDocUtilisateur, {
            abonnements: arrayRemove(userId),
        });

        // Supprimer l'ID de l'utilisateur actuel de la liste des abonnés de l'autre utilisateur
        const refDocAutreUtilisateur = doc(firestore, "utilisateurs", userId);
        await updateDoc(refDocAutreUtilisateur, {
            abonnes: arrayRemove(idUtilisateur),
        });
    } catch (erreur) {
        console.error("Erreur lors du désabonnement :", erreur);
        throw erreur;
    }
};

// Fonction pour obtenir les abonnements de l'utilisateur actuel
export const obtenirAbonnements = async () => {
    try {
        const idUtilisateur = auth.currentUser.uid;

        // Obtenir le document de l'utilisateur actuel
        const refDocUtilisateur = doc(firestore, "utilisateurs", idUtilisateur);
        const docUtilisateur = await getDoc(refDocUtilisateur);

        // Retourner la liste des abonnements de l'utilisateur actuel
        return docUtilisateur.data().abonnements;
    } catch (erreur) {
        console.error("Erreur lors de l'obtention des abonnements :", erreur);
        throw erreur;
    }
};