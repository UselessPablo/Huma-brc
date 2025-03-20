import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import Cart from "./Cart";

const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cartItems, setCartItems] = useState([]); // Estado del carrito

    useEffect(() => {
        const db = getDatabase();
        const productsRef = ref(db, "productos/");

        get(productsRef).then((snapshot) => {
            if (snapshot.exists()) {
                setProductos(Object.values(snapshot.val()));
            } else {
                console.log("No hay productos en la base de datos.");
            }
        }).catch((error) => {
            console.error("Error al obtener los productos:", error);
        });
    }, []);

    const handleImageClick = (producto) => {
        setProductoSeleccionado(producto);
    };

    const handleClose = () => {
        setProductoSeleccionado(null);
    };

    // ✅ Función para agregar un producto al carrito
    const handleAddToCart = (producto) => {
        const index = cartItems.findIndex(item => item.nombre === producto.nombre);

        if (index !== -1) {
            // Si el producto ya está en el carrito, aumenta su cantidad
            const newCart = [...cartItems];
            newCart[index].cantidad += 1;
            setCartItems(newCart);
        } else {
            // Si no está, agrégalo con cantidad 1
            setCartItems([...cartItems, { ...producto, cantidad: 1 }]);
        }

        setProductoSeleccionado(null); // Cierra el modal después de agregar
    };

    return (
        <div className="">
            <div className="App-header">
                <h3>Productos</h3>
                
            </div>

            {/* Pasamos el carrito como prop */}
            <div className="carrito">
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
            </div>

            <div className='mostrarProductos'>
                {productos.length > 0 ? (
                    productos.map((producto, index) => (
                        <div key={index} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "6px", borderRadius: '10px', margin: 8 }}>
                            <h4>{producto.nombre}</h4>
                            <p>Precio: ${producto.precio}</p>
                            
                            {producto.imageUrl ? (
                                <img
                                    className='imagenes'
                                    src={producto.imageUrl}
                                    alt={producto.nombre}
                                    width={160}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleImageClick(producto)}
                                />
                            ) : (
                                <p>No hay imagen disponible</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </div>

            {/* Modal con botón de agregar al carrito */}
            {productoSeleccionado && (
                <div
                    className="modal-overlay"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onClick={handleClose}
                >
                    <div
                        className="modal-content"
                        style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "10px",
                            textAlign: "center"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{productoSeleccionado.nombre}</h2>
                        <img src={productoSeleccionado.imageUrl} alt={productoSeleccionado.nombre} width={200} />
                        <p><strong>Precio:</strong> ${productoSeleccionado.precio}</p>
                        <p><strong>Stock:</strong> {productoSeleccionado.stock}</p>
                        <p><strong>Descripción:</strong> {productoSeleccionado.descripcion || "Sin descripción disponible"}</p>
                        <button
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginTop: "10px"
                            }}
                            onClick={() => handleAddToCart(productoSeleccionado)}
                        >
                            Agregar al carrito 🛒
                        </button>
                        <br />
                        <button
                            style={{
                                marginTop: "10px",
                                backgroundColor: "red",
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer"
                            }}
                            onClick={handleClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MostrarProductos;
