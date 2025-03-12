import { Link } from "react-router";
import NavSubItem from "./NavSubItem.jsx";
import { useRef } from "react";

export default function NavItem({ label }) {

    const parentRef = useRef(null)
    const targetRef = useRef(null)

    function dropdownHandler(event){
        const initialMouseX = event.clientX;
        const initialMouseY = event.clientY;

        targetRef.current.classList.remove("hidden");

        setTimeout(() => {
            targetRef.current.classList.remove("scale-y-0")
        }, 1);
 
        const leaveHandler = () => {

            targetRef.current.removeEventListener("mouseleave", leaveHandler)

            window.removeEventListener("mousemove", moveCheck)

            targetRef.current.classList.add("scale-y-0");

            setTimeout(() => {
                targetRef.current.classList.add("hidden");
            }, 150);
        }

        const moveCheck = (moveEvent) => {
            const mouseX = moveEvent.clientX;
            const mouseY = moveEvent.clientY;

            const deltaX = mouseX - initialMouseX
            const deltaY = mouseY - initialMouseY

            if((-deltaY >= parentRef.current.clientHeight) || (Math.abs(deltaX) > (parentRef.current.clientWidth / 2))){
                leaveHandler();
            }

        }

       window.addEventListener("mousemove", moveCheck) 

       targetRef.current.addEventListener("mouseleave", leaveHandler)

    }

  return (
    <div ref={parentRef} className="flex-1 flex justify-center relative" onMouseEnter={(event) => dropdownHandler(event)}>
      <Link className="">{label}</Link>
      <div ref={targetRef} className="hidden absolute z-20 bg-black top-8 font-normal rounded-b-lg scale-y-0 origin-top transition-transform duration-150">
        <nav className="flex flex-col min-w-40 max-w-fit gap-golden-sm py-golden-md px-golden-md">
          {label === "Spel" ? (
            <>
              <NavSubItem href="/" label="Xbox" />
              <NavSubItem href="/" label="Playstation" />
              <NavSubItem href="/" label="Nintendo" />
              <NavSubItem href="/" label="Spel till PC" />
              <NavSubItem href="/" label="Retro" />
              <NavSubItem href="/" label="Kort & Brädspel" />
            </>
          ) : label === "Konsoller" ? (
            <>
              <NavSubItem href="/" label="Xbox" />
              <NavSubItem href="/" label="Playstation" />
              <NavSubItem href="/" label="Nintendo" />
              <NavSubItem href="/" label="Retro" />
            </>
          ) : label === "PC" ? (
            <>
              <NavSubItem href="/" label="Kompletta Datorer" />
              <NavSubItem href="/" label="Processorer / CPU" />
              <NavSubItem href="/" label="Grafikkort / GPU" />
              <NavSubItem href="/" label="Moderkort" />
              <NavSubItem href="/" label="Lagring" />
              <NavSubItem href="/" label="Minne / RAM" />
              <NavSubItem href="/" label="Chassi" />
              <NavSubItem href="/" label="Näraggregat / PSU" />
              <NavSubItem href="/" label="Övrigt" />
            </>
          ) : label === "TV, Ljud & Bild" ? (
            <>
              <NavSubItem href="/" label="TV" />
              <NavSubItem href="/" label="Bildskärmar" />
              <NavSubItem href="/" label="Hörlurar" />
              <NavSubItem href="/" label="Headsets" />
              <NavSubItem href="/" label="Kablar & Kontakter" />
            </>
          ) : label === "Hobby" ? (
            <>
              <NavSubItem href="/" label="LEGO" />
              <NavSubItem href="/" label="Samlarkort" />
              <NavSubItem href="/" label="Samlarprylar" />
              <NavSubItem href="/" label="Leksaker" />
            </>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
