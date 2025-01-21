import React, { useState } from 'react';
import axios from "axios";
import './AjouterUti.css';


export default function AjouterUtilisateur() {
    const [message , setMessage] = useState ([]);


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
        photoUrl: "",});
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleTypeChange = (e) => {
        setData({ ...data, type: e.target.value === "admin" }); // Si "admin", type = true, sinon false
    };

    const handleSubmit =(e) => {
        e.preventDefault();
         
        const newMessages = [];

            if(data.password.length < 8)  {newMessages.push("Le mot de passe doit contenir au moins 8 caractères.");}
            if (!/[A-Z]/.test(data.password))  {newMessages.push("Le mot de passe doit contenir au moins une lettre majuscule.");}
            if(!/[a-z]/.test(data.password))  {newMessages.push("Le mot de passe doit contenir au moins une lettre minuscule.");}
            if(!/[0-9]/.test(data.password))  {newMessages.push("Le mot de passe doit contenir au moins un chiffre.");}
            if(!/[!@#$%^&*(),.?":{}|<>]/.test(data.password))  {newMessages.push("Le mot de passe doit contenir au moins un caractère spécial.");}
            if (data.password !== data.confpassword) {newMessages.push("Les mots de passe ne correspondent pas.");}
    

            if (newMessages.length > 0) {
                setMessage(newMessages);
            }else {
                axios.post("https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire",{
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
                    photo: data.photoUrl
                })
                .then(response => {
                    alert(`Le compte ${response.data.pseudo }a créé avec succès`)
                 })
                .catch(error => console.log(error));

            }



    };



    return (
        <div className="ajouter-utilisateur-container">
    <h2 className="form-title">Ajouter Utilisateur</h2>
    <form className="user-form" onSubmit={handleSubmit}>
        <label className="form-label">Nom:</label>
        <input
            className="form-input"
            type="text"
            name="nom"
            value={data.nom}
            onChange={handleChange}
            required
        />
        <label className="form-label">Prénom:</label>
        <input
            className="form-input"
            type="text"
            name="prenom"
            value={data.prenom}
            onChange={handleChange}
            required
        />
        <label className="form-label">Age:</label>
        <input
            className="form-input"
            type="number"
            name="age"
            value={data.age}
            onChange={handleChange}
            required
        />
        <div className="radio-group">
            <label className="form-label">Type:</label>
            <span>Visiteur</span>
            <input
                className="form-radio"
                type="radio"
                name="type"
                value="visiteur"
                checked={!data.type}
                onChange={handleTypeChange}
                required
            />
            <span>Admin</span>
            <input
                className="form-radio"
                type="radio"
                name="type"
                value="admin"
                checked={data.type}
                onChange={handleTypeChange}
                required
            />
        </div>
        <label className="form-label">Mot de passe:</label>
        <input
            className="form-input"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
        />
        <label className="form-label">Confirmer mot de passe:</label>
        <input
            className="form-input"
            type="password"
            name="confpassword"
            value={data.confpassword}
            onChange={handleChange}
            required
        />
        <div className="error-messages">
            <ul>
                {message.map((msg, index) => (
                    <li className="error-message" key={index}>
                        {msg}
                    </li>
                ))}
            </ul>
        </div>
        <label className="form-label">Pseudo:</label>
        <input
            className="form-input"
            type="text"
            name="pseudo"
            value={data.pseudo}
            onChange={handleChange}
        />
        <label className="form-label">Couleur:</label>
        <select
            className="form-select"
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
        <label className="form-label">Devise:</label>
        <input
            className="form-input"
            type="text"
            name="devise"
            value={data.devise}
            onChange={handleChange}
        />
        <label className="form-label">Pays:</label>
        <input
            className="form-input"
            type="text"
            name="pays"
            value={data.pays}
            onChange={handleChange}
        />
        <label className="form-label">Avatar URL:</label>
        <input
            className="form-input"
            type="url"
            name="avatarUrl"
            value={data.avatarUrl}
            onChange={handleChange}
        />
        <label className="form-label">Email:</label>
        <input
            className="form-input"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
        />
        <label className="form-label">Photo URL:</label>
        <input
            className="form-input"
            type="text"
            name="photoUrl"
            value={data.photoUrl}
            onChange={handleChange}
        />
        <button className="form-button" type="submit">
            Ajouter
        </button>
    </form>
</div>

    );
}

