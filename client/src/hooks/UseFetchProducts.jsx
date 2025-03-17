import { useState, useEffect } from "react";

export default function UseFetchProducts(url) {
  const [products, setProducts] = useState();

  function fetchProducts() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => {
        console.error("An error occured");
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {products, refetch: fetchProducts};
}
