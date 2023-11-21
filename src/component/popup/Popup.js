import classes from "./Popup.module.css";
import { Link } from "react-router-dom";
const Popup = (props) => {
  const product = props.product;

  // chuyen string thanh so
  const convert = (price) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className={classes.popup_box}>
      <div className={classes.box}>
        <div className={classes.close_icon} onClick={props.handleClose}>
          <p>x</p>
        </div>
        <div className={classes.content}>
          <img src={product.img[0]} />
          <div className={classes.info}>
            <p className={classes.name}>{product.name}</p>
            <p className={classes.price}>{convert(product.price)} VND</p>
            <div className={classes.des}>{product.short_desc}</div>
            <Link to={`/shop/${product._id}`} className={classes.btn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              View Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Popup;
