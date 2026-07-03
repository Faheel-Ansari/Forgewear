import { useState } from "react";
import { useAddToCart } from "../cart/addToCart";



export function quantityControl(varientID = null) {
    const [quantity, setQuantity] = useState(1)
    const { updateCartQuantity, setCartQuantity } = useAddToCart();

    const increaseQuantity = () => {
        const newQty = quantity + 1

        if (varientID) updateCartQuantity({ varientID, quantity: newQty }) 

        setQuantity(newQty)
    }

    const decreaseQuantity = () => {
        if (quantity === 1) return

        const newQty = quantity - 1

        if (varientID) updateCartQuantity({ varientID, quantity: newQty })

        setQuantity(newQty)
    }

    return { quantity, setQuantity, increaseQuantity, decreaseQuantity }
}