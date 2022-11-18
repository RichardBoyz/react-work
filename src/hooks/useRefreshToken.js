import useAuth from "./useAuth";
import { refreshToken } from "../apis/api";
import Cookies from "universal-cookie";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const cookies = new Cookies();

  const refresh = async () => {
    const rt = cookies.get("jwt-refresh");
    const response = await refreshToken(rt);
    cookies.set("jwt-access", response.accessToken);
    cookies.set("jwt-refresh", response.refreshToken);
    setAuth((previousState) => {
      return {
        ...previousState,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        username: response.username,
      };
    });
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
