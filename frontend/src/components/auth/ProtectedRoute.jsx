import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setRole,
  setUser,
} from "../../redux-toolkit/features/AuthSlice";
import Loading from "../loading/Loading";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const verifyUser = async () => {
    dispatch(setLoading(true));
    try {
      // getCSRF();
      const res = await api.get("/user/verify");
      if (res.data.status === true) {
        dispatch(setError(false));
        dispatch(setRole(res.data.user.role));
        dispatch(
          setUser({
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            photo: res.data.user.photo,
          }),
        );
      }
    } catch (error) {
      toast.error("Please Login to continue!");
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  if (error) return <Navigate to={"/login"} replace />;
  return children;
}

export default ProtectedRoute;
