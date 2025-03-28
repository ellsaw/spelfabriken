import { createContext, useContext, useEffect, useReducer } from "react";


const initialCart = JSON.parse(localStorage.getItem("cart")) || {
    items: [],
    sum: 0,
    rebate: 0
}


function cartReducer(cart, action){
    switch(action.type){
        case "ADD_TO_CART":
            return {
                ...cart,
                items: [...cart.items, { id: action.payload.id, quantity: 1 }],
                sum: cart.sum + action.payload.price,
                rebate: (action.payload.campaignPrice && cart.rebate - (action.payload.price - action.payload.campaignPrice)) || cart.rebate
            };
        case "REMOVE_FROM_CART":
            const removedItem = (cart.items.filter((item) => item.id === action.payload.id))[0];

             return {
                ...cart,
                items: cart.items.filter((item) => item.id != removedItem.id),
                sum: cart.sum - (action.payload.price * removedItem.quantity),
                rebate: action.payload.campaignPrice ? cart.rebate + ((action.payload.price - action.payload.campaignPrice) * removedItem.quantity) : cart.rebate
            }
        case "INCREMENT":
            return {
                ...cart,
                items: cart.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item),
                sum: cart.sum + action.payload.price,
                rebate: action.payload.campaignPrice ? cart.rebate - (action.payload.price - action.payload.campaignPrice) : cart.rebate
            }
        case "DECREMENT":
            return {
                ...cart,
                items: cart.items.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item),
                sum: cart.sum - action.payload.price,
                rebate: action.payload.campaignPrice ? cart.rebate + action.payload.price - action.payload.campaignPrice : cart.rebate
            }
    }
}

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    useEffect(() => {
        if(cart) localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    return (
        <CartContext.Provider value={{ cart: { items: cart.items, sum: cart.sum, rebate: cart.rebate}, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}