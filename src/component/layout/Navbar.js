import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../api/api";
const userIcon = (
  <div className={classes.icon}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 512 512"
    >
      <path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z" />
    </svg>
  </div>
);

const triangle = (
  <div className={classes.icon}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 320 512"
    >
      <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
    </svg>
  </div>
);

const cartIcon = (
  <div className={classes.icon}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 640 512"
    >
      <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64H48c8.8 0 16 7.2 16 16V368c0 44.2 35.8 80 80 80h18.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H450.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H144c-8.8 0-16-7.2-16-16V80C128 35.8 92.2 0 48 0H32zM192 80V272c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H464V176c0 5.9-3.2 11.3-8.5 14.1s-11.5 2.5-16.4-.8L400 163.2l-39.1 26.1c-4.9 3.3-11.2 3.6-16.4 .8s-8.5-8.2-8.5-14.1V32H240c-26.5 0-48 21.5-48 48z" />
    </svg>
  </div>
);

const historyIcon = (
  <div className={classes.icon}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 512 512"
    >
      <path d="M248 0h16c13.3 0 24 10.7 24 24V34.7C368.4 48.1 431.9 111.6 445.3 192H448c17.7 0 32 14.3 32 32s-14.3 32-32 32H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h2.7C80.1 111.6 143.6 48.1 224 34.7V24c0-13.3 10.7-24 24-24zM64 288h64V416h40V288h64V416h48V288h64V416h40V288h64V420.3c.6 .3 1.2 .7 1.7 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512H32c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1V288z" />
    </svg>
  </div>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin);
  const userLogin = useSelector((state) => state.user);

  const [name, setName] = useState("");

  const logout = async () => {
    try {
      await axios.post(api + "/logout", { withCredentials: true });
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const login = () => {
    // chua dang nhap
    if (!isLogin)
      return (
        <NavLink
          to="/auth"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          {userIcon}
          <p>Login</p>
        </NavLink>
      );
    // dang nhap
    else {
      return (
        <div className={classes.login}>
          {userIcon}
          <p>{name}</p>
          {triangle}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            onClick={logout}
          >
            ( Logout )
          </NavLink>
        </div>
      );
    }
  };

  useEffect(() => {
    if (isLogin) {
      setName(userLogin.name);
    }
  }, [isLogin]);

  return (
    <nav className="navbar navbar-default">
      <div className={classes.container}>
        <div className={classes.left}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            // tat active cua trang mac
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Shop
          </NavLink>
        </div>

        <div className={classes.title}>
          <div>BOUTIQUE</div>
        </div>

        <div className={classes.right}>
          <div className={classes.icon_container}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              {cartIcon}
              <p>Cart</p>
            </NavLink>
          </div>

          <div className={classes.icon_container}>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              {historyIcon}
              <p>History</p>
            </NavLink>
          </div>

          <div className={classes.icon_container}>{login()}</div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
