import UseFetchProducts from "../../../hooks/UseFetchProducts";
import formatPrice from "../../../utils/formatPrice";
import { Link } from "react-router";
import { useCart } from "./CartContext";

export default function CartItem({ id, quantity }) {
  const { products: product } = UseFetchProducts(
    `/api/products/store/cart/${id}`
  );
  const { cart, dispatch } = useCart();

  return (
    <li className="border-b-[1px] border-border last-of-type:border-none">
      {product ? (
        <article className="flex flex-col py-golden-lg">
          <div className="flex items-start justify-between">
            <div className="flex gap-golden-md flex-1">
              <div className="aspect-video w-12 shrink-0">
                <Link className="size-full" to={`/produkt/${product.slug}`}>
                  <img
                    className="size-full object-contain"
                    src={product.img}
                    alt=""
                  />
                </Link>
              </div>
              <div className="flex-1">
                <h4 className="font-medium hover:underline line-clamp-1">
                  <Link to={`/produkt/${product.slug}`}>
                    {product.product_name}
                  </Link>
                </h4>
                <p className="text-neutral-500 -mt-2">{product.brand}</p>
              </div>
            </div>
            <div className="flex flex-col gap-golden-md">
              <p
                className={`text-right font-semibold ${
                  product.campaign_price && "text-red-600"
                }`}
              >
                {formatPrice(product.campaign_price || product.price)} kr
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-golden-lg mt-golden-sm">
            <div className="flex *: rounded-lg w-24">
              <button
                className="flex-1 bg-border hover:bg-neutral-600 text-white rounded-l-lg font-bold cursor-pointer"
                aria-label="Minska antal produkter"
                onClick={() =>
                  dispatch({
                    type: quantity === 1 ? "REMOVE_FROM_CART" : "DECREMENT",
                    payload: {
                      id: product.id,
                      price: product.price,
                      campaignPrice: product.campaign_price || null,
                    },
                  })
                }
              >
                <svg
                  className="m-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1rem"
                  height="1rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2"
                  />
                </svg>
              </button>
              <p className="flex-2 text-center">{quantity}</p>
              <button
                className="flex-1 bg-border hover:bg-neutral-600 text-white rounded-r-lg font-bold cursor-pointer"
                aria-label="Öka antal produkter"
                onClick={() =>
                  dispatch({
                    type: "INCREMENT",
                    payload: {
                      id: product.id,
                      price: product.price,
                      campaignPrice: product.campaign_price || null,
                    },
                  })
                }
              >
                <svg
                  className="m-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1rem"
                  height="1rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
                  />
                </svg>
              </button>
            </div>
            <button
              className="size-6 rounded-full bg-border hover:bg-red-600 font-bold text-white cursor-pointer"
              aria-label="Ta bort från varukorgen"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: {
                    id: product.id,
                    price: product.price,
                    campaignPrice: product.campaign_price || null,
                  },
                })
              }
            >
              <svg
                className="m-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
                />
              </svg>
            </button>
          </div>
        </article>
      ) : (
        ""
      )}
    </li>
  );
}
