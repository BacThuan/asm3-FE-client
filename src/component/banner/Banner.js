import classes from "./Banner.module.css";

const BannerShop = (props) => {
  return (
    <div className={classes.banner}>
      <div className={classes.title1}>{props.title}</div>
      <div className={classes.title2}>{props.title}</div>
    </div>
  );
};
export default BannerShop;
