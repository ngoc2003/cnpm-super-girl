import Cookies from "js-cookie";
import { toast } from "react-toastify";

const accessTokenKey = "super_girl_access_token";
const refreshTokenKey = "super_girl_refesh_token";
const objCookies = {
  expires: 30, // 30days
  domain: process.env.COOKIE_DOMAIN,
};

export const saveToken = (access_token, refresh_token) => {
  if (access_token && refresh_token) {
    Cookies.set(accessTokenKey, access_token, { ...objCookies });
    Cookies.set(refreshTokenKey, refresh_token, { ...objCookies });
  } else {
    Cookies.remove(accessTokenKey, {
      ...objCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
    Cookies.remove(refreshTokenKey, {
      ...objCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
  }
};

export const getToken = () => {
  const access_token = Cookies.get(accessTokenKey);
  const refresh_token = Cookies.get(refreshTokenKey);
  console.log(access_token, refresh_token)
  return {
    access_token,
    refresh_token,
  };
};

export const logOut = () => {
  const access_token = Cookies.get(accessTokenKey);
  if (access_token) {
    Cookies.remove(accessTokenKey, {
      ...objCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
    Cookies.remove(refreshTokenKey, {
      ...objCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
    window.location.reload();
  }
};