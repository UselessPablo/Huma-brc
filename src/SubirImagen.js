import { useState } from "react";

const SubirImagen = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);  // Estado de carga
    const [url, setUrl] = useState("");

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);  // Activar la carga

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);  // Uso del preset configurado

        try {
            // Realizar la solicitud POST a Cloudinary
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.url) {
                setUrl(data.url);
                onUpload(data.url);  // Pasar la URL de la imagen al componente padre
                alert("Imagen subida con éxito");
            } else {
                console.error("Error al subir la imagen:", data);
                alert("Error al subir la imagen");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            alert("Error al subir la imagen");
        } finally {
            setLoading(false);  // Desactivar la carga
        }
    };

    return (
        <div className="subirFoto">
            <input className="inputProd" type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button className="login" onClick={handleUpload} disabled={loading}>
                {loading ? 'Subiendo imagen...' : 'Subir Imagen'}
            </button>
            {url && <p>Imagen subida con éxito ✅</p>}
        </div>
    );
};

export default SubirImagen;
