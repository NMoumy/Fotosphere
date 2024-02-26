import { USERS } from "./Users";

export const POSTS = [
  {
    imageUrl: "https://www.w3schools.com/w3images/lights.jpg",
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
      "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg",
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
