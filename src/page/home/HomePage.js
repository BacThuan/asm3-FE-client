import BannerHome from "../../component/banner/BannerHome";
import Category from "../../component/category/Category";
import ListProduct from "../../component/list-product/ListProduct";
import Subscribe from "../../component/subscribe/Subscribe";
import classes from "./HomePage.module.css";
const HomePage = () => {
  return (
    <div>
      <BannerHome />
      <Category />
      <ListProduct />
      <Subscribe />
    </div>
  );
};
export default HomePage;
