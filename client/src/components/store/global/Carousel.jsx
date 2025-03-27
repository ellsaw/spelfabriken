import {ProductCard, ProductCardSkeleton} from "./ProductCard.jsx";

export default function Carousel({products}) {
 return (
    <div className={`overflow-hidden ${products && "overflow-x-scroll"} relative scrollbar-thin scrollbar-thumb-primary scrollbar-track-white`}>
    <div className="flex gap-golden-xl relative w-fit py-golden-lg px-golden-lg *:w-72">
    {products ?
            products.map((product) => (
                <div key={product.id}>
                    <ProductCard product={product}/>
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
    </>
    }
    </div>
</div>
 );
}
