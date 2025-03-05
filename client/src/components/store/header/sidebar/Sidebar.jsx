import { useEffect, useState } from "react";
import SidebarContent from "./SidebarContent.jsx";

export default function Sidebar({ toggleSidebar }) {

    const handleSidebar = {
        initialize(){
            const overlay = document.getElementById("overlay");
            const sidebar = document.getElementById("sidebar");
            const body = document.querySelector("body");
            
            setTimeout(() => {
                overlay.classList.remove("opacity-0")
                sidebar.classList.remove("scale-x-0")
                body.classList.add("overflow-hidden")
            }, 1);
        },
        close(){
            const overlay = document.getElementById("overlay");
            const sidebar = document.getElementById("sidebar");
            const body = document.querySelector("body");

            overlay.classList.add("opacity-0")
            sidebar.classList.add("scale-x-0")
            body.classList.add("overflow-hidden")

            setTimeout(() => {
                toggleSidebar()
            }, 150);
        }
    }
    
    useEffect(() => {
        handleSidebar.initialize();
    }, [])

  return (
    <>
      <aside id="sidebar" className="h-[100dvh] bg-white w-[90vw] max-w-[350px] fixed right-0 top-0 z-20 scale-x-0 origin-right transition-transform duration-150 overflow-scroll">
        <SidebarContent close={handleSidebar.close}/>
      </aside>
      <div id="overlay" className="fixed top-0 left-0 size-full bg-neutral-950/20 backdrop-blur-sm z-10 opacity-0 transition-opacity duration-150" onClick={handleSidebar.close}></div>
    </>
  );
}
