import classes from "./ListProduct.module.css";
import Popup from "../popup/Popup";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../hook/useFetch";
import { api } from "../../api/api";
const ListProduct = (props) => {
  // state for popup
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.isOpen);
  const productPopup = useSelector((state) => state.product);

  const { data, loading, error } = useFetch(`${api}/products?max=8`);

  const togglePopup = (product, event) => {
    event.preventDefault();
    // not open
    if (!isOpen) {
      dispatch({ type: "SHOW_POPUP", product: product });
    }

    // close
    else {
      dispatch({ type: "HIDE_POPUP" });
    }
  };

  // chuyen string thanh so
  const convert = (price) => {
    return (price =
      typeof price === "string"
        ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : price);
  };

  return (
    <div className={classes.movies}>
      <p className={classes.title1}>MADE THE HARD WAY</p>
      <p className={classes.title2}>TOP TRENDING PRODUCTS</p>
      <ul className={classes.list}>
        {data?.map((product, index) => {
          return (
            <li key={index}>
              <img
                onClick={(event) => togglePopup(product, event)}
                src={product.img[0]}
              />
              <p className={classes.name}>{product.name}</p>
              <p className={classes.price}>{convert(product.price)} VND</p>
            </li>
          );
        })}
      </ul>
      {isOpen && (
        <Popup
          product={productPopup}
          handleClose={(event) => togglePopup(null, event)}
        />
      )}
    </div>
  );
};
export default ListProduct;
