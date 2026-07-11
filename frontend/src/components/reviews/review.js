import { useDispatch } from "react-redux";
import api from "../../api/axios";
import { setError, setIsAvailable, setLoading, setReviews, setReviewsCount } from "../../redux-toolkit/features/ReviewSlice";


export function useReview() {
    const dispatch = useDispatch()

    const fetchAllReviews = async () => {
        try {
            dispatch(setError(false));
            dispatch(setLoading(false));

            const res = await api.get(`/review/home`);
            
            if (res.data.status === true) {
                dispatch(setIsAvailable(true));
                dispatch(setReviews(res.data.reviews));
                dispatch(setReviewsCount(res.data.reviewCount));
            } else {
                dispatch(setIsAvailable(false));
            }
        } catch (error) {
            dispatch(setError(true));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const fetchDetailReviews = async (id) => {
        try {
            dispatch(setError(false));
            dispatch(setLoading(false));

            const res = await api.get(`/review/detail/${id}`);
            console.log(res);
            
            if (res.data.status === true) {
                dispatch(setIsAvailable(true));
                dispatch(setReviews(res.data.reviews));
                dispatch(setReviewsCount(res.data.reviewCount));
            } else {
                dispatch(setIsAvailable(false));
            }
        } catch (error) {
            dispatch(setError(true));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { fetchAllReviews, fetchDetailReviews }
}