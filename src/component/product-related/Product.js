import { Link } from "react-router-dom";
import classes from "./Product.module.css";

const Product = (props) => {
  const product = props.product;
  // chuyen string thanh so
  const convert = (price) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className={classes.container}>
      <Link to={`/shop/${product._id}`}>
        <img src={product.img[0]} />
      </Link>
      <p className={classes.name}>{product.name}</p>
      <p className={classes.price}>{convert(product.price)} VND</p>
    </div>
  );
};
export default Product;
