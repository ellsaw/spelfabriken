import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import formatPrice from "../../../utils/formatPrice";
import Description from "./Description.jsx";
import RelatedProductsCarousel from "./RelatedProductsCarousel.jsx";

export default function ProductDetails() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [ product, setProduct ] = useState(null);

    useEffect(() => {
        fetch(`/api/products/store/product-details/${slug}`)
        .then((respose) => (respose.json()))
        .then((data) => {
            if(data.product){
                setProduct(data.product)
            }else if(data.error === "Not found"){
                navigate("/")
            }
        })
    }, [navigate])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [product])

 return (
    <>
     {product &&
        <article className="px-golden-lg py-golden-md">
            <div>     
                <div className="text-primary text-sm font-bold [&_a]:hover:underline leading-8 align-baseline">
                    <Link to={`/kategori/${product.supercategory_slug}`}>{product.supercategory}</Link>
                    <span className="text-black"> / </span>
                    <Link to={`/kategori/${product.category_slug}`}>{product.category}</Link>
                </div>       
                <h2 className="font-bold text-md leading-6">{product.product_name}</h2>
                <p className="leading-6 text-neutral-500 font-medium">{product.brand}</p>
            </div>
            <div className="mt-golden-md">
                <div className="aspect-video w-full">
                    <img className="object-contain size-full" src={product.img} alt="" />
                </div>
                <div className="mt-golden-lg flex flex-col gap-golden-md">
                    <p className="text-lg text-center font-semibold">{formatPrice(product.price)} kr</p>
                    <button className="text-white bg-primary hover:bg-primary-40l py-golden-md w-full rounded-md font-semibold">Lägg till i varukorg</button>
                </div>
            </div>
            <Description key={`${product.id} description`} description={product.description} product_name={product.product_name}/>
            <RelatedProductsCarousel key={`${product.id} carousel`} productId={product.id}/>
        </article>
    }
    </>
 );
}