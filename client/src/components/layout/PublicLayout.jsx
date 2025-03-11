import { Outlet } from "react-router";
import Header from "../store/header/Header.jsx";

export default function PublicLayout() {

 return (
    <>
        <Header/>
        <main className="bg-white text-black">
            <div className="max-w-[1024px] mx-auto">
                <Outlet/>
            </div>
        </main>
    </>
 );
}
