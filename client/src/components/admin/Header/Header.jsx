import NavLink from "./NavLink";

export default function Header() {
 return (
    <header className="bg-pure-white mb-golden-xl text-primary px-golden-lg py-golden-md flex justify-center shadow-sm">
        <div className="justify-between flex items-center max-w-[1024px] w-full">
            <h1 className="text-md font-semibold">LOGO Dashboard</h1>
            <nav className="flex gap-golden-md">
            <NavLink label="Produkter" to="/admin/products"/>
            <NavLink label="Ny produkt" to="/admin/products/new"/>
            </nav>
        </div>
    </header>
 );
}
