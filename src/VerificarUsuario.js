import { useState, useEffect } from "react";
import { auth } from "./firebase"; // Importa la instancia de Firebase correctamente
import { onAuthStateChanged } from "firebase/auth";

const VerificarUsuario = ({ onUserVerified }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user?.displayName === "Ale") {
                setUser(user);
                onUserVerified(true);
            } else {
                onUserVerified(false);
            }
        });

        return () => unsubscribe(); // Limpia el listener al desmontar el componente
    }, []);

    return user ? <p>Bienvenido, {user.displayName}</p> : <p>No tienes acceso</p>;
};

export default VerificarUsuario;
