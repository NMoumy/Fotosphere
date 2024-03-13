import { getDownloadURL, ref, uploadString, getStorage, uploadBytes } from "firebase/storage";

// Fonction pour televerser une image
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
