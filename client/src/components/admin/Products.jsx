import { useEffect, useState } from "react";

export default function Products() {
   const [products, setProducts] = useState();

   function fetchProducts(){
      fetch("/api/products/admin")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => {
         console.error("An error occured")
      })
   }
   function deleteProduct(id){
      fetch("/api/products/admin/delete", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
          },
         body: JSON.stringify({id: id })
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.success){
              fetchProducts()
          }
          else{
              console.error(data.error)
          }
      })
      .catch((error) => { // Catch for no response
          console.error(error)
      })

   }
   
   useEffect(() => {
      fetchProducts();
   }, [])

   
 return (
   <div>
      <h2 className="text-lg mb-golden-xl font-semibold text-center tracking-wide">Produkter</h2>
      <table className="border-2 border-border p-golden-sm rounded-md [&_td]:py-golden-sm [&_td]:px-golden-md">
         <thead className="bg-primary text-white rounded-md font-semibold">
            <tr>
               <td>Kategori</td>
               <td>Produkt</td>
               <td>Pris</td>
               <td>SKU</td>
               <td></td>
            </tr>   
         </thead>
         <tbody className="">
            {products ? 
            products.map((product) => (
               <tr key={product.id} className="even:bg-gray-300">
                  <td>{product.category}</td>
                  <td>{product.brand} - {product.product_name}</td>
                  <td>{new Intl.NumberFormat("sv-SE", { useGrouping: true }).format(product.price)} kr</td>
                  <td>{product.sku}</td>
                  <td>
                     <button className="cursor-pointer" aria-label="Ta bort produkt" onClick={() => deleteProduct(product.id)}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"/></g></svg>
                     </button>
                     </td>
               </tr>
            ))
            : <p>Loading...</p>}
         </tbody>
      </table>
   </div>
 );
}
