import { useEffect, useState } from "react";
import HeroItem from "./HeroItem.jsx";
import HeroNavButton from "./HeroNavButton.jsx";

export default function Hero() {
    const transitionDurationMS = 150;

    const slideIntervalMS = 3000;

    const [currentSlide, setCurrentSlide] = useState(0);

    const [intervalPaused, setIntervalPaused] = useState(false);

    window.addEventListener("resize", () => {
        
        const heroTrack = document.getElementById("hero-track");
        const numberOfHeroItems = heroTrack.children.length;
        const itemWidth = heroTrack.firstChild.clientWidth;
        const maxWidth = itemWidth * (numberOfHeroItems - 1)
        const initialTranslate = parseInt(heroTrack.style.transform.replace(/\D/g, ""), 10) || 0;

        const closestWidth = (Math.round((initialTranslate) / itemWidth) * itemWidth)

        const snap = Math.min(Math.min(Math.max(closestWidth, 0), maxWidth))

        moveCarousel(heroTrack, snap)

    })

    function moveCarousel(track, amount, customDurationMS){
        track.classList.add("transition-transform", `duration-${customDurationMS || transitionDurationMS}`)
        track.style.transform = `translateX(-${ amount }px)`;

        setTimeout(() => {
            track.classList.remove("transition-transform", `duration-${customDurationMS || transitionDurationMS}`)
        }, customDurationMS || transitionDurationMS);
    }

    useEffect(() => {
        
        if(intervalPaused) return;

        const heroTrack = document.getElementById("hero-track");
        const numberOfHeroItems = heroTrack.children.length;

        const interval = setInterval(() => {
            setCurrentSlide((cs) => {
                const nextSlide = (cs + 1) % numberOfHeroItems;

                return nextSlide;
            })    
        }, slideIntervalMS);

        return () => clearInterval(interval);
    }, [intervalPaused])

    function handleInterval(){
        setIntervalPaused(!intervalPaused);
    }


    useEffect(() => {
        const heroTrack = document.getElementById("hero-track");
        const itemWidth = heroTrack.firstChild.clientWidth;

        moveCarousel(heroTrack, currentSlide * itemWidth, 300);

    }, [currentSlide])


    function handleHeroCarousel(event) {
        const heroTrack = document.getElementById("hero-track");
        const numberOfHeroItems = heroTrack.children.length;
        const itemWidth = heroTrack.firstChild.clientWidth;
        const maxWidth = itemWidth * (numberOfHeroItems - 1)

        const initialMouseX = (event.clientX || event.touches[0].clientX);

        const initialTranslate = parseInt(heroTrack.style.transform.replace(/\D/g, ""), 10) || 0;

        let deltaMouseX = 0;
        function moveHandler(moveEvent) {
            deltaMouseX = initialMouseX - (moveEvent.clientX || moveEvent.touches[0].clientX);

            if((initialTranslate + deltaMouseX) >= maxWidth){
                heroTrack.style.transform = `translateX(-${maxWidth}px)`;
            } else{
                heroTrack.style.transform = `translateX(-${initialTranslate + deltaMouseX}px)`;
            }
            
        }
    
        function upHandler() {
            document.removeEventListener("mousemove", moveHandler);
            document.removeEventListener("mouseup", upHandler);
            document.removeEventListener("touchmove", moveHandler);
            document.removeEventListener("touchend", upHandler);

            if(deltaMouseX > 0){
                setCurrentSlide((cs) => (cs === (numberOfHeroItems - 1) ? cs : cs + 1))
            }else{
                setCurrentSlide((cs) => (cs === 0 ? cs : cs - 1))
            }
        }
    
        document.addEventListener("touchmove", moveHandler);
        document.addEventListener("touchend", upHandler);
        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", upHandler);
    }
 return (
    <section className="overflow-hidden relative" onMouseEnter={handleInterval} onMouseLeave={handleInterval} onTouchStart={handleInterval} onTouchEnd={handleInterval}>
        <div id="hero-track" className="h-[28rem] flex w-fit relative" onMouseDown={(event) => handleHeroCarousel(event)} onTouchStart={(event) => handleHeroCarousel(event)}>
            <HeroItem img="./src/assets/images/hero/nvidia-5000-series.avif" text="NVIDIA GeForce RTX 5070" buttonlabel="Shoppa nu" href="/"/>
            <HeroItem img="./src/assets/images/hero/nintendo-switch-2.avif" text="Nintendo Switch 2" buttonlabel="Shoppa nu" href="/"/>
            <HeroItem img="./src/assets/images/hero/assassins-creed-shadows.avif" text="Assassin's Creed Shadows" buttonlabel="Shoppa nu" href="/"/>
            <HeroItem img="./src/assets/images/hero/grand-theft-auto-vi.avif" text="Grand Theft Auto VI" buttonlabel="Shoppa nu" href="/"/>
        </div>
        <div className="absolute bottom-golden-md left-1/2 -translate-x-1/2 flex gap-golden-md">
            {[...Array(4)].map((_, index) => (
                <HeroNavButton key={index} isActive={index === currentSlide} onClick={() => setCurrentSlide(index)}/>
            ))}
        </div>
    </section>
 );
}
