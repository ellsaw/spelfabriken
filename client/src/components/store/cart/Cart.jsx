import { useRef, useEffect } from "react";
import { Link } from "react-router";
import { useCart } from "./CartContext";
import UseWindowWidth from "../../../hooks/useWindowWidth";
import CartItem from "./CartItem";
import formatPrice from "../../../utils/formatPrice";

export default function Cart({ cartButton, toggleCart }) {
    const cartButtonLocation = cartButton.getBoundingClientRect();
    const overlayRef = useRef(null);
    const cartRef = useRef(null);
    const { cart, dispatch } = useCart()

    const windowWidth = UseWindowWidth();

    const handle = {
        initialize(){
            const body = document.querySelector("body");
            
            setTimeout(() => {
              overlayRef.current.classList.remove("opacity-0")
              cartRef.current.classList.remove("scale-0")
              body.classList.add("overflow-hidden")
            }, 1);
        },
        close(){
            const body = document.querySelector("body");

            overlayRef.current.classList.add("opacity-0")
            cartRef.current.classList.add("scale-0")
            body.classList.remove("overflow-hidden")

            setTimeout(() => {
                toggleCart()
            }, 150);
        }
    }

    useEffect(() => {
        handle.initialize();
    }, [windowWidth >= 640])

    useEffect(() => {
        if(cart.items.length === 0) handle.close();
    }, [cart])

 return (
    <>
        <section ref={cartRef} className={`fixed top-16 w-full max-w-[27rem] px-golden-md bg-white rounded-sm z-50 origin-top-right scale-0 transition-transform duration-150 ${(windowWidth >= 640) && "-translate-x-full"}`} style={(windowWidth >= 640) ? {left: cartButtonLocation.right} : {right: 0}}>
            <div className="py-golden-sm border-b-[2px] border-black flex justify-between items-center">
                <h2 className="text-md font-semibold">Varukorgen</h2>
                <button className="cursor-pointer" aria-label="Stäng varukorg" onClick={handle.close}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 24 24"
                        >
                        <path
                            fill="currentColor"
                            d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
                        />
                    </svg>
                </button>
            </div>
            <ul className="w-full max-h-[400px] px-golden-lg py-golden-md flex flex-col overflow-y-scroll">
                {cart.items.map(item => (
                    <CartItem key={item.id} id={item.id} quantity={item.quantity}/>
                ))}
            </ul>
            <div className="pb-golden-lg flex flex-col gap-golden-md">
                <div>
                    <p className="flex justify-between font-light">Rabatt: <span className="font-normal">{cart.rebate < 0 ? `- ${formatPrice(Math.abs(cart.rebate))}` : 0} kr</span></p>
                    <p className="flex justify-between -mt-1">Summa: <span className="font-semibold">{formatPrice(cart.sum)} kr</span></p>
                </div>
                <Link className="block font-semibold bg-primary hover:bg-primary-40l text-white w-full text-center py-golden-md rounded-xl" to={"/kassa"}>Gå till kassan</Link>
            </div>
        </section>
        <div ref={overlayRef} className="fixed size-full bg-neutral-950/50 opacity-0 transition-opacity duration-150 top-0 z-40" onClick={handle.close}></div>
    </>
 );
}