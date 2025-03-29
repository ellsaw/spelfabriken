import { useNavigate } from "react-router";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutCart from "./CheckoutCart";
import CheckoutForm from "./CheckoutForm";
import { useEffect } from "react";
import { useCart } from "../cart/CartContext";

export default function Checkout() {
    const { cart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if(cart.items.length === 0) navigate("/")
    })

 return (
    <>
    <title>Kassan | Spelfabriken</title>
     <CheckoutHeader/>
     <main className="flex *:md:flex-1 md:flex-row-reverse flex-col gap-golden-xl px-golden-md py-golden-lg max-w-[1024px] mx-auto">
        <CheckoutCart/>
        <CheckoutForm sum={cart.sum}/>
     </main>
    </>
 );
}