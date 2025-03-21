import { useEffect, useRef, useState } from "react";

export default function Description( {description, product_name} ) {
        const [ hideDescription, setHideDescription ] = useState(false);
        const descriptionRef = useRef(null)

        function convertLineBreaks(text){
            return text.split(/\r\n|\r|\n/).map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ))
        }

        useEffect(() => {
            if(!description || !descriptionRef?.current) return;

            if(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight) setHideDescription(true);
        }, [description])

        function readMoreHandler(){
            descriptionRef.current.classList.remove("max-h-46")

            setHideDescription(false)
        }

 return (
    <section className="mt-golden-xl">
                <h3 className="font-semibold mb-golden-md">Beskrivning:</h3>
                {description.startsWith("https://www.youtube.com/") ?
                <iframe className="w-full aspect-video" width="100%" height="100%" src={description} title={product_name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                :
                <div ref={descriptionRef} className="max-h-46 overflow-hidden relative">
                    <p>{convertLineBreaks(description)}</p>
                    {hideDescription &&
                        <div className="absolute size-full bottom-0 bg-linear-to-b from-transparent to-white flex justify-center items-end">
                            <button className="bg-white py-golden-md font-semibold w-full cursor-pointer" onClick={readMoreHandler} aria-label="Läs mer">Läs mer</button>
                        </div>
                    }
                </div>
            }
            </section>
 );
}
