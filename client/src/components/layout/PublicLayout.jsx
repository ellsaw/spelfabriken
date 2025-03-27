import { Outlet } from "react-router";
import Header from "../store/header/Header.jsx";
import Footer from "../store/footer/footer.jsx";
import { CartProvider } from "../store/cart/CartContext.jsx";

export default function PublicLayout() {

 return (
    <CartProvider>
        <Header/>
        <main className="bg-white text-black">
            <div className="max-w-[1024px] mx-auto">
                <Outlet/>
            </div>
        </main>
        <Footer/>
    </CartProvider>
 );
}
