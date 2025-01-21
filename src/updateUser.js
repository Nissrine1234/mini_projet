import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams(); // Récupère l'ID de l'utilisateur à modifier depuis l'URL
  const [data, setData] = useState({
    nom: "",
    age: "",
    type: true,
    password: "",
    confpassword: "",
    pseudo: "",
    prenom: "",
    couleur: "",
    devise: "",
    pays: "",
    avatarUrl: "",
    email: "",
    photoUrl: "",
  });

  // Charger les données de l'utilisateur à modifier
  useEffect(() => {
    axios
      .get(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${userId}`)
      .then((response) => {
        setData(response.data); // Initialise le formulaire avec les données récupérées
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleTypeChange = (e) => {
    setData({ ...data, type: e.target.value === "admin" }); // Si "admin", type = true, sinon false
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      axios
        .put(
          `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${userId}`,
          {
            nom: data.nom,
            prenom: data.prenom,
            age: data.age,
            type: data.type,
            MotDePasse: data.password,
            pseudo: data.pseudo,
            couleur: data.couleur,
            Devise: data.devise,
            Pays: data.pays,
            avatar: data.avatarUrl,
            email: data.email,
            photo: data.photoUrl,
          }
        )
        .then((response) => {
          alert(`Le compte ${response.data.pseudo} a été mis à jour avec succès`);
          navigate("/ListeUti/");
        })
        .catch((error) => console.log(error));
    }


  return (
    <div className={"register-container"}>
      <h1>Modifier un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <label>Nom:</label>
        <input
          type="text"
          name="nom"
          value={data.nom}
          onChange={handleChange}
          required
        />
        <label>Prénom:</label>
        <input
          type="text"
          name="prenom"
          value={data.prenom}
          onChange={handleChange}
          required
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={handleChange}
          required
        />
        <div className={"radio-group"}>
          <label>Type:</label>
          <span>Visiteur</span>{" "}
          <input
            type="radio"
            name="type"
            value="visiteur"
            checked={!data.type}
            onChange={handleTypeChange}
            required
          />
          <span>Admin</span>{" "}
          <input
            type="radio"
            name="type"
            value="admin"
            checked={data.type}
            onChange={handleTypeChange}
            required
          />
        </div>

        <label>Pseudo:</label>
        <input
          type="text"
          name="pseudo"
          value={data.pseudo}
          onChange={handleChange}
        />

        <label>Couleur:</label>
        <select
          name="couleur"
          value={data.couleur}
          onChange={handleChange}
          required
        >
          <option value=""></option>
          <option value="red">Rouge</option>
          <option value="blue">Bleu</option>
          <option value="green">Vert</option>
          <option value="yellow">Jaune</option>
          <option value="orange">Orange</option>
          <option value="purple">Violet</option>
          <option value="pink">Rose</option>
          <option value="brown">Marron</option>
          <option value="black">Noir</option>
          <option value="white">Blanc</option>
          <option value="gray">Gris</option>
        </select>
        <label>Devise:</label>
        <input
          type="text"
          name="devise"
          value={data.devise}
          onChange={handleChange}
        />
        <label>Pays:</label>
        <input
          type="text"
          name="pays"
          value={data.pays}
          onChange={handleChange}
        />
        <label>Avatar URL:</label>
        <input
          type="url"
          name="avatarUrl"
          value={data.avatarUrl}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <label>Photo URL:</label>
        <input
          type="text"
          name="photoUrl"
          value={data.photoUrl}
          onChange={handleChange}
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  )
}

