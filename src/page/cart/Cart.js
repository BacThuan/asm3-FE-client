import classes from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../../component/banner/Banner";
import ListCart from "../../component/list-cart/ListCart";
import { Link } from "react-router-dom";
const Cart = () => {
  // check login
  const isLogin = useSelector((state) => state.isLogin);

  return (
    <div className={classes.container}>
      <Banner title={"Cart"} />
      {!isLogin && (
        <div className={classes.link}>
          <Link to={"/auth"}>
            Bạn chưa đăng nhập! Nhấn vào đây để đăng nhập!
          </Link>
        </div>
      )}
      {isLogin && (
        <div className={classes.cart}>
          <ListCart />
        </div>
      )}
    </div>
  );
};
export default Cart;
