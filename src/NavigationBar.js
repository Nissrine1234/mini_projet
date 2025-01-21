import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavigationBar.css";

function NavigationBar() {
  // Récupération de l'utilisateur depuis Redux
  const user = useSelector((state) => state.user);

  // Vérifiez que `user` existe
  if (!user) {
    return null; // Affiche rien si `user` est nul
  }

  const isAdmin = user.admin;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>MonApplication</h2>
      </div>

      <ul className="navbar-links">
        <li><Link to="/home">Accueil</Link></li>
        <li><Link to="/voirprofil">Mon Profil</Link></li>
        {isAdmin && (
          <>
            <li><Link to="/ListeUti">Liste des Utilisateurs</Link></li>
            <li><Link to="/AjouterUti">Ajouter Utilisateur</Link></li>
          </>
        )}
        <li><Link to="/ModifierCouleur">Modifier Couleur</Link></li>
        <li>
          <button
            className="logout-button"
            onClick={() => {
              // Déconnexion
              window.location.href = "/login";
            }}
          >
            Déconnexion
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
