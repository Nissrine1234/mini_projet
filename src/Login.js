import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState([]);
  const [tentative, setTentative] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);

  // Sélectionner l'utilisateur actuel depuis le Redux Store
  const currentUser = useSelector((state) => state.user);

  // Fonction de connexion
  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .get("https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire")
      .then((response) => {
        const users = response.data;

        const foundUser = users.find(
          (user) => user.pseudo === Username && user.MotDePasse === password
        );

        if (foundUser) {
          dispatch({ type: "LOGIN", payload: foundUser });
          navigate("/layout/home");
        } else {
          setMessage(["Nom d'utilisateur ou mot de passe incorrect."]);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage(["Une erreur est survenue. Veuillez réessayer."]);
      });

    const newTentative = tentative + 1;
    setTentative(newTentative);
    if (newTentative > 3) {
      setIsDisabled(true);
    }
  };

  // Synchronisation des données utilisateur
  useEffect(() => {
    if (currentUser) {
      const interval = setInterval(() => {
        axios
          .get(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${currentUser.id}`)
          .then((response) => {
            dispatch({ type: "UPDATE_USER", payload: response.data });
          })
          .catch((error) => {
            console.error("Erreur lors de la synchronisation des données :", error);
          });
      }, 5000); // Synchronisation toutes les 5 secondes

      return () => clearInterval(interval); // Nettoyage de l'intervalle
    }
  }, [currentUser, dispatch]);

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>Username :</label>
        <input
          type="text"
          placeholder="Username"
          value={Username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label>Password :</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isDisabled}>
          Login
        </button>
      </form>
      <div>
        <ul>
          {message.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>

      <span>Not Registered ?</span>
      <nav>
        <Link to="/Signin">create an account</Link>
      </nav>
    </div>
  );
}