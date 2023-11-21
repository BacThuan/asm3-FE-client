import classes from "./Filter.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Filter = () => {
  const [activeButton, setActiveButton] = useState("All");
  const dispatch = useDispatch();

  const setCategory = (event) => {
    event.preventDefault();
    setActiveButton(event.target.value);
    let category = event.target.value;
    dispatch({ type: "FILTER", category: category.toLowerCase() });
  };

  // auto set the category is all when redirect pag
  useEffect(() => {
    dispatch({ type: "FILTER", category: "all" });
  }, []);

  // create button
  const createButton = (value) => {
    return (
      <button
        className={activeButton === value ? classes.active : classes.btn}
        value={value}
        onClick={setCategory}
      >
        {value}
      </button>
    );
  };
  return (
    <div className={classes.container}>
      <div className={classes.title}>CATEGORIES</div>
      <div className={classes.title1}>
        <p>APPLE</p>
      </div>
      {createButton("All")}

      <div className={classes.title2}>
        <p>IPHONE & IMAC</p>
      </div>
      {createButton("IPhone")}
      <br></br>
      {createButton("Ipad")}
      <br></br>
      {createButton("Macbook")}

      <div className={classes.title2}>
        <p>WIRELESS</p>
      </div>
      {createButton("Airpod")}
      <br></br>
      {createButton("Watch")}

      <div className={classes.title2}>
        <p>OTHER</p>
      </div>
      {createButton("Mouse")}
      <br></br>
      {createButton("Keyboard")}
      <br></br>
      {createButton("Other")}
    </div>
  );
};
export default Filter;
