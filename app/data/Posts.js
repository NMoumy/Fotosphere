import { USERS } from "./Users";

export const POSTS = [
  {
    imageUrl: "https://images.pexels.com/photos/20141313/pexels-photo-20141313/free-photo-of-paysage-ete-building-batiment.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    user: USERS[0].user,
    likes: 128,
    description: "Hello Gz.. Good morning 😎dont forgot to follow and comment this post... ",
    photoDeProfil: USERS[0].image,
    date: "2021-03-12",
    commentaires: [
      {
        user: "cafardBleu",
        commentaire: "Superbe photo",
      },
      {
        user: "BaleineVerte",
        commentaire: "Magnifique",
      },
    ],
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/20332518/pexels-photo-20332518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    user: USERS[1].user,
    likes: 100,
    description: "Photo de lumière",
    photoDeProfil: USERS[1].image,
    date: "2021-03-12",
    commentaires: [
      {
        user: "cafardViolet",
        commentaire: "J'aime pas",
      },
      {
        user: "BaleineMoche",
        commentaire: "Magnifique, WOW incroyable!!!!!",
      },
    ],
  },
];
