import { useEffect, useRef} from "react";
import SidebarContent from "./SidebarContent.jsx";
import { useLocation } from "react-router";

export default function Sidebar({ toggleSidebar }) {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null)
  
  const location = useLocation();

  const prevLocation = useRef(location.pathname);

    const handleSidebar = {
        initialize(){
            const body = document.querySelector("body");
            
            setTimeout(() => {
              overlayRef.current.classList.remove("opacity-0")
              sidebarRef.current.classList.remove("scale-x-0")
              body.classList.add("overflow-hidden")
            }, 1);
        },
        close(){
            const body = document.querySelector("body");

            overlayRef.current.classList.add("opacity-0")
            sidebarRef.current.classList.add("scale-x-0")
            body.classList.remove("overflow-hidden")

            setTimeout(() => {
                toggleSidebar()
            }, 150);
        }
    }

    useEffect(() => {
      if (location.pathname !== prevLocation.current) {
        prevLocation.current = location.pathname;

        handleSidebar.close();
      }
    }, [location])
    
    useEffect(() => {
        handleSidebar.initialize();
    }, [])

  return (
    <>
      <aside ref={sidebarRef} className="h-[100dvh] bg-white w-[90vw] max-w-[350px] fixed right-0 top-0 z-50 scale-x-0 origin-right transition-transform duration-150 overflow-y-auto">
        <SidebarContent close={handleSidebar.close}/>
      </aside>
      <div ref={overlayRef} className="fixed top-0 left-0 size-full bg-neutral-950/20 backdrop-blur-sm z-40 opacity-0 transition-opacity duration-150" onClick={handleSidebar.close}></div>
    </>
  );
}
