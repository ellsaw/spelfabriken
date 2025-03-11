import { Outlet } from "react-router";
import Header from "../admin/header/Header.jsx";

export default function PublicLayout() {

 return (
    <>
    <title>Dashboard</title>
    <div className="bg-neutral-300 font-kanit min-h-[100dvh] flex flex-col text-black">
    <Header/>
    <div className="flex justify-center flex-1">
    <main className="flex justify-center max-w-[640px] bg-white flex-1 shadow-sm">
        <Outlet/>
    </main>
    </div>
    </div>
    </>
 );
}
