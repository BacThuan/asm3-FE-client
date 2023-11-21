import classes from "./Category.module.css";
import product1 from "../../image/product_1.png";
import product2 from "../../image/product_2.png";
import product3 from "../../image/product_3.png";
import product4 from "../../image/product_4.png";
import product5 from "../../image/product_5.png";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <span>CAREFULLY CREATED COLLECTIONS</span>
        <p>BROWSE OUR CATEGORY</p>
      </div>

      <div className={classes.img}>
        <Link to="/shop" className={classes.link}>
          <img className={classes.p1} src={product1}></img>
        </Link>

        <Link to="/shop" className={classes.link}>
          <img className={classes.p1} src={product2}></img>
        </Link>
        <div className={classes.r2}>
          <Link to="/shop" className={classes.link}>
            <img className={classes.p2} src={product3}></img>
          </Link>

          <Link to="/shop" className={classes.link}>
            <img className={classes.p2} src={product4}></img>
          </Link>

          <Link to="/shop" className={classes.link}>
            <img className={classes.p2} src={product5}></img>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Category;
