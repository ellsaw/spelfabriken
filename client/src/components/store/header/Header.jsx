import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput.jsx";
import LowerNav from "./lower-nav/LowerNav.jsx";
import Sidebar from "./sidebar/Sidebar.jsx";
import Cart from "../cart/Cart.jsx";
import { useCart } from "../cart/CartContext.jsx";

export default function Header() {
  const [ showSidebar, setShowSidebar ] = useState(false);
  const [ showCart, setShowCart ] = useState(false);
  const { cart } = useCart();
  const headerRef = useRef(null);
  const cartButtonRef = useRef(null);

  function toggleSidebar(){
    setShowSidebar(!showSidebar);
  }

  function toggleCart(){
    setShowCart(!showCart);
  }


  function initalScrollHandler(event){

    const initialScroll = window.scrollY;

    function scrollHandler(){
      const currentScrollY = window.scrollY;

      if (currentScrollY > initialScroll) {
        headerRef.current.classList.remove("top-0")
        headerRef.current.classList.add("sm:-top-28", "-top-32")

        setTimeout(() => {
          headerRef.current.classList.remove("sticky")
        }, 150);
      } else if (currentScrollY < initialScroll) {
        headerRef.current.classList.add("sticky")

        setTimeout(() => {
          headerRef.current.classList.remove("sm:-top-28", "-top-32")
          headerRef.current.classList.add("top-0")
        }, 1);
      }

      document.removeEventListener("scroll", scrollHandler)
    }
    document.addEventListener("scroll", scrollHandler)
  }

  useEffect(() => {
    document.addEventListener("scroll", initalScrollHandler)

    return () => {
      document.removeEventListener("scroll", initalScrollHandler)
    }
  }, [])

  return (
    <>
    <header ref={headerRef} className={`bg-black text-white px-golden-md border-b-4 border-primary z-30 transition-all duration-300 ${showCart ? "fixed! top-0! w-full" : "sm:-top-28 -top-32"}`}>
      <div className="max-w-[1024px] mx-auto">
        <div className="flex justify-between items-center py-golden-md">
          <h1 className="text-lg font-medium">LOGO</h1>
          <div className="hidden sm:block flex-1 px-golden-md">
            <SearchInput />
          </div>
          <div className="flex">
            <button ref={cartButtonRef} className="relative h-10 cursor-pointer disabled:opacity-50 disabled:cursor-auto" aria-label="Öppna varukorg" disabled={cart.items.length === 0} onClick={toggleCart}>
              <svg
                className="fill-white"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 18C17.5304 18 18.0391 18.2107 18.4142 18.5858C18.7893 18.9609 19 19.4696 19 20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22C16.4696 22 15.9609 21.7893 15.5858 21.4142C15.2107 21.0391 15 20.5304 15 20C15 18.89 15.89 18 17 18ZM1 2H4.27L5.21 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63L7.17 14.75C7.17 14.8163 7.19634 14.8799 7.24322 14.9268C7.29011 14.9737 7.3537 15 7.42 15H19V17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2ZM7 18C7.53043 18 8.03914 18.2107 8.41421 18.5858C8.78929 18.9609 9 19.4696 9 20C9 20.5304 8.78929 21.0391 8.41421 21.4142C8.03914 21.7893 7.53043 22 7 22C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20C5 18.89 5.89 18 7 18ZM16 11L18.78 6H6.14L8.5 11H16Z"
                  fill="currentColor"
                />
              </svg>
              {cart.items.length > 0 &&
                <div className="absolute top-0 right-0 rounded-full size-4 text-xs font-bold bg-white text-black leading-3.5">{cart.items.length < 10 ? cart.items.length : "9+"}</div>
              }
            </button>
            <button className="h-10 lg:hidden cursor-pointer" aria-label="Sidebar" onClick={toggleSidebar}>
              <svg
                className="fill-white"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="sm:hidden pb-golden-lg">
          <SearchInput />
        </div>
        <LowerNav/>
      </div>
    </header>
    {showSidebar &&
    <Sidebar toggleSidebar={toggleSidebar}/>
    }
    {showCart &&
      <Cart cartButton={cartButtonRef.current} toggleCart={toggleCart}/>
    }
    </>
  );
}
