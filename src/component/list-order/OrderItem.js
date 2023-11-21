import classes from "./OrderItem.module.css";
import { Link } from "react-router-dom";

// arrow
const arrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="15"
    width="15"
    viewBox="0 0 448 512"
  >
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

// chuyen string thanh so
const convert = (price) => {
  return (price =
    typeof price === "string"
      ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : price);
};

const OrderItem = (props) => {
  const order = props.order;
  return (
    <tr className={classes.tr}>
      <td>{order._id}</td>
      <td>{order.idUser}</td>
      <td>{order.orderInfo.name}</td>
      <td>{order.orderInfo.phone}</td>
      <td>{order.orderInfo.address}</td>
      <td>{convert(order.total)} VND</td>
      <td>{order.delivery}</td>
      <td>{order.status}</td>
      <td>
        <div className={classes.button}>
          <Link to={`/history/${order._id}`}>View</Link>
          {arrowRight}
        </div>
      </td>
    </tr>
  );
};
export default OrderItem;
