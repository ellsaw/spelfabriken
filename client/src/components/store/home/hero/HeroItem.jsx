import { Link } from "react-router";

export default function HeroItem({ img, text, buttonlabel, href, invisibleText }) {
 return (
        <div className={`bg-[url(${img})] bg-cover bg-center h-full w-screen max-w-[1024px] text-white flex justify-center items-end py-golden-2xl select-none`}>
            <div className="flex flex-col items-center gap-golden-xl px-golden-lg">
                <h2 className={`text-lg text-center font-bold tracking-wider leading-9 drop-shadow-xl ${invisibleText && "invisible"}`}>{text}</h2>
                <Link to={href} className="bg-white text-black font-bold w-32 text-center py-golden-md rounded-md block tracking-wide shadow-lg shadow-black hover:outline-2 outline-primary">{buttonlabel}</Link>
            </div>
       </div>
 );
}
