import { useEffect, useState } from "react";
import formatPrice from "../../../utils/formatPrice.js";

export default function CampaignTableRow({
  id,
  product,
  brand,
  category,
  campaignPrice,
  price,
  fetchProducts,
}) {

    const [campaignValue, setCampaignValue] = useState(campaignPrice || null)
    
     useEffect(() => {
        if(!campaignValue && campaignPrice) updateCampaign();
    }, [campaignValue]) 
    
  function updateCampaign(event){
    if(event) event.preventDefault();

    fetch("/api/products/admin/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, campaignPrice: campaignValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchProducts();
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        // Catch for no response
        console.error(error);
      });
  }

  return (
    <tr className="even:bg-neutral-200">
      <td>{category}</td>
      <td>
        {brand} - {product}
      </td>
      <td>
        {formatPrice(price)} kr
      </td>
      <td>
        <form
          className="flex justify-between items-center"
        >
          <div>
            <input
              className="px-golden-xs outline-none"
              type="number"
              value={campaignValue || ""}
              placeholder="Ange kampanjpris"
              onChange={(event) => {setCampaignValue(event.target.value)}}
              onBlur={(event) => updateCampaign(event)}
            />
          </div>
          <button
          type="reset"
          className={`bg-red-700 hover:bg-red-900 text-white px-golden-md py-golden-xs rounded-sm cursor-pointer ${!campaignValue && "invisible" }`} aria-label="Ta bort kampanj"
          onClick={() => setCampaignValue(null)}
          >
            
            Ta bort
          </button>
        </form>
      </td>
    </tr>
  );
}
