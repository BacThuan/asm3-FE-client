import Banner from "../../component/banner/Banner";
import Filter from "../../component/filter-category/Filter";
import FilterList from "../../component/filter-category/FilterList";
import classes from "./ShopPage.module.css";
const ShopPage = () => {
  return (
    <div>
      <Banner title={"Shop"} />
      <div className={classes.filter}>
        <Filter />
        <FilterList />
      </div>
    </div>
  );
};
export default ShopPage;
