const Cart = ({ cartItems, setCartItems }) => {
    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }

    const increaseQuantity = (index) => {
        const newCart = [...cartItems];
        newCart[index].cantidad += 1;
        setCartItems(newCart);
    };

    const decreaseQuantity = (index) => {
        const newCart = [...cartItems];
        if (newCart[index].cantidad > 1) {
            newCart[index].cantidad -= 1;
        } else {
            newCart.splice(index, 1);
        }
        setCartItems(newCart);
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <div style={{ padding: "4px", border: "1px solid #ddd", borderRadius: "10px", width: "120px", backgroundColor: "#f9f9f9", }}>
            <h2>🛒 </h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                            <h4>{item.nombre}</h4>
                            <p>Precio: ${item.precio}</p>
                            <p>Cantidad: {item.cantidad}</p>
                            <button onClick={() => decreaseQuantity(index)}>-</button>
                            <button onClick={() => increaseQuantity(index)}>+</button>
                        </div>
                    ))}
                    <h3>Total: ${getTotal()}</h3>
                    <button onClick={clearCart} style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
                        Vaciar carrito 🗑️
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
