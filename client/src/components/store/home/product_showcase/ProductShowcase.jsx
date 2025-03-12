import { useState } from "react";
import ProductList from "./product_list/ProductList.jsx";

function ProductShowcase() {
  return (
    <section className="mt-golden-xl">
      <div className="flex font-bold mb-golden-lg">
        <h2 className="flex-1 text-center">
          Bästsäljare
        </h2>
        <h2 className="flex-1 text-center">
          Nya Produkter
        </h2>
      </div>
      <div className="flex *:flex-1 gap-golden-xl">
        <section>
          <ProductList listType="bestsellers" />
        </section>
        <section>
          <ProductList listType="recent" />
        </section>
      </div>
    </section>
  );
}

function ProductShowcaseMobile() {
  const [listType, setListType] = useState("bestsellers");

  function buttonHandler(change) {
    if (change != listType) {
      setListType(change);
    }
  }

  return (
    <section className="mt-golden-xl">
      <div className="flex justify-evenly font-bold mb-golden-lg *:cursor-pointer">
        <button
          className={
            listType != "bestsellers" ? "text-gray-500 font-normal" : ""
          }
          onClick={() => buttonHandler("bestsellers")}
        >
          Bästsäljare
        </button>
        <button
          className={listType != "recent" ? "text-gray-500 font-normal" : ""}
          onClick={() => buttonHandler("recent")}
        >
          Nya Produkter
        </button>
      </div>
      <section>
        <ProductList listType={listType} />
      </section>
    </section>
  );
}

export { ProductShowcase, ProductShowcaseMobile };
