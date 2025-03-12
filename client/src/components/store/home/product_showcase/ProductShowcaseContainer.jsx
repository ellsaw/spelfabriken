import { createContext} from "react";
import UseWindowWidth from "../../../../hooks/useWindowWidth.jsx";
import { ProductShowcase, ProductShowcaseMobile } from "./ProductShowcase.jsx";
import UseFetchProducts from "../../../../hooks/UseFetchProducts.jsx";

export const ProductContext = createContext(null);

export default function ProductShowcaseContainer() {
    const windowWidth = UseWindowWidth()

    const products = {
        bestsellers: UseFetchProducts("/api/products/store/product-showcase/bestsellers"),
        recent: UseFetchProducts("/api/products/store/product-showcase/recent")
    }


 return (
    <ProductContext.Provider value={products}>
        {windowWidth >= 768 ? 
            <ProductShowcase/>
        :
            <ProductShowcaseMobile/>
    }
    </ProductContext.Provider>
 );
}
