import UseFetchProducts from "../../../../hooks/UseFetchProducts.jsx";
import Carousel from "../../global/Carousel.jsx";

export default function CampaignCarousel() {

    const { products } = UseFetchProducts("/api/products/store/campaign-carousel")


 return (
    <section className="mt-golden-xl">
        <h2 className="font-bold text-lg text-center">Kampanjer</h2>
        <Carousel products={products}/>
    </section>
 );
}
