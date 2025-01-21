import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';





export default function Register() {


    const navigate = useNavigate();
    const [message , setMessage] = useState ([]);
    // const [password,setPassword] = useState ("");
    // const [nom,setNom] = useState ("");
    // const [age,setAge] = useState ("");
    // const [type,setType] = useState ("");
    // const [confpassword,setConfPassword] = useState ("");
    // const [pseudo,setPseudo] = useState ("");
    // const [prenom,setPrenom] = useState ("");
    // const [couleur,setCouleur] = useState ("");
    // const [devise,setDevise] = useState ("");
    // const [pays,setPays] = useState ("");
    // const [avatarUrl,setAvatar] = useState ("");
    // const [photoUrl,setPhoto] = useState ("");
    // const [email,setEmail] = useState ("");
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
                    navigate('/Login/')})
                .catch(error => console.log(error));

            }

            
            
        
        


    };


        return (
            <div className ={"register-container"}>
                <h1>Créer un compte</h1>
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
                        onChange={handleChange} required/>
                    <label>Age:</label>
                    <input type="number" name="age" value={data.age} onChange={handleChange} required/>
                    <div className={"radio-group"}>
                    <label>Type:</label>
                    <span>Visiteur</span> <input type="radio" name="type" value="visiteur"  checked={!data.type} onChange={handleTypeChange} required/>
                    <span>Admin</span> <input type="radio" name="type" value="admin" checked={data.type} onChange={handleTypeChange} required/> 
                    </div>

                    <label>Mot de passe:</label>
                    <input type="password" name="password" value={data.password} onChange={handleChange} required/>
                    <label>Confirmer mot de passe:</label>
                    <input type="password" name="confpassword" value={data.confpassword} onChange={handleChange} required/>
                    <div>
                    <ul>
                        {message.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                    </div>
                    <label>Pseudo:</label>
                    <input type="text" name="pseudo" value={data.pseudo} onChange={handleChange}
                    />

                    <label>Couleur:</label>
                    <select name="couleur" value={data.couleur} onChange={handleChange}required>    
                            <option value=""></option>     
                            <option value="red">Rouge</option>     
                            <option value="blue">Bleu</option>     
                            <option value="green">Vert</option>     
                            <option value="yellow">Jaune</option>     
                            <option value="orange">Orange</option>     
                            <option value="purple">Violet</option>     
                            <option value="pink">Rose</option>     
                            <option value="brown">Marron</option>
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
                    <button type="submit">Create Account</button>
                </form>

            </div>
        );
}