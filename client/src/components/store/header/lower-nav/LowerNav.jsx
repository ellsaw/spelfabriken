import NavItem from "./NavItem.jsx";

export default function LowerNav() {
 return (
    <div className="hidden lg:block pb-golden-md">
        <nav className="flex font-semibold tracking-wide">
            <NavItem label="Spel"/>
            <NavItem label="Konsoller"/>
            <NavItem label="PC"/>
            <NavItem label="TV, Ljud & Bild"/>
            <NavItem label="Hobby"/>
        </nav>
    </div>
 );
}
