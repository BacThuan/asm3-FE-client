import classes from "./CartItem.module.css";
import { useState, useEffect } from "react";

// decrement button
const left = (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 256 512">
    <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
  </svg>
);

// increment button
const right = (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 256 512">
    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
  </svg>
);

const trash = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="15"
    width="15"
    viewBox="0 0 448 512"
  >
    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
  </svg>
);

// chuyen string thanh so
const convert = (price) => {
  return (price =
    typeof price === "string"
      ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : price);
};

// tinh tong tien
const countTotal = (price, quantity) => {
  const toNumber = Number(price);
  const quan = Number(quantity);
  const total = toNumber * quan;
  return total;
};

const CartItem = (props) => {
  const product = props.product;
  const [value, setValue] = useState(props.quantity);
  const [total, setTotal] = useState(countTotal(product.price, value));

  const handleIncrement = (e) => {
    setValue((value) => value + 1);
    setTotal(countTotal(product.price, value + 1));
    props.update(product._id, value + 1);
  };

  const handleDecrement = (e) => {
    if (value > 1) {
      setValue((value) => value - 1);
      setTotal(countTotal(product.price, value - 1));
      props.update(product._id, value - 1);
    }
  };

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  const deleteItem = () => {
    props.delete(product._id);
  };

  return (
    <tr className={classes.tr}>
      <td>
        <img src={product.img[0]} />
      </td>
      <td className={classes.name}>{product.name}</td>
      <td className={classes.price}>{convert(product.price)} VND</td>
      <td>
        <button className={classes.handle} onClick={handleDecrement}>
          {left}
        </button>
        <input
          className={classes.input}
          type="number"
          min={1}
          value={value}
          onChange={handleChange}
        />

        <button className={classes.handle} onClick={handleIncrement}>
          {right}
        </button>
      </td>
      <td className={classes.price}>{convert(String(total))} VND</td>
      <td className={classes.trash} onClick={deleteItem}>
        {trash}
      </td>
    </tr>
  );
};
export default CartItem;
