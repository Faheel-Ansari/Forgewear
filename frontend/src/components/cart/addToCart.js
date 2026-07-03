import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setCartCount, setCartItems } from "../../redux-toolkit/features/CartSlice";


export function useAddToCart() {
    const dispatch = useDispatch()

    const cartItems = useSelector(state => state.cart?.cartItems)
    const cartCount = useSelector(state => state.cart?.cartCount)

    const [cartID, setCartID] = useState(null)
    const [cartSize, setCartSize] = useState(null)
    const [cartColor, setCartColor] = useState(null)
    const [cartColorIndex, setCartColorIndex] = useState(0)

    useEffect(() => {
        dispatch(setCartCount(cartItems?.length))
    }, [cartItems])

    const setExpiry = () => {
        const expiryTime = Date.now() + (30 * 60 * 1000);

        localStorage.setItem('cartExpiry', expiryTime)
    }

    const addToCart = (quantity) => {
        if (cartID === null || cartSize === null || cartColor === null) return true

        const newItem = { id: cartID, varientID: `${cartID}-${cartSize}-${cartColor}`, size: cartSize, color: cartColor, colorIndex: cartColorIndex, quantity }

        const existingItemIndex = cartItems?.findIndex((e) => e.varientID === newItem.varientID)

        let updated;

        if (existingItemIndex > -1) {
            updated = cartItems.map((item, idx) => (idx === existingItemIndex ? { ...item, quantity: item.quantity + cartQuantity } : item))
        } else {
            updated = [...cartItems, newItem]
        }

        localStorage.setItem('cart', JSON.stringify(updated))
        setExpiry()

        dispatch(setCartItems(updated))

        toast.success('Item added to Cart')
        setCartID(null)
        setCartSize(null)
        setCartColor(null)
        setCartColorIndex(0)
    }

    const updateCartQuantity = (updatedItem) => {
        const updated = cartItems.map(item => item.varientID === updatedItem.varientID ? { ...item, quantity: updatedItem.quantity } : item)

        localStorage.setItem('cart', JSON.stringify(updated))
        setExpiry()

        dispatch(setCartItems(updated))
    }

    const deleteCartItem = (varientID) => {
        const updatedProducts = cartItems.filter((item) => (item.varientID !== varientID))

        localStorage.setItem('cart', JSON.stringify(updatedProducts))

        if (updatedProducts.length > 0) {
            setExpiry()
        } else {
            localStorage.removeItem('cartExpiry')
        }

        dispatch(setCartItems(updatedProducts))
    }

    const autoDeleteCart = () => {
        const updatedCart = []

        localStorage.setItem('cart', JSON.stringify(updatedCart))
        localStorage.removeItem('cartExpiry')

        dispatch(setCartItems(updatedCart))
    }

    const clearEntireCart = autoDeleteCart

    useEffect(() => {
        const expiry = localStorage.getItem('cartExpiry')

        if (!expiry) return

        const remainingTime = Number(expiry) - Date.now()

        if (remainingTime <= 0) {
            autoDeleteCart()
            return
        }

        const deleteTimer = setTimeout(autoDeleteCart, remainingTime);

        return () => clearTimeout(deleteTimer)
    }, [cartItems])

    return { cartItems, addToCart, cartID, setCartID, cartSize, setCartSize, cartColor, setCartColor, cartColorIndex, setCartColorIndex, cartCount, updateCartQuantity, deleteCartItem, clearEntireCart }
}