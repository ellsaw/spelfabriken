import { Outlet } from "react-router";
import Header from "../store/Header.jsx";

export default function PublicLayout() {

 return (
    <>
        <Header/>
        <Outlet/>
    </>
 );
}
