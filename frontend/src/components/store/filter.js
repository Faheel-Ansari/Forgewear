import { useDispatch } from "react-redux";
import { setData, setIsAvailable, setLoading } from "../../redux-toolkit/features/StoreSlice";
import { useFetchData } from "./fetchData";
import { useEffect } from "react";

export function useFilter() {
    const { fetchData } = useFetchData()

    const filter = (reset = false, page, tab, perPage, filters, setActiveAvailableTab, setActiveSizeTab, setActiveSortTab, setFilterPrice) => {

        if (reset) {
            setActiveSizeTab(null);
            setActiveAvailableTab(null);
            setFilterPrice(0);
            setActiveSortTab(null);
            
            fetchData(tab, page, perPage)
            return;
        }
        
        fetchData(tab, page, perPage, filters)
    };

    return { filter }
}