import { Link } from "react-router";
import NavSubItem from "./NavSubItem.jsx";

export default function NavItem({ label }) {

    function dropdownHandler(event){
        const parent = event.target.closest(".dropdown-parent");

        const target = parent.querySelector(".dropdown");

        const initialMouseX = event.clientX;
        const initialMouseY = event.clientY;

        target.classList.remove("hidden");

        setTimeout(() => {
            target.classList.remove("scale-y-0")
        }, 1);
 
        const leaveHandler = () => {

            target.removeEventListener("mouseleave", leaveHandler)

            window.removeEventListener("mousemove", moveCheck)

            target.classList.add("scale-y-0");

            setTimeout(() => {
                target.classList.add("hidden");
            }, 150);
        }

        const moveCheck = (moveEvent) => {
            const mouseX = moveEvent.clientX;
            const mouseY = moveEvent.clientY;

            const deltaX = mouseX - initialMouseX
            const deltaY = mouseY - initialMouseY

            if((-deltaY >= parent.clientHeight) || (Math.abs(deltaX) > (parent.clientWidth / 2))){
                leaveHandler();
            }

        }

       window.addEventListener("mousemove", moveCheck) 

       target.addEventListener("mouseleave", leaveHandler)

    }

  return (
    <div className="dropdown-parent flex-1 flex justify-center relative" onMouseEnter={(event) => dropdownHandler(event)}>
      <Link className="">{label}</Link>
      <div className="dropdown hidden absolute z-20 bg-black top-8 font-normal rounded-b-lg scale-y-0 origin-top transition-transform duration-150">
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
