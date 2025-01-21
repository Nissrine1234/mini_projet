import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ModifierCouleur.css';

const ChangeColor = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user || {}); // Récupération de l'utilisateur depuis Redux

  const [newColor, setNewColor] = useState(user?.couleur || ''); // Couleur sélectionnée
  const [message, setMessage] = useState(''); // Message d'information ou d'erreur
  const [messageType, setMessageType] = useState(''); // Type de message (success, error)

  // Gérer les restrictions liées à l'utilisateur
  useEffect(() => {
    if (user) {
      if (user?.age < 15 && !user?.admin) {
        setMessage("Vous devez être administrateur ou avoir plus de 15 ans pour changer votre couleur.");
        setMessageType('error');
      } else {
        setMessage('');
        setMessageType('');
      }
    }
  }, [user]);

  // Appliquer la nouvelle couleur de fond à la page
  useEffect(() => {
    if (newColor) {
      document.body.style.backgroundColor = newColor;
    }
  }, [newColor]);

  const handleChangeColor = async () => {
    // Vérification des autorisations utilisateur
    if (!user || (user?.age < 15 && !user?.admin)) {
      setMessage("Vous n'êtes pas autorisé à changer la couleur.");
      setMessageType('error');
      return;
    }

    try {
      if (!user?.id) {
        throw new Error('Utilisateur non identifié');
      }

      // Mise à jour dans le store Redux
      dispatch({ type: "CHANGE_COLOR", payload: newColor });

      // Message de succès
      setMessage('Couleur mise à jour avec succès!');
      setMessageType('success');
    } catch (error) {
      console.error('Error while updating color:', error);

      if (error.response && error.response.status === 401) {
        setMessage('Votre session a expiré. Veuillez vous reconnecter.');
      } else {
        setMessage('Erreur lors de la mise à jour de la couleur.');
      }
      setMessageType('error');
    }
  };

  // Si l'utilisateur n'est pas autorisé, afficher un message d'erreur
  if (!user || (user?.age < 15 && !user?.admin)) {
    return <div className="message error">{message}</div>;
  }

  return (
<div id="changeColor-container">
  <h2 className="changeColor-title">Modifier la couleur de votre profil</h2>
  <p className="current-color">
    Couleur actuelle :{' '}
    <span
      style={{ color: user?.couleur, fontWeight: 'bold', fontSize: '18px' }}
    >
      {user?.couleur}
    </span>
  </p>

  <div className="color-selection">
    <label className="color-label" htmlFor="colorSelect">
      Choisissez une nouvelle couleur :
    </label>
    <select
      className="color-select"
      id="colorSelect"
      value={newColor}
      onChange={(e) => setNewColor(e.target.value)}
    >
      <option value="#ffffff">Blanc</option>
      <option value="#ff0000">Rouge</option>
      <option value="#00ff00">Vert</option>
      <option value="#0000ff">Bleu</option>
      <option value="#ffff00">Jaune</option>
      <option value="#ff00ff">Magenta</option>
      <option value="#00ffff">Cyan</option>
      <option value="#ff7f50">Corail</option>
      <option value="#2e8b57">Vert forêt</option>
      <option value="#d2691e">Chocolat</option>
      <option value="#cd5c5c">Rouge indien</option>
      <option value="#00008b">Bleu marin</option>
      <option value="#8a2be2">Bleu violet</option>
      <option value="#a52a2a">Marron</option>
      <option value="#800080">Violet</option>
      <option value="#f0e68c">Jaune pâle</option>
      <option value="#8b4513">Brun</option>
      <option value="#2f4f4f">Gris ardoise foncé</option>
      <option value="#708090">Gris ardoise</option>
      <option value="#a9a9a9">Gris foncé</option>
    </select>
  </div>

  <button className="validate-button" onClick={handleChangeColor}>
    Valider
  </button>

  {message && (
    <p className={`message ${messageType}`}>
      {message}
    </p>
  )}
</div>

  );
};

export default ChangeColor;
