// import { getDownloadURL, ref, uploadString, getStorage, uploadBytes } from "firebase/storage";
import { uploadImage } from "./fonctionData";
import { auth, firestore } from "./init";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

// Fonction pour obtenir les informations de l'utilisateur actuellement connecté
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

// Fonction pour modifier le profil de l'utilisateur
export const modifierProfil = async ({ pseudo, bio, photoProfil, photoCouverture }) => {
  try {
    const idUtilisateur = auth.currentUser.uid;

    // Télécharger les nouvelles images si elles sont fournies
    let nouvelleUrlPhotoProfil, nouvelleUrlPhotoCouverture;
    if (photoProfil) {
      nouvelleUrlPhotoProfil = await uploadImage(idUtilisateur, photoProfil);
    }
    if (photoCouverture) {
      nouvelleUrlPhotoCouverture = await uploadImage(idUtilisateur, photoCouverture);
    }

    // Créer l'objet de mise à jour
    const miseAJour = {
      ...(pseudo && { pseudo }),
      ...(bio && { bio }),
      ...(nouvelleUrlPhotoProfil && { photoProfil: nouvelleUrlPhotoProfil }),
      ...(nouvelleUrlPhotoCouverture && { photoCouverture: nouvelleUrlPhotoCouverture }),
    };

    // Si l'objet miseAJour est vide, ne rien faire
    if (Object.keys(miseAJour).length === 0) {
      return;
    }

    // Mettre à jour le document de l'utilisateur
    const refDocUtilisateur = doc(firestore, "utilisateurs", idUtilisateur);
    await setDoc(refDocUtilisateur, miseAJour, { merge: true });

    return miseAJour;
  } catch (erreur) {
    console.error("Erreur lors de la modification du profil :", erreur);
    throw erreur;
  }
};

export async function obtenirDataAutreUser(userId) {
  const userRef = doc(firestore, "utilisateurs", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No user!");
    return null;
  }
}
/** En temps reel */
// export function obtenirDataAutreUser(userId, callback) {
//   const userRef = doc(firestore, "utilisateurs", userId);

//   const unsubscribe = onSnapshot(userRef, (userSnap) => {
//     if (userSnap.exists()) {
//       callback(userSnap.data());
//     } else {
//       console.log("No user!");
//       callback(null);
//     }
//   });

//   // Retourner la fonction de désinscription pour pouvoir arrêter l'écoute
//   return unsubscribe;
// }
