import { takeLatest } from 'redux-saga/effects';
import handleAuthSignUp, {
  handleAuthLogOut,
  handleAuthRefreshToken,
  handleAuthSignIn,
} from './auth-handlers';
import { logOut, refreshToken, signIn, signUp } from './auth-slice';

export default function* authSaga() {
  yield takeLatest(signUp.type, handleAuthSignUp);
  yield takeLatest(signIn.type, handleAuthSignIn);
  yield takeLatest(refreshToken.type, handleAuthRefreshToken);
  yield takeLatest(logOut.type, handleAuthLogOut);
}
