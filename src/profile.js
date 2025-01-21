import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./profile.css";

export default function Header() {
  const dispatch = useDispatch();

  // Récupérez l'utilisateur depuis Redux
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [isLarge, setIsLarge] = useState(false); // État pour agrandir/réduire le profil

  const toggleProfileSize = () => {
    setIsLarge(!isLarge); // Basculer entre grande et petite taille
  };

  // Vérifiez si l'utilisateur est connecté
  if (!user) {
    return <h1>Bonjour, Veuillez vous connecter</h1>;
  }
  const handleLogout = () => {
    // Supprimer les données utilisateur du store
    dispatch({ type: "LOGOUT" });

    // Rediriger vers la page de connexion
    navigate("/Login", { replace: true });
};

  return (
    <header className="user-header">
      {/* Section profil (à gauche) */}
      <div className="user-profile" onClick={toggleProfileSize}>
      {/* // Exemple dans le Header où vous affichez l'avatar */}


        <h1 className="user-info">
          Bonjour {user.prenom} {user.nom}
        </h1>
      </div>

      {/* Bouton déconnexion (à droite) */}
      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Se déconnecter
      </button>
    </header>
  );
}
