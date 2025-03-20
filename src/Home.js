import { useState } from "react";
import GuardarProducto from "./GuardarProducto";
import MostrarProductos from "./MostrarProductos";


function Home() {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [isAle, setIsAle] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (usuario === "Ale" && contrasena === "ñandu1234") {
            setIsAle(true);
            setError(""); // Limpiar errores si la autenticación es correcta
        } else {
            setIsAle(false);
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="displayFlex">
            {!isAle ? (
                <div className="vertical">
                    <h3>Iniciar sesión</h3>
                    <input className="inputLog"
                        type="text"
                        placeholder="Nombre de usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input className="inputLog"
                        type="password"
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                    <button className="login" onClick={handleLogin}>Entrar</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            ) : (
                <div>
                    <h2>Bienvenido, {usuario}</h2>
                    <GuardarProducto />
                </div>
            )}

            {/* Contenido público visible para todos */}
            <div>
           
                <MostrarProductos/>
            </div>
        </div>
    );
}

export default Home;
