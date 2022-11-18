import { logout } from "../apis/api";
import useAuth from "./useAuth";
import Cookies from "universal-cookie";

const useLogout = () => {
  const cookies = new Cookies();
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await logout();
      cookies.remove("jwt-access", { path: "/" });
      cookies.remove("jwt-refresh", { path: "/" });
    } catch (error) {
      console.log("BBQ");
    }
  };

  return logout;
};

export default useLogout;
