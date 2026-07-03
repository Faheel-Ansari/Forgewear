import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { setData, setError, setIsAvailable, setLoading, setPaginationData } from "../../redux-toolkit/features/StoreSlice";

export function useFetchData() {
    const dispatch = useDispatch()

    const fetchData = async (tab, pageName, perPage, filters, pageNo = 1) => {

        dispatch(setLoading(true));
        dispatch(setError(false));
        try {
            const res = await api.get(`/${tab}/${pageName}?filters=${JSON.stringify(filters)}&perPage=${perPage}&page=${pageNo}`);
            
            if (res.data.status === false) {
                dispatch(setIsAvailable(false));
                dispatch(setData([]));
            } else {
                const parsedProducts = res.data.products.map((product) => ({
                    ...product,
                    tags: JSON.parse(product.tags),
                    sizes: JSON.parse(product.sizes),
                    colors: JSON.parse(product.colors),
                    oldPrice:
                        JSON.parse(product.oldPrice) === null
                            ? null
                            : Number(product.oldPrice),
                    newPrice: Number(product.newPrice),
                    isNew: JSON.parse(product.isNew),
                    avail: JSON.parse(product.avail),
                }));

                dispatch(setIsAvailable(true));
                dispatch(setData(parsedProducts));

                dispatch(setPaginationData(res.data.pagination));
            }
        } catch (error) {
            dispatch(setError(true));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { fetchData }
}