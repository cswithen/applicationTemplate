import axios from "axios";

const TOKEN = "token";

//ACTION TYPE
const SET_AUTH = "SET_AUTH";

//ACTION CREATOR
const setAuth = (auth) => ({ type: SET_AUTH, auth });

//THUNK
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (error) {
      return dispatch(setAuth({ error: error }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.pushState("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
