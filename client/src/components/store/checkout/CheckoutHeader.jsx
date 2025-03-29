import { Link } from "react-router";

export default function CheckoutHeader() {
 return (
    <header className="bg-black text-white px-golden-md border-b-4 border-primary z-30">
        <div className="max-w-[1024px] mx-auto">  
          <Link to={"/"}><h1 className="text-lg font-medium">LOGO</h1></Link>
        </div>
    </header>
 );
}
