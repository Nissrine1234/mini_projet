import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import userReducer from "./Reducer";
import Login from "./Login";
import Register from "./Signin";
import Layout from "./layout";
import Home from "./home";
import VoirMonProfil from "./voirprofil";
import UpdateUser from "./updateUser";
// import ModifierCouleur from "./ModifierCouleur";
import ListeUtilisateurs from "./ListeUti";
import AjouterUtilisateur from "./AjouterUti";
import ChangeColor from "./ModifierCouleur";
// Création du store Redux
const store = legacy_createStore(userReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Routes principales */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Register />} />
        <Route path="/updateUser/:userId" element={<UpdateUser />} />


        {/* Routes avec Layout */}
        <Route path="/layout" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="voirprofil" element={<VoirMonProfil />} />
          <Route path="ModifierCouleur" element={<ChangeColor />} />
          <Route path="ListeUti" element={<ListeUtilisateurs />} />
          <Route path="AjouterUti" element={<AjouterUtilisateur />} />

        </Route>
        {/* Redirections */}
        <Route
          path="/voirprofil"
          element={<Navigate to="/layout/voirprofil" replace />}
        />
        <Route
          path="/ModifierCouleur"
          element={<Navigate to="/layout/ModifierCouleur" replace />}
        />
        <Route
          path="/ListeUti"
          element={<Navigate to="/layout/ListeUti" replace />}
        />
        <Route
          path="/AjouterUti"
          element={<Navigate to="/layout/AjouterUti" replace />}
        />
        <Route
          path="/home"
          element={<Navigate to="/layout/home" replace />}
        />
        {/* Page non trouvée */}
        {/* <Route path="*" element={<h1>404 - Page non trouvée</h1>} /> */}
      </Routes>
    </BrowserRouter>
  </Provider>
);
