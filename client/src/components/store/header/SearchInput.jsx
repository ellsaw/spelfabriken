import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function SearchInput() {

    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const inputRef = useRef(null)

    function handleSubmit(event){
        event.preventDefault();

        const trimmedQuery = query.trim().replace(/\//g, "")

        if(trimmedQuery != ""){
            inputRef.current.blur();

            navigate(`/hitta?q=${trimmedQuery}`)

            inputRef.current.value = "";
        }
    }

 return (
    <form className="bg-white w-full text-black px-golden-md py-golden-md rounded-3xl flex items-center focus-within:outline-1 outline-primary transition-all duration-100" onSubmit={(event) => handleSubmit(event)}>
        <input ref={inputRef} className="placeholder:text-border placeholder:font-medium w-full outline-0" type="text" placeholder="Sök..." required onChange={(event) => {setQuery(event.target.value)}}/>
        <button className="h-6 cursor-pointer" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
        </button>
    </form>
 );
}
