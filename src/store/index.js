import { createStore } from "redux";
import Cookies from "js-cookie";

const reducer = (
  state = {
    isOpen: false,
    product: null,
    category: "all",
    isLogin: false,
    user: null,
  },
  action
) => {
  if (action.type === "SHOW_POPUP") {
    return {
      ...state,
      isOpen: true,
      product: action.product,
    };
  }

  if (action.type === "HIDE_POPUP") {
    return {
      ...state,
      isOpen: false,
      product: null,
    };
  }

  if (action.type === "FILTER") {
    return {
      ...state,
      category: action.category,
    };
  }

  if (action.type === "LOGIN") {
    localStorage.setItem("user", JSON.stringify(action.user));
    return {
      ...state,
      isLogin: true,
      user: JSON.parse(localStorage.getItem("user")),
    };
  }
  if (action.type === "STILL_LOGIN") {
    return {
      ...state,
      isLogin: true,
      user: JSON.parse(localStorage.getItem("user")),
    };
  }
  if (action.type === "LOGOUT") {
    localStorage.removeItem("user");

    return {
      ...state,
      isLogin: false,
      user: null,
    };
  }

  return state;
};

const store = createStore(reducer);
export default store;
