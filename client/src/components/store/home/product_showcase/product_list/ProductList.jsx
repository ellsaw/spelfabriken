import { useContext } from "react";
import { ProductContext } from "../ProductShowcaseContainer.jsx";
import {ProductListItem , ProductListItemSkeleton} from "./ProductListItem.jsx";


export default function ProductList({ listType }) {
   const productsObject = useContext(ProductContext)

   const products = productsObject[listType];

 return (
    <ul className="flex flex-col">
      {products ? 
      products.map((product) =>(
         <ProductListItem key={product.id} product={product.product_name} brand={product.brand} img={product.img} price={product.price} campaignPrice={product.campaign_price} slug={product.slug}/>
      ))
      :
      <>
         <ProductListItemSkeleton/>
         <ProductListItemSkeleton/>
         <ProductListItemSkeleton/>
         <ProductListItemSkeleton/>
         <ProductListItemSkeleton/>
      </>
      }
    </ul>
 );
}