import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ListeUti.css'

function ListeUtilisateurs() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Erreur API :", error));
    }, []);

    const handledelete = (id) => {
        axios
            .delete(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`)
            .then(() => {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            })
            .catch((error) => console.error("Erreur lors de la suppression :", error));
    };

    return (
        <div className="user-list-container">
            <h2 className="user-list-title">Liste des Utilisateurs</h2>
            <table className="user-list-table">
                <thead className="user-list-thead">
                    <tr>
                        <th className="user-list-th">ID</th>
                        <th className="user-list-th">Nom</th>
                        <th className="user-list-th">Actions</th>
                    </tr>
                </thead>
                <tbody className="user-list-tbody">
                    {users.map((user) => (
                        <tr key={user.id} className="user-list-row">
                            <td className="user-list-td">{user.id}</td>
                            <td className="user-list-td">{user.nom}</td>
                            <td className="user-list-td">
                                <button
                                    className="user-list-btn user-list-btn-edit"
                                    onClick={() => navigate(`/updateUser/${user.id}`)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="user-list-btn user-list-btn-delete"
                                    onClick={() => handledelete(user.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListeUtilisateurs;
