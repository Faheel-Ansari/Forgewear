import { useSelector } from "react-redux";
import { useFetchData } from "./fetchData";

export function usePagination(tab, page, perPage, filters) {
    const { fetchData } = useFetchData()
    const paginationData = useSelector((state) => state.store.paginationData);

    const handlePageChange = (targetPageNo) => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        fetchData(tab, page, perPage, filters, targetPageNo );
    };

    return { handlePageChange, paginationData }
}