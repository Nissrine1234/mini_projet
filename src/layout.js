import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./layout.css";
import Header from "./profile";

function Layout() {
  const user = useSelector((state) => state.user);
  const backgroundColor = useSelector((state) => state.user.couleur || "#ffffff");
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);
  console.log('Background color from Redux:', backgroundColor);  // Vérifier la couleur

  const layoutStyle = {
    backgroundColor: backgroundColor,  // Appliquer la couleur au style
  };
  
  return (
    <div className="layout" style={layoutStyle}>
      {/* Header */}
      <header className="header">
        <Header />
      </header>

      {/* Barre de navigation horizontale */}
      <nav className="top-nav">
        <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
          Accueil
        </NavLink>
        <NavLink to="/voirprofil" className={({ isActive }) => (isActive ? "active" : "")}>
          Mon Profil
        </NavLink>
        <NavLink to="/ModifierCouleur" className={({ isActive }) => (isActive ? "active" : "")}>
          Modifier Couleur
        </NavLink>
        {user.admin && (
                <>
                
                    <NavLink to="/ListeUti" className={({ isActive }) => (isActive ? "active" : "")}>
                      Liste Utilisateurs
                    </NavLink>

                    <NavLink to="/AjouterUti" className={({ isActive }) => (isActive ? "active" : "")}>
                      Ajouter Utilisateur
                    </NavLink>
            
                </>
              )}

      </nav>

      {/* Contenu principal */}
      <div className="main-layout">
        {/* Barre de navigation verticale */}
        <nav className="side-nav">
          <ul>
            <li>
              <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/voirprofil" className={({ isActive }) => (isActive ? "active" : "")}>
                Mon Profil
              </NavLink>
            </li>
            <li>
              <NavLink to="/ModifierCouleur" className={({ isActive }) => (isActive ? "active" : "")}>
                Modifier Couleur
              </NavLink>
              </li>
              {user.admin &&(
                <>
                
            <li>
              <NavLink to="/ListeUti" className={({ isActive }) => (isActive ? "active" : "")}>
                Liste Utilisateurs
              </NavLink>
            </li>
            <li>
              <NavLink to="/AjouterUti" className={({ isActive }) => (isActive ? "active" : "")}>
                Ajouter Utilisateur
              </NavLink>
            </li>
                </>
              )}
          </ul>
        </nav>

        {/* Section centrale */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
