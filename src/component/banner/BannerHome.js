import classes from "./BannerHome.module.css";
import banner from "../../image/banner1.jpg";

const BannerHome = () => {
  return (
    <div>
      <img className={classes.img} src={banner}></img>
      <div className={classes.title}>NEW INSPIRATION 2020</div>
      <div className={classes.des}>20% OFF ON NEW SEASON</div>
      <button className={classes.btn}>Browse collections</button>
    </div>
  );
};
export default BannerHome;
