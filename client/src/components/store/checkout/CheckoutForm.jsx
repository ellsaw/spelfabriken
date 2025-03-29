import formatPrice from "../../../utils/formatPrice";

export default function CheckoutForm({ sum }) {
 return (
    <section>
        <h2 className="text-md font-semibold mt-golden-lg">Dina Uppgifter</h2>
        <form className="[&_input]:outline-1 [&_input]:outline-border [&_input]:rounded-lg [&_input]:px-golden-sm [&_input]:py-golden-xs [&_input]:focus:outline-primary [&_input]:focus:outline-2">
            <div className="flex flex-col gap-golden-md [&_label]:mb-golden-sm">
                <div className="flex flex-col">
                    <label htmlFor="email">E-post: <span className="text-red-700">*</span></label>
                    <input type="email" id="email" name="email" required autoComplete="on" pattern="^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="mobile-number">Mobilnummer:</label>
                    <input type="number" id="mobile-number" name="mobile-number" autoComplete="on"/>
                </div>
                <div className="flex gap-golden-md">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="first-name">Förnamn: <span className="text-red-700">*</span></label>
                        <input className="w-full" type="text" id="first-name" name="first-name" required autoComplete="on"/>
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="last-name">Efternamn: <span className="text-red-700">*</span></label>
                        <input className="w-full" type="text" id="last-name" name="last-name" required autoComplete="on"/>
                    </div>
                </div>
                <div className="flex gap-golden-md">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="adress">Address: <span className="text-red-700">*</span></label>
                        <input className="w-full" type="text" id="adress" name="adress" autoComplete="on"/>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="zip-code">Postnummer: <span className="text-red-700">*</span></label>
                        <input className="w-full" type="text" id="zip-code" name="zip-code" autoComplete="on"/>
                    </div>
                </div>
            </div>
            <div className="flex gap-golden-sm mt-golden-md">
                <input className="outline-none" type="checkbox" id="newsletter" name="newsletter"/>
                <label htmlFor="newsletter" className="text-sm">Jag vill vara med i Spelfabrikens kundklubb</label>
            </div>
            <div className="mt-golden-lg">
                <p className="flex flex-col text-center leading-5 ">Att betala: <span className="text-md font-semibold">{formatPrice(sum)} kr</span><span className="font-light mt-golden-sm">Inkl. moms och frakt</span></p>
                <button className="font-semibold bg-primary hover:bg-primary-40l text-white w-full text-center py-golden-md rounded-xl mt-golden-md" type="sumbit">Köp</button>
            </div>
        </form>
    </section>
 );
}
