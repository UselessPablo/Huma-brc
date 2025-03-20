import { useState, useEffect } from "react";
import { getDatabase, ref, set, get, update } from "firebase/database";
import SubirImagen from "./SubirImagen";
import { database } from "./firebase";

const GuardarProducto = () => {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const db = getDatabase();
        const productsRef = ref(db, "productos/");
        get(productsRef).then((snapshot) => {
            if (snapshot.exists()) {
                setProductos(Object.entries(snapshot.val()));
            }
        });
    }, []);

    const guardarEnFirebase = () => {
        if (!nombre || !precio || !stock || !imageUrl || !descripcion) {
            alert("Completa todos los campos");
            return;
        }
        const db = getDatabase();
        const productRef = ref(db, `productos/${nombre}`);
        set(productRef, { nombre, precio, stock, descripcion, imageUrl })
            .then(() => alert("Producto guardado"))
            .catch((error) => alert("Error: " + error));
    };

    const seleccionarProducto = (id, producto) => {
        setProductoSeleccionado(id);
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setStock(producto.stock);
        setDescripcion(producto.descripcion);
        setImageUrl(producto.imageUrl);
    };

    const actualizarProducto = () => {
        if (!productoSeleccionado) return;
        const db = getDatabase();
        const productRef = ref(db, `productos/${productoSeleccionado}`);
        update(productRef, { nombre, precio, stock, descripcion, imageUrl })
            .then(() => alert("Producto actualizado"))
            .catch((error) => alert("Error: " + error));
    };

    return (
        <div className="ingresarProd">
            <h3>{productoSeleccionado ? "Editar Producto" : "Agregar Producto"}</h3>
            <input className="inputProd" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={!!productoSeleccionado} />
            <input className="inputProd precio" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            <input className="inputProd stock" type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
            <textarea className="inputProd" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="3" />
            <SubirImagen onUpload={setImageUrl} />
            {productoSeleccionado ? (
                <button className="login" onClick={actualizarProducto}>Actualizar Producto</button>
            ) : (
                <button className="login" onClick={guardarEnFirebase}>Guardar Producto</button>
            )}

            <h3>Productos Guardados</h3>
            <ul>
                {productos.map(([id, producto]) => (
                    <li key={id}>
                        {producto.nombre} - ${producto.precio}
                        <button className="login" onClick={() => seleccionarProducto(id, producto)}>Editar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GuardarProducto;