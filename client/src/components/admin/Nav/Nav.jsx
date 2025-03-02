import NavLink from "./NavLink";

export default function Nav() {
 return (
    <aside className="w-fit h-full bg-white border-r-2 border-border text-primary px-golden-lg">
        <h1 className="text-md font-semibold py-golden-lg">LOGO Dashboard</h1>
        <nav className="flex flex-col gap-golden-md">
            <NavLink label="Produkter" to="/admin/products"/>
            <NavLink label="Ny produkt" to="/admin/products/new"/>
        </nav>
    </aside>
 );
}
