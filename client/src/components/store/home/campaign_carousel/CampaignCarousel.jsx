import { useEffect, useState } from "react";
import ProductCard from "../../global/product-card/ProductCard.jsx";
import ProductCardSkeleton from "../../global/product-card/ProductCardSkeleton.jsx";

export default function CampaignCarousel() {

    const [products, setProducts] = useState();


    function fetchProducts(){
         fetch("/api/products/store/campaign-carousel")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch(() => {
           console.error("An error occured")
        })
     }

    useEffect(() => {
        fetchProducts();
    }, [])

 return (
    <section className="mt-golden-xl">
        <h2 className="font-bold text-lg text-center">Kampanjer</h2>
        <div className={`overflow-hidden ${products && "overflow-x-scroll"} relative scrollbar-thin scrollbar-thumb-primary scrollbar-track-white`}>
            <div className="flex gap-golden-xl relative w-fit py-golden-lg">
            {products ?
                    products.map((product) => (
                        <ProductCard key={product.id} product={product.product_name} brand={product.brand} img={product.img} price={product.price} campaignPrice={product.campaign_price} slug={product.slug}/>
                    ))
            : 
            <>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
            </>
            }
            </div>
        </div>
    </section>
 );
}
