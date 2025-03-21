import { useLocation, Link } from "react-router";
import UseFetchProducts from "../../../hooks/UseFetchProducts";
import { useEffect } from "react";
import { ProductCard, ProductCardSkeleton } from "../global/ProductCard";


export default function SearchResults() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get("q")

    useEffect(() => {
        if(products) refetch();
        window.scrollTo(0, 0)
    }, [location])

    const { products, refetch } = UseFetchProducts(`/api/products/store/search/${query}`);

 return (
    <section className="min-h-screen">
      <div className="px-golden-lg pt-golden-md">
      {products &&
      <>
        {products.length > 0 ? 
        <>
             <h2 className="text-md font-bold">Visar resultat för {query}</h2>
             <p className="font-semibold">{products.length} {products.length === 1 ? "produkt" : "produkter"}</p>
        </>
         :
        <div className="flex flex-col items-center gap-golden-lg my-golden-xl">
            <h2 className="text-md font-semibold">Hittade inga resultat för {query}</h2>
            <Link className="bg-primary text-white px-golden-lg py-golden-md rounded-lg font-semibold hover:bg-primary-40l" to="/">Gå tillbaka till start</Link>
        </div>
        }
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
