import { Link, useLocation } from "react-router";

export default function NavLink({label, to}) {
    const location = useLocation();
    const isActive = location.pathname === to;

    const styles = {
        base: "block py-golden-sm px-golden-md rounded-md transition-all duration-100",
        active: 'border-1 border-primary text-white bg-primary',
        inactive: 'border-1 border-border text-border hover:text-primary hover:border-primary'
    }

 return (
    <Link className={`${styles.base} ${isActive ? styles.active : styles.inactive}`} to={to}>{label}</Link>
 );
}
