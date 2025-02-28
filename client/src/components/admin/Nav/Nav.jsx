import NavLink from "./NavLink";

export default function Nav() {
 return (
    <aside className="w-fit h-full bg-white border-r-4 border-border text-primary px-golden-lg">
        <h1 className="text-lg font-semibold py-golden-xl">LOGO Dashboard</h1>
        <nav className="flex flex-col gap-golden-lg">
            <NavLink label="Produkter" to="/admin/products"/>
            <NavLink label="Ny produkt" to="/admin/products/new"/>
        </nav>
    </aside>
 );
}
