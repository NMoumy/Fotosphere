import { creerUtilisateur } from "./auth";
import { firestore, collectionUtilisateurs, collectionPosts, collectionCommentaires } from "./init";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

const genererUtilisateur = async () => {
  try {
    const pseudo = generateRandomPseudo(); // Générer un pseudo aléatoire
    const email = generateRandomEmail(); // Générer un email aléatoire
    const password = "123321"; // Mot de passe par défaut

    // Créer l'utilisateur dans Firebase Auth
    const user = await creerUtilisateur(email, password);

    // Ajouter les détails de l'utilisateur dans Firestore
    await setDoc(doc(firestore, collectionUtilisateurs, user.uid), {
      pseudo: pseudo,
      email: email,
      bio: generateRandomBio(), // Générer une biographie aléatoire
      photoProfil: generateRandomProfilImage(), // Photo de profil par défaut
      photoCouverture: generateRandomCouvertureImage(), // Photo de couverture par défaut
      abonnements: [], // Pas d'abonnements pour l'instant
      abonnes: [], // Pas d'abonnés pour l'instant
    });

    console.log(`Utilisateur créé avec succès - Pseudo: ${pseudo}, Email: ${email}, Mot de passe: ${password}`);

    // Générer des posts aléatoires
    const nbPosts = Math.floor(Math.random() * 5) + 1; // Nombre aléatoire de posts entre 1 et 5
    for (let i = 0; i < nbPosts; i++) {
      await ajouterPost(user.uid);
    }

    console.log(`Ajout de ${nbPosts} posts pour l'utilisateur`);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
};

// Fonction pour ajouter un post aléatoire pour l'utilisateur
const ajouterPost = async (userId) => {
  const post = {
    imageUrl: generateRandomImageUrl(),
    description: generateRandomDescription(),
    date: new Date().toISOString(),
    likes: [],
  };

  // Ajouter le post à la collection "posts" de l'utilisateur
  await addDoc(collection(firestore, collectionUtilisateurs, userId, collectionPosts), post);

  console.log("Post ajouté :", post);
};

// Fonction pour générer une URL d'image aléatoire
const generateRandomImageUrl = () => {
  // Ici vous pouvez mettre votre logique pour générer des URLs d'image aléatoires
  return "https://via.placeholder.com/300";
};

// Fonction pour générer une description aléatoire pour les posts
const generateRandomDescription = () => {
  const descriptions = [
    "Super photo !",
    "Regardez ça !",
    "Voyage incroyable !",
    "Nouvelle recette à partager !",
    "Couché de soleil magnifique !",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Fonction pour générer une image de profil aléatoire
const generateRandomProfilImage = () => {
  const profilImages = [
    "url_image_profil_1",
    "url_image_profil_2",
    "url_image_profil_3",
    // Ajoutez ici d'autres URLs d'images de profil par défaut
  ];
  return profilImages[Math.floor(Math.random() * profilImages.length)];
};

// Fonction pour générer une image de couverture aléatoire
const generateRandomCouvertureImage = () => {
  const couvertureImages = [
    "url_image_couverture_1",
    "url_image_couverture_2",
    "url_image_couverture_3",
    // Ajoutez ici d'autres URLs d'images de couverture par défaut
  ];
  return couvertureImages[Math.floor(Math.random() * couvertureImages.length)];
};

// Fonction pour générer un pseudo aléatoire (à personnaliser selon vos besoins)
const generateRandomPseudo = () => {
  const adjectifs = ["Cool", "Rapide", "Intelligent", "Drôle", "Super", "Mystérieux"];
  const noms = ["Utilisateur", "Personne", "Profil", "Ami", "Voyageur"];
  const randomAdjectif = adjectifs[Math.floor(Math.random() * adjectifs.length)];
  const randomNom = noms[Math.floor(Math.random() * noms.length)];
  return `${randomAdjectif}${randomNom}`;
};

// Fonction pour générer un email aléatoire (à personnaliser selon vos besoins)
const generateRandomEmail = () => {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${generateRandomString(8)}@${randomDomain}`;
};

// Fonction pour générer une biographie aléatoire (à personnaliser selon vos besoins)
const generateRandomBio = () => {
  const biographies = [
    "Amateur de café. Explorateur de la vie. Expert en procrastination.",
    "Globe-trotter passionné. Amoureux des chats. Fan de jeux vidéo.",
    "Photographe en herbe. Mangeur de pizzas professionnel. Fan de musique indie.",
  ];
  return biographies[Math.floor(Math.random() * biographies.length)];
};

// Fonction pour générer une chaîne de caractères aléatoire
const generateRandomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export { genererUtilisateur };
