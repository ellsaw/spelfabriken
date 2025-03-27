import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useCart } from "../cart/CartContext.jsx";
import formatPrice from "../../../utils/formatPrice";
import Description from "./Description.jsx";
import RelatedProductsCarousel from "./RelatedProductsCarousel.jsx";

export default function ProductDetails() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [ product, setProduct ] = useState(null);
    const { cart, dispatch } = useCart()

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
     {product ?
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
            <div className="mt-golden-md flex gap-golden-lg flex-col sm:flex-row">
                <div className="aspect-video w-full h-fit sm:flex-5">
                    <img className="object-contain size-full" src={product.img} alt="" />
                </div>
                <div className="flex flex-col gap-golden-md w-full sm:flex-3">
                    <div className="h-full flex justify-center items-center">
                    {product.campaign_price ?
                        <div className="mb-golden-md text-center">
                            <p className="font-light line-through text-neutral-500">{formatPrice(product.price)} kr</p>
                            <p className="font-bold leading-4 text-red-600 text-lg md:text-5xl md:leading-12">{formatPrice(product.campaign_price)} kr</p>
                        </div>
                        :
                        <p className="text-lg text-center font-semibold md:text-5xl md:leading-12">{formatPrice(product.price)} kr</p>
                    }
                    </div>
                    <div>
                        <p className="text-green-600 font-bold leading-6">{(Math.floor(Math.random() * 49)) + 1} i lager</p>
                        <p className="font-light leading-4">Förväntad leveranstid: <span className="font-medium">2-4 arbetsdagar</span></p>
                    </div>
                    {(cart.items.some(item => item.id === product.id)) ?
                    <p className="text-white bg-green-800 py-golden-md w-full rounded-md font-semibold mt-golden-md text-center">Tillagd i varukorgen</p>
                    :
                    <button className="text-white bg-primary hover:bg-primary-40l py-golden-md w-full rounded-md font-semibold cursor-pointer mt-golden-md" onClick={() => dispatch({ type: "ADD_TO_CART", payload: {id: product.id, price: product.price, campaignPrice: product.campaign_price || null}})}>Lägg i varukorgen</button>
                    }
                    <div className="flex text-center font-semibold">
                        <div className="flex-1"><p><span className="text-green-600">✓</span> Fri frakt</p></div>
                        <div className="flex-1"><p><span className="text-green-600">✓</span> Fria returer</p></div>
                    </div>
                </div>
            </div>
            <Description key={`${product.id} description`} description={product.description} product_name={product.product_name}/>
            <RelatedProductsCarousel key={`${product.id} carousel`} productId={product.id}/>
        </article>
    :
        <div className="flex flex-col px-golden-lg py-golden-lg *:animate-pulse">
            <div className="flex flex-col gap-golden-sm">     
                <div className="bg-neutral-300 h-3.5 w-48 rounded-md"></div>       
                <div className="bg-neutral-300 h-6 w-75 rounded-md mt-golden-lg"></div>
                <div className="bg-neutral-300 h-4 w-14 rounded-md"></div>
            </div>
            <div className="flex flex-col mt-golden-lg w-full sm:flex-row sm:gap-golden-lg items-end">
                <div className="aspect-video w-full bg-neutral-300 rounded-md sm:flex-5"></div>
                <div className="mt-golden-lg flex flex-col gap-golden-md sm:flex-3">
                    <div className="bg-neutral-300 h-10 w-24 md:w-46 mx-auto rounded-md md:mb-golden-3xl"></div>
                    <div>
                        <div className="bg-neutral-300 h-4 w-18 rounded-md"></div>
                        <div className="bg-neutral-300 h-4 w-72 rounded-md mt-golden-sm"></div>
                    </div>
                    <div className="bg-neutral-300 py-golden-md h-12 w-full rounded-md font-semibold"></div>
                    <div className="flex text-center font-semibold">
                        <div className="flex-1"><div className="bg-neutral-300 h-4 w-18 rounded-md mx-auto"></div></div>
                        <div className="flex-1"><div className="bg-neutral-300 h-4 w-18 rounded-md mx-auto"></div></div>
                    </div>
                </div>
            </div>
            <div className="mt-golden-xl">
                <div className="bg-neutral-300 h-4 w-24 rounded-md">

                </div>
                <div className="bg-neutral-300 h-24 w-full rounded-md mt-golden-lg">

                </div>
            </div>
        </div>
    }
    </>
 );
}