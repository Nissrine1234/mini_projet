import React from "react";
import { useSelector } from "react-redux";
import "./voirprofil.css"; // Import du fichier CSS

function VoirMonProfil() {
  const user = useSelector((state) => state.user);

  // Vérifiez si l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <div className="no-user">
        <p>Aucun utilisateur connecté. Veuillez vous connecter.</p>
      </div>
    );
  }

  // Déstructuration des propriétés utilisateur
  const { nom, prenom, couleur } = user;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Mon Profil</h2>
      <p className="profile-info">
        <span className="profile-label">Nom :</span> {nom}
      </p>
      <p className="profile-info">
        <span className="profile-label">Prénom :</span> {prenom}
      </p>
      <p className="profile-info">
        <span className="profile-label">Couleur Préférée :</span>{" "}
        <span
          className="profile-color"
          style={{ color: couleur || "#555555" }}
        >
          {couleur || "Non spécifiée"}
        </span>
      </p>
    </div>
  );
}

export default VoirMonProfil;
