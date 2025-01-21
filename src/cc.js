import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DataManagement() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const apiUrl = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";

    // Fonction pour récupérer les données
    const fetchData = () => {
        axios
            .get(apiUrl)
            .then((response) => {
                setData(response.data); // Mettre à jour l'état avec les données récupérées
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des données :", err);
                setError("Impossible de récupérer les données.");
            });
    };

    // Fonction pour supprimer un élément
    const deleteData = (id) => {
        axios
            .delete(`${apiUrl}/${id}`)
            .then(() => {
                setData(data.filter((item) => item.id !== id)); // Supprime l'élément de la liste locale
            })
            .catch((err) => {
                console.error("Erreur lors de la suppression :", err);
                setError("Impossible de supprimer cet élément.");
            });
    };

    // Utiliser useEffect pour récupérer les données au chargement du composant
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Gestion des Données</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <strong>{item.pseudo}</strong> - {item.email}
                        <button
                            style={{
                                marginLeft: "10px",
                                padding: "5px 10px",
                                backgroundColor: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                            onClick={() => deleteData(item.id)}
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
