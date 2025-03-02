import { Outlet } from "react-router";
import Nav from "../admin/Nav/Nav.jsx";

export default function PublicLayout() {

 return (
    <>
    <title>Dashboard</title>
    <div className="bg-white font-kanit flex absolute h-full w-full">
        <Nav/>
        <main className="grow-1 flex p-golden-xl justify-center">
            <Outlet/>
        </main>
    </div>
    </>
 );
}
