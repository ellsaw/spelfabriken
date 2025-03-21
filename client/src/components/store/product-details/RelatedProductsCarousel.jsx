import UseFetchProducts from "../../../hooks/UseFetchProducts.jsx";
import Carousel from "../global/Carousel.jsx";

export default function RelatedProductsCarousel( {productId} ) {

    const { products } = UseFetchProducts(`/api/products/store/related-products/${productId}`)
    
 return (
    <section>
        <h2 className="font-bold text-md text-center mt-golden-xl">Liknande produkter</h2>
        <Carousel products={products}/>
    </section>
 );
}
