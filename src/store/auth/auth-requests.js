import axios from "../../api/axios";

export const requestAuthSignUp = (data) => {
  console.log("requestAuthERegister ~~ ", data);
  return axios.post("/sign-up", { ...data });
};

export const requestAuthSignIn = (data) => {
  return axios.post("/sign-in", { ...data });
};

export const requestAuthFetchUser = (token) => {
  if (!token) {
    console.log("No token");
    return;
  }
  return axios.get("/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  return axios.post("/token", {
    "Content-Type": "application/json",
    refreshToken: token,
  });
};
