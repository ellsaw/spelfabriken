import { Outlet, useLocation } from "react-router";
import Header from "../store/Header.jsx";

export default function PublicLayout() {
    const location = useLocation();
    const display = !location.pathname.startsWith("/admin");

 return (
    <>
        {display && <Header/>}
        <Outlet/>
    </>
 );
}
