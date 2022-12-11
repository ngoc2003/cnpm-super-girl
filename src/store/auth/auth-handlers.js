import { call, put } from "redux-saga/effects";
import { logOut, saveToken } from "../../utils/auth";
import {
  requestAuthFetchUser,
  requestAuthRefreshToken,
  requestAuthSignIn,
  requestAuthSignUp,
} from "./auth-requests";
import { updateUser } from "./auth-slice";
import { toast } from "react-toastify";
export default function* handleAuthSignUp(action) {
  const { payload } = action;
  try {
    const response = yield call(requestAuthSignUp, payload);
    if (response.status === 201) {
      toast.success("Sign UP Successfully", {
        pauseOnHover: false,
        autoClose: 1500,
      });
      // setTimeout(() => {
      //   window.location.replace("/");
      // }, 2000);
    }
  } catch (err) {
    if (err.response.status === 409) {
      toast.error("Your email has already existed!", {
        pauseOnHover: false,
        autoClose: 1500,
      });
    }
  }
}

function* handleAuthSignIn(action) {
  try {
    const response = yield call(requestAuthSignIn, action.payload);
    if (response.data.accessToken && response.data.refreshToken) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchUser, { payload: response.data.accessToken });
      toast.success("Sign In Successfully!", {
        pauseOnHover: false,
        autoClose: 1500,
      });
      setTimeout( () => {
        window.location.replace("/")
      },2000)
    }
  } catch (err) {
    toast.error("Please check your account!", {
      pauseOnHover: false,
      autoClose: 1500,
    });
  }
}

function* handleAuthFetchUser({ payload }) {
  try {
    const response = yield call(requestAuthFetchUser, payload);
    console.log("Response ~~", response);
    if (response.status === 200) {
      yield put(
        updateUser({
          user: response.data,
          accessToken: payload,
        })
      );
    }
    // response.data
  } catch (err) {
    console.log(err);
  }
}

function* handleAuthRefreshToken({ payload }) {
  try {
    const response = yield call(requestAuthRefreshToken, payload);
    if (response && response.data) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchUser, { payload: response.data.accessToken });
    } else {
      yield handleAuthLogOut();
    }
  } catch (err) {
    console.log(err);
  }
}

function* handleAuthLogOut() {
  yield put(
    updateUser({
      user: undefined,
      accessToken: null,
    })
  );
  logOut();
  // setTimeout( () => {
  //   window.location.replace("/")
  // },0)
}
export { handleAuthSignIn, handleAuthRefreshToken, handleAuthLogOut };
