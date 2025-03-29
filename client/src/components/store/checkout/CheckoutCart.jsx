import CartItem from "../cart/CartItem";
import { useCart } from "../cart/CartContext";
import formatPrice from "../../../utils/formatPrice";

export default function CheckoutCart() {
  const { cart } = useCart()
  
  return (
    <section>
      <h2 className="font-semibold text-md mb-golden-md">Varukorg</h2>
      <ul className="border-[1px] border-border px-golden-lg py-golden-md flex flex-col rounded-md">
        {cart.items.map((item) => (
          <CartItem key={item.id} id={item.id} quantity={item.quantity} />
        ))}
      </ul>
      <div className="*:flex *:justify-between mt-golden-md px-golden-lg">
        <p className="">Rabatt: <span>{cart.rebate < 0 ? `- ${formatPrice(Math.abs(cart.rebate))}` : 0} kr</span></p>
        <p className="font-semibold">Totalsumma inkl. moms: <span>{formatPrice(cart.sum)} kr</span></p>
      </div>
    </section>
  );
}
