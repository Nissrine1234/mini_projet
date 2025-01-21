
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHANGE_COLOR = "CHANGE_COLOR";
export const UPDATE_USER = "UPDATE_USER";

const initialState = {
  user: {
    id: localStorage.getItem("id") || null,
    prenom: localStorage.getItem("prenom") || "",
    nom: localStorage.getItem("nom") || "",
    avatar: localStorage.getItem("avatar") || "",
    photo: localStorage.getItem("photo") || "",
    couleur: localStorage.getItem("couleur") || "#ffffff", // Valeur par défaut
    age: localStorage.getItem("age") || null,
    admin: localStorage.getItem("admin") === "true", // Convertir en booléen
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      // Sauvegarder les données utilisateur individuellement
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("prenom", action.payload.prenom);
      localStorage.setItem("nom", action.payload.nom);
      localStorage.setItem("avatar", action.payload.avatar);
      localStorage.setItem("couleur", action.payload.couleur);
      localStorage.setItem("age", action.payload.age);
      localStorage.setItem("admin", action.payload.admin);
      localStorage.setItem("photo", action.payload.photo);

      return { ...state, user: action.payload };

    case "LOGOUT":
      // Supprimer toutes les données utilisateur de `localStorage`
      localStorage.removeItem("id");
      localStorage.removeItem("prenom");
      localStorage.removeItem("nom");
      localStorage.removeItem("avatar");
      localStorage.removeItem("photo");
      localStorage.removeItem("couleur");
      localStorage.removeItem("age");
      localStorage.removeItem("admin");

      return initialState;

      case "CHANGE_COLOR":
        return {
          ...state,
          user: { ...state.user, couleur: action.payload },
        };
        case "UPDATE_USER":
          return {
            ...state,
            user: { ...state.user, ...action.payload },
          };
      default:
        return state;
    case "ERROR":
      return { ...state, error: action.payload }; // Ajoute un message d'erreur
      
  }
};

export default userReducer;
