import { useCookies } from "react-cookie";

export const useAuthCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const saveToken = (token: string) => {
    setCookie("token", token, { path: "/", maxAge: 3600 });
  };

  const removeToken = () => {
    removeCookie("token", { path: "/" });
  };

  return { cookies, saveToken, removeToken };
};
