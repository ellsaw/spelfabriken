import { Link } from "react-router";
import formatPrice from "../../../../../utils/formatPrice.js";

function ProductListItem({ product, brand, img, price, campaignPrice, slug }) {
 return (
    <li className="h-24 border-b-2 border-border first-of-type:border-t-2 hover:[&_.title]:text-primary">
        <Link to={`produkt/${slug}`}>
        <article className="size-full flex items-center justify-between gap-golden-2xl px-golden-lg py-golden-sm">
            <div className="h-full flex gap-golden-md items-center">
                <div className="w-16 h-full shrink-0">
                    <img className="object-contain size-full" src={img} alt={product} />
                </div>
                <div>
                    <h3 className="title line-clamp-2 overflow-ellipsis font-medium leading-4">{product}</h3>
                    <p className="text-neutral-500 leading-6">{brand}</p>
                </div>
            </div>
            <div className="text-right">
                {campaignPrice ?
                <>
                    <p className="text-nowrap font-light line-through text-neutral-500 leading-1.5">{formatPrice(price)} kr</p>
                    <p className="text-nowrap font-bold text-red-600 text-xl">{formatPrice(campaignPrice)} kr</p>
                </>
                 :
                <p className="text-nowrap font-medium">{formatPrice(price)} kr</p>
                }
            </div>
        </article>
        </Link>
    </li>
 );
}


function ProductListItemSkeleton() {
    return (
       <li className="h-24 border-b-2 border-border first-of-type:border-t-2">
           <div className="size-full flex items-center justify-between gap-golden-2xl px-golden-lg py-golden-sm *:animate-pulse">
               <div className="h-full flex gap-golden-md items-center">
                   <div className="w-16 h-full shrink-0 bg-neutral-300 rounded-sm">
                   </div>
                   <div>
                       <div className="bg-neutral-300 h-4 w-64 mb-golden-sm rounded-sm"></div>
                       <div className="bg-neutral-300 h-4 w-14 rounded-sm"></div>
                   </div>
               </div>
               <div className="bg-neutral-300 h-4 w-14 rounded-sm">
               </div>
           </div>
       </li>
    );
}
   

export {ProductListItem, ProductListItemSkeleton};