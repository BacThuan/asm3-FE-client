import { useSelector, useDispatch } from "react-redux";
import ListOrder from "../../component/list-order/ListOrder";
import { Link } from "react-router-dom";
import Banner from "../../component/banner/Banner";

import classes from "./History.module.css";

const History = () => {
  // check login
  const isLogin = useSelector((state) => state.isLogin);

  return (
    <div className={classes.container}>
      <Banner title={"History"} />
      {!isLogin && (
        <div className={classes.link}>
          <Link to={"/auth"}>
            Bạn chưa đăng nhập! Nhấn vào đây để đăng nhập!
          </Link>
        </div>
      )}
      {isLogin && (
        <div className={classes.order}>
          <ListOrder />
        </div>
      )}
    </div>
  );
};

export default History;
