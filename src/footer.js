import React from "react";

function Footer() {
    return (
        <footer style={{ textAlign: "center", marginTop: "20px" }}>
            <p>Adresse : 123 Rue Exemple, Paris</p>
            <div>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |{" "}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> |{" "}
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
        </footer>
    );
}

export default Footer;
