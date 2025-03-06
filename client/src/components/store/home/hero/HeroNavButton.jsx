export default function HeroNavButton({isActive, onClick}) {
 return (
    <button className={`size-2 bg-white rounded-full cursor-pointer ${!isActive && "opacity-50"}`} onClick={onClick}></button>
 );
}
