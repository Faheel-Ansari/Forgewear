import { useDispatch } from "react-redux";
import api from "../../../api/axios";
import { setData, setError, setIsAvailable, setLoading, setPaginationData } from "../../../redux-toolkit/features/StoreSlice";

export function useFetchData() {
    const dispatch = useDispatch()

    const fetchData = async (category, stockType, perPage, searchQuery = '', pageNo = 1) => {

        if (!stockType || !category) return;

        dispatch(setError(false));
        dispatch(setLoading(true));

        const query = stockType === "search" ? `/admin/${category}/${stockType}?query=${searchQuery}&perPage=${perPage}&page=${pageNo}` : `/admin/${category}/${stockType}?perPage=${perPage}&page=${pageNo}`

        try {
            const res = await api.get(query);
            
            if (res.data.status === false) {
                
                dispatch(setIsAvailable(false));
                dispatch(setData([]));
                dispatch(setPaginationData([]));

            } else {

                const parsedProducts = res.data.products.map((product) => ({
                    ...product,
                    avail: JSON.parse(product.avail),
                    status: JSON.parse(product.status),
                    isNew: JSON.parse(product.isNew),
                    tags: JSON.parse(product.tags),
                    sizes: JSON.parse(product.sizes),
                    newPrice: Number(product.newPrice),
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