import api from "../../api/axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setError, setIsAvailable, setLoading } from "../../redux-toolkit/features/CartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useFetchCartData() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.cartItems);
    const [products, setProducts] = useState([]);

    const ids = [...new Set(cartItems.map((e) => e.id))];
    const stringIds = ids.join(",")
    useEffect(() => {
        const fetchData = async () => {

            if (ids.length <= 0) {
                dispatch(setIsAvailable(false))
                return
            }

            try {
                dispatch(setLoading(true));
                const res = await api.get(`/cart/${stringIds}`);

                if (res.data.status === true) {
                    const parsedProducts = res.data.products.map((product) => ({
                        id: product.id,
                        title: product.title,
                        newPrice: Number(product.newPrice),
                        avail: JSON.parse(product.avail),
                        status: JSON.parse(product.status),
                        image0: product.color0image0,
                        image1: product.color1image0,
                        image2: product.color2image0,
                        image3: product.color3image0,
                    }));

                    setProducts(parsedProducts);
                    dispatch(setIsAvailable(true));
                } else {
                    dispatch(setIsAvailable(false));
                    dispatch(setData([]));
                }
            } catch (error) {
                dispatch(setError(true));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData()
    }, [stringIds])


    useEffect(() => {
        const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

        const mergedProducts = cartItems
            .map((cartItem) => {
                const product = productMap[cartItem.id];

                if (!product) return null;

                const images = [
                    product.image0,
                    product.image1,
                    product.image2,
                    product.image3,
                ];

                return {
                    id: product.id,
                    title: product.title,
                    newPrice: product.newPrice,
                    avail: product.avail,
                    status: product.status,
                    image: images[cartItem.colorIndex] || product.image0,
                    ...cartItem,
                };
            })
            .filter(Boolean);

        dispatch(setData(mergedProducts));
    }, [products, cartItems]);

    return { ids }
}