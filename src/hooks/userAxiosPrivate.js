import { useEffect } from "react";
import { axioPrivate } from "../apis/api";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosProvide = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = axioPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          // console.log(auth.accessToken);
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axioPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 403 ||
            error?.response?.status === 401) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const newTokens = await refresh();
          // console.log(newTokens);
          prevRequest.headers["Authorization"] = `Bearer ${newTokens}`;

          return axioPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axioPrivate.interceptors.request.eject(requestIntercept);
      axioPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axioPrivate;
};

export default useAxiosProvide;
