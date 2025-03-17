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
      <Link className="" to={`/kategori/${label === "Spel" ? "spel" : label === "Konsoller" ? "konsoller" : label === "PC" ? "pc" : label === "TV, Ljud & Bild" ? "tv-ljud-and-bild" : label === "Hobby" ? "hobby" : null}`}>{label}</Link>
      <div ref={targetRef} className="hidden absolute z-20 bg-black top-8 font-normal rounded-b-lg scale-y-0 origin-top transition-transform duration-150">
        <nav className="flex flex-col min-w-40 max-w-fit gap-golden-sm py-golden-md px-golden-md">
          {label === "Spel" ? (
            <>
              <NavSubItem href="/spel-till-xbox" label="Xbox" />
              <NavSubItem href="/spel-till-playstation" label="Playstation" />
              <NavSubItem href="/spel-till-nintendo" label="Nintendo" />
              <NavSubItem href="/spel-till-pc" label="Spel till PC" />
              <NavSubItem href="/retrospel" label="Retro" />
              <NavSubItem href="/kort-and-bradspel" label="Kort & Brädspel" />
            </>
          ) : label === "Konsoller" ? (
            <>
              <NavSubItem href="/xbox" label="Xbox" />
              <NavSubItem href="/playstation" label="Playstation" />
              <NavSubItem href="/nintendo" label="Nintendo" />
              <NavSubItem href="/retro" label="Retro" />
            </>
          ) : label === "PC" ? (
            <>
              <NavSubItem href="/kompletta-datorer" label="Kompletta Datorer" />
              <NavSubItem href="/processorer-cpu" label="Processorer / CPU" />
              <NavSubItem href="/grafikkort-gpu" label="Grafikkort / GPU" />
              <NavSubItem href="/moderkort" label="Moderkort" />
              <NavSubItem href="/lagring" label="Lagring" />
              <NavSubItem href="/minne-ram" label="Minne / RAM" />
              <NavSubItem href="/chassi" label="Chassi" />
              <NavSubItem href="/nataggregat-psu" label="Nätaggregat / PSU" />
              <NavSubItem href="/ovrigt" label="Övrigt" />
            </>
          ) : label === "TV, Ljud & Bild" ? (
            <>
              <NavSubItem href="/tv" label="TV" />
              <NavSubItem href="/bildskarmar" label="Bildskärmar" />
              <NavSubItem href="/horlurar" label="Hörlurar" />
              <NavSubItem href="/headsets" label="Headsets" />
              <NavSubItem href="/kablar-and-kontakter" label="Kablar & Kontakter" />
            </>
          ) : label === "Hobby" ? (
            <>
              <NavSubItem href="/lego" label="LEGO" />
              <NavSubItem href="/samlarkort" label="Samlarkort" />
              <NavSubItem href="/samlarprylar" label="Samlarprylar" />
              <NavSubItem href="/leksaker" label="Leksaker" />
            </>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
