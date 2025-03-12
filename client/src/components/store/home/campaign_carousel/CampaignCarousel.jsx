import {ProductCard, ProductCardSkeleton} from "../../global/ProductCard.jsx";
import UseFetchProducts from "../../../../hooks/UseFetchProducts.jsx";

export default function CampaignCarousel() {

    const products = UseFetchProducts("/api/products/store/campaign-carousel")


 return (
    <section className="mt-golden-xl">
        <h2 className="font-bold text-lg text-center">Kampanjer</h2>
        <div className={`overflow-hidden ${products && "overflow-x-scroll"} relative scrollbar-thin scrollbar-thumb-primary scrollbar-track-white`}>
            <div className="flex gap-golden-xl relative w-fit py-golden-lg px-golden-lg">
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
