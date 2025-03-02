import { useState } from "react";

export default function NewProduct() {
    const subcategories = [
        [
            {value: "Xbox"},
            {value: "Playstation"},
            {value: "Spel till PC"},
            {value: "Retro"},
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

    const formHandler = {
        superCategory(event){
            setCategoryIndex(event.target.value)
        },
        submit(event){
            event.preventDefault();

            const formData = new FormData(event.target);


            console.log([...formData.entries()]);

            fetch("/api/products/new", {
                method: "POST",
                body: formData
            })
        }
    }

 return (
    <div>
        <h2 className="text-lg mb-golden-xl font-semibold text-center tracking-wide">Ny produkt</h2>
        <form className="flex flex-col border-2 border-border p-golden-lg gap-golden-md rounded-md [&>*]:flex [&>*]:flex-col" onSubmit={(event) => formHandler.submit(event)}>
            <div>
                <label htmlFor="product_name" className="font-medium">Produktnamn <span className="text-red-700">*</span></label>
                <input className="outline-1 outline-border rounded-sm px-golden-sm py-golden-xs" type="text" name="product_name" id="product_name" required/>
            </div>
            <div>
                <label htmlFor="description" className="font-medium">Beskrivning <span className="text-red-700">*</span></label>
                <textarea className="outline-1 outline-border rounded-sm px-golden-sm py-golden-xs" name="description" id="description" required></textarea>
            </div>
            <div>
                <label htmlFor="super-category" className="font-medium">Kategori</label>
                <select className="outline-1 outline-border rounded-sm px-golden-sm py-golden-xs" id="super-category" onChange={(event) => formHandler.superCategory(event)}>
                    <option value="0">Spel</option>
                    <option value="1">Konsoller</option>
                    <option value="2">PC</option>
                    <option value="3">TV, Ljud & Bild</option>
                    <option value="4">Hobby</option>
                </select>
            </div>
            <div>
                <label htmlFor="category" className="font-medium">Underkategori</label>
                <select className="outline-1 outline-border rounded-sm px-golden-sm py-golden-xs" name="category" id="category" required>
                    {subcategories[categoryIndex].map(category => (
                        <option key={category.value} value={category.value}>{category.value}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="brand" className="font-medium">Märke/Tillverkare <span className="text-red-700">*</span></label>
                <input className="outline-1 outline-border rounded-sm px-golden-sm py-golden-xs" type="text" name="brand" id="brand" required/>
            </div>
            <div>
                <label htmlFor="sku" className="font-medium">SKU <span className="text-red-700">*</span></label>
                <input className="outline-1 outline-border rounded-sm px-golden-sm py-golden-xs" type="text" name="sku" id="sku" pattern="[A-Za-z]{3}[0-9]{3}" maxLength="6" required/>
            </div>
            <div>
                <label htmlFor="price" className="font-medium">Pris <span className="text-red-700">*</span></label>
                <input className="outline-1 outline-border rounded-sm px-golden-sm py-golden-xs" type="number" name="price" id="price" required/>
            </div>
            <div>
                <label htmlFor="date" className="font-medium">Datum <span className="text-red-700">*</span></label>
                <input className="outline-1 outline-border rounded-sm px-golden-sm py-golden-xs" type="date" name="date" id="date" required/>
            </div>
            <div>
                <label htmlFor="image">
                    Produktbild
                </label>
                <input className="rounded-sm outline-1 outline-border file:bg-secondary file:text-white file:px-golden-sm file:py-golden-xs file:cursor-pointer file:tracking-wider" type="file" name="image" id="image" accept=".webp" required/>
                <p className= "opacity-75 font-light">.WEBP</p>
            </div>
            <button className="bg-primary text-white py-golden-md rounded-lg cursor-pointer hover:bg-primary-40l transition-all duration-100" type="submit">Lägg till</button>
        </form>
    </div>
 );
}
