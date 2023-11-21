import classes from "./Checkout.module.css";
import Banner from "../../component/banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../component/hook/useFetch";
import { api } from "../../api/api";
// tinh tong tien
const countTotal = (products) => {
  let result = 0;
  for (let i = 0; i < products.length; ++i) {
    result += Number(products[i].count) * Number(products[i].product.price);
  }

  return result;
};

// chuyen string thanh so
const convert = (price) => {
  return (price =
    typeof price === "string"
      ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : price);
};

const Checkout = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useFetch(`${api}/carts?userId=${user._id}`);
  const [total, setTotal] = useState("");

  const [orderData, setOrderData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: "",
  });

  // tinh tong
  useEffect(() => {
    if (data) setTotal(convert(String(countTotal(data))));
  }, [data]);
  const handleChange = (e) => {
    setOrderData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const order = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${api}/orders`,
        { orderInfo: orderData, userId: user._id, total: total },
        { withCredentials: true }
      );
      if (res) navigate("/history");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Banner title={"Checkout"} />
      <div className={classes.container}>
        <form className={classes.details} onSubmit={order}>
          <div className={classes.title}>BILLING DETAILS</div>
          <div className={classes.input}>
            <div className={classes.alt}>FULL NAME: </div>
            <input
              id="name"
              placeholder="Enter Your Full Name Here!"
              defaultValue={user.name}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className={classes.input}>
            <div className={classes.alt}>EMAIL: </div>
            <input
              id="email"
              placeholder="Enter Your Email Here!"
              defaultValue={user.email}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className={classes.input}>
            <div className={classes.alt}>PHONE NUMBER: </div>
            <input
              id="phone"
              placeholder="Enter Your Phone Number Here!"
              defaultValue={user.phone}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className={classes.input}>
            <div className={classes.alt}>ADDRESS: </div>
            <input
              id="address"
              placeholder="Enter Your Address Here!"
              onChange={handleChange}
              required={true}
            />
          </div>

          <button type="submit">
            <div>Place Order</div>
          </button>
        </form>
        <div className={classes.order}>
          <div className={classes.title}>YOUR ORDER</div>
          <div className={classes.list}>
            {data?.map((product, index) => {
              return (
                <div key={index} className={classes.item}>
                  <div className={classes.name}>{product.product.name}</div>
                  <div className={classes.price}>
                    {convert(String(product.product.price))} VND x{" "}
                    {product.count}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.total}>
            <div>TOTAL</div>
            <p>{convert(String(total))} VND</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
