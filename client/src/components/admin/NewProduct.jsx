import { useState } from "react";
import { useNavigate } from "react-router";

export default function NewProduct() {
    const navigate = useNavigate();

    const subcategories = [
        [
            {value: "Spel till Xbox"},
            {value: "Spel till Playstation"},
            {value: "Spel till Nintendo"},
            {value: "Spel till PC"},
            {value: "Retrospel"},
            {value: "Kort- & Brädspel"}
        ],
        [
            {value: "Xbox"},
            {value: "Playstation"},
            {value: "Nintendo"},
            {value: "Retro"},
        ],
        [
            {value: "Kompletta Datorer"},
            {value: "Processorer / CPU"},
            {value: "Grafikkort / GPU"},
            {value: "Moderkort"},
            {value: "Lagring"},
            {value: "Minne / RAM"},
            {value: "Chassi"},
            {value: "Nätaggregat / PSU"},
            {value: "Övrigt"},
        ],
        [
            {value: "TV"},
            {value: "Bildskärmar"},
            {value: "Hörlurar"},
            {value: "Högtalare"},
            {value: "Headsets"},
            {value: "Kablar & Kontakter"},
        ],
        [
            {value: "LEGO"},
            {value: "Samlarprylar"},
            {value: "Samlarkort"},
            {value: "Leksaker"},
        ],
    ]
    
    const [categoryIndex, setCategoryIndex] = useState(0)

    const [activeError, setActiveError] = useState(null);

    const formHandler = {
        superCategory(event){
            setCategoryIndex(event.target.value)
        },
        submit(event){
            event.preventDefault();

            const formData = new FormData(event.target);

            fetch("/api/products/admin", {
                method: "POST",
                body: formData
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success){
                    navigate("/admin/products")
                }
                else if (data.error === "UNIQUE constraint failed: products.sku"){
                    setActiveError("SKU")
                }
                else{
                    setActiveError("Unknown")
                }
            })
            .catch(() => { // Catch for no response
                setActiveError("Unknown")
            })
        }
    }

 return (
    <div className="w-full">
        <form className="flex flex-col p-golden-lg gap-golden-md rounded-md [&>*]:flex [&>*]:flex-col w-full" onSubmit={(event) => formHandler.submit(event)}>
            <div>
                <label htmlFor="product_name" className="font-medium">Produktnamn <span className="text-red-700">*</span></label>
                <input className="outline-1 outline-border rounded-sm px-golden-md py-golden-sm" type="text" name="product_name" id="product_name" required/>
            </div>
            <div>
                <label htmlFor="description" className="font-medium">Beskrivning <span className="text-red-700">*</span></label>
                <textarea className="outline-1 outline-border rounded-sm px-golden-md py-golden-sm" name="description" id="description" required></textarea>
            </div>
            <div>
                <label htmlFor="superCategory" className="font-medium">Kategori</label>
                <select className="outline-1 outline-border rounded-sm px-golden-sm py-golden-sm" id="superCategory" name="superCategory" onChange={(event) => formHandler.superCategory(event)}>
                    <option value="0">Spel</option>
                    <option value="1">Konsoller</option>
                    <option value="2">PC</option>
                    <option value="3">TV, Ljud & Bild</option>
                    <option value="4">Hobby</option>
                </select>
            </div>
            <div>
                <label htmlFor="category" className="font-medium">Underkategori</label>
                <select className="outline-1 outline-border rounded-sm px-golden-sm py-golden-sm" name="category" id="category" required>
                    {subcategories[categoryIndex].map(category => (
                        <option key={category.value} value={category.value}>{category.value}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="brand" className="font-medium">Märke/Tillverkare <span className="text-red-700">*</span></label>
                <input className="outline-1 outline-border rounded-sm px-golden-md py-golden-sm" type="text" name="brand" id="brand" required/>
            </div>
            <div>
                <label htmlFor="sku" className="font-medium">SKU <span className="text-red-700">*</span></label>
                <input className={`outline-1 rounded-sm px-golden-md py-golden-sm ${activeError === "SKU" ? "outline-red-700" : "outline-border"}`} type="text" name="sku" id="sku" pattern="[A-Za-z]{3}[0-9]{3}" maxLength="6" required onChange={() => {if(activeError) setActiveError(null) }}/>
                <p className="text-red-700">{activeError === "SKU" ? "Denna SKU används redan, försök igen" : ""}</p>
            </div>
            <div>
                <label htmlFor="price" className="font-medium">Pris <span className="text-red-700">*</span></label>
                <input className="outline-1 outline-border rounded-sm px-golden-md py-golden-sm" type="number" name="price" id="price" required/>
            </div>
            <div>
                <label htmlFor="date" className="font-medium">Datum <span className="text-red-700">*</span></label>
                <input className="outline-1 outline-border rounded-sm px-golden-md py-golden-sm" type="date" name="date" id="date" required/>
            </div>
            <div>
                <label htmlFor="image">
                    Produktbild
                </label>
                <input className="rounded-sm outline-1 outline-border file:mr-golden-md file:bg-secondary file:text-white file:px-golden-lg file:py-golden-md file:cursor-pointer file:tracking-wider" type="file" name="image" id="image" accept=".webp" required/>
                <p className= "opacity-75 font-light">.WEBP</p>
            </div>
            <button className="bg-primary text-white py-golden-md rounded-lg cursor-pointer hover:bg-primary-40l transition-all duration-100" type="submit">Lägg till</button>
            {activeError && activeError != "SKU" ? <p className="text-red-700">Ett fel uppstod, prova igen senare</p> : null}
        </form>
    </div>
 );
}
