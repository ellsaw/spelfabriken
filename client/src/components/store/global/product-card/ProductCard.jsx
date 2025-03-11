import { Link } from "react-router";
import formatPrice from "../../../../utils/formatPrice.js";

export default function ProductCard({ product, brand, img, price, campaignPrice, slug }) {

 return (
   <Link className="" to={`/products/${slug}`}>
    <article className="h-64 w-72 flex flex-col gap-golden-md py-golden-md px-golden-sm hover:[&_.title]:text-primary">
         <div className="h-2/3">
            <img className="object-contain size-full" src={img} alt={product} />
         </div>
         <div className="flex flex-col justify-between gap-golden-lg">
            <p className="title leading-5 font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">{product}</p>
            <div className="flex justify-between">
               <div>
               {campaignPrice ? 
                  <>
                  <p className="font-light line-through leading-1.5 text-neutral-500">{formatPrice(price)} kr</p>
                  <p className="font-bold text-red-600 text-xl">{formatPrice(campaignPrice)} kr</p>
                  </>
                  : 
                  <p>{formatPrice(price)}</p>
                  }
               </div>
            <button className="size-9 p-golden-sm bg-green-600 text-white rounded-sm cursor-pointer hover:bg-green-700">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 18C17.5304 18 18.0391 18.2107 18.4142 18.5858C18.7893 18.9609 19 19.4696 19 20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22C16.4696 22 15.9609 21.7893 15.5858 21.4142C15.2107 21.0391 15 20.5304 15 20C15 18.89 15.89 18 17 18ZM1 2H4.27L5.21 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63L7.17 14.75C7.17 14.8163 7.19634 14.8799 7.24322 14.9268C7.29011 14.9737 7.3537 15 7.42 15H19V17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2ZM7 18C7.53043 18 8.03914 18.2107 8.41421 18.5858C8.78929 18.9609 9 19.4696 9 20C9 20.5304 8.78929 21.0391 8.41421 21.4142C8.03914 21.7893 7.53043 22 7 22C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20C5 18.89 5.89 18 7 18ZM16 11L18.78 6H6.14L8.5 11H16Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            </div>
         </div>
    </article>
    </Link>
 );
}
