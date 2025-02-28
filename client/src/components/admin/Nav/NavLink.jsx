import { Link, useLocation } from "react-router";

export default function NavLink({label, to}) {
    const location = useLocation();
    const isActive = location.pathname === to;

    const styles = {
        base: "block py-golden-md px-golden-lg rounded-lg font-semibold transition-all duration-100",
        active: 'text-white bg-primary',
        inactive: 'outline-2 outline-border text-border hover:text-primary hover:outline-primary'
    }

 return (
    <Link className={`${styles.base} ${isActive ? styles.active : styles.inactive}`} to={to}>{label}</Link>
 );
}
