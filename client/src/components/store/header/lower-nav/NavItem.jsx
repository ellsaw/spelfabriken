import { Link } from "react-router";

export default function NavItem({ label }) {
 return (
    <div className="flex-1 text-center">
        <Link className="">{label}</Link>
    </div>
 );
}