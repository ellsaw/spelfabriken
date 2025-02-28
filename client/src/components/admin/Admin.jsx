import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/admin/products');
    })
 return;
}
