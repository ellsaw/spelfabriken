export default function formatPrice(price){
    return new Intl.NumberFormat("sv-SE", { useGrouping: true }).format(price);
}