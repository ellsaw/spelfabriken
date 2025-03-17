import { useNavigate, useParams } from "react-router";
import UseFetchProducts from "../../../hooks/UseFetchProducts";
import { ProductCard, ProductCardSkeleton } from "../global/ProductCard";

export default function Category() {
   const navigate = useNavigate();

  const { category } = useParams();

  const { products } = UseFetchProducts(`/api/products/store/category/${category}`)

  if(products === "Invalid Category"){
   navigate('/')
  }

  return (
    <section className="min-h-screen">
      <div className="px-golden-lg pt-golden-md">
      {products &&
      <>
         <h2 className="text-lg font-bold">{category === "spel" || category === "konsoller" || category === "pc" || category === "tv-ljud-and-bild" || category === "hobby" ? products[0].supercategory : products[0].category}</h2>
         <p className="font-semibold mt-golden-md">{products.length} produkter</p>
      </>
         }
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 *:px-golden-lg *:py-golden-xl *:border-b-[1px] *:border-border last:border-none">
         {products ? 
            products.map((product) => (
               <div key={product.id}>
                  <ProductCard product={product.product_name} brand={product.brand} img={product.img} price={product.price} campaignPrice={product.campaign_price} slug={product.slug} small={true}/>
               </div>
            ))
         :
         <>
         <div>
            <ProductCardSkeleton/>
         </div>
         <div>
            <ProductCardSkeleton/>
         </div>
         <div>
            <ProductCardSkeleton/>
         </div>
         <div>
            <ProductCardSkeleton/>
         </div>
         <div>
            <ProductCardSkeleton/>
         </div>
         <div>
            <ProductCardSkeleton/>
         </div>       
         <div>
            <ProductCardSkeleton/>
         </div>       
         <div>
            <ProductCardSkeleton/>
         </div>       
         <div>
            <ProductCardSkeleton/>
         </div>       
         <div>
            <ProductCardSkeleton/>
         </div>       
         <div>
            <ProductCardSkeleton/>
         </div>       
         <div>
            <ProductCardSkeleton/>
         </div>       
         </>
         }
      </div>
    </section>
  );
}
