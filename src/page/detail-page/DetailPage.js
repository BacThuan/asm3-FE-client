import classes from "./DetailPage.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Product from "../../component/product-related/Product";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../component/hook/useFetch";
import axios from "axios";
import React from "react";
import { api } from "../../api/api";
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
// chuyen string thanh so
const convert = (price) => {
  return (price =
    typeof price === "string"
      ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : price);
};
// chinh lai long desc
const longDesc = (string) => {
  let value = [];
  const check = typeof string;
  if (check === "string") {
    if (string.includes("•")) {
      value = string.split("•");
    } else if (string.includes("-")) {
      value = string.split(/-(?!\w+)/);
    }
  }
  return value;
};
// bo di phan tu dau tien
const sliceFirst = (arr) => {
  return arr.slice(1);
};

// page
const DetailPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [value, setValue] = useState(1);

  const id = useParams();

  // check login
  const isLogin = useSelector((state) => state.isLogin);

  const { data, loading, error, reFetch } = useFetch(
    `${api}/products/details?id=${id.idProduct}`
  );

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    if (value > 1) setValue((prevValue) => prevValue - 1);
  };

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  useEffect(() => {
    reFetch();
  }, [id]);
  // submit
  const addToCart = async () => {
    if (isLogin) {
      const data = {
        productId: id.idProduct,
        userId: user._id,
        count: value,
      };
      try {
        let res = await axios.post(`${api}/carts/add`, data, {
          withCredentials: true,
        });
        if (res) navigate("/cart");
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/auth");
    }
  };

  return (
    <React.Fragment>
      {data?.product && (
        <div className={classes.container}>
          {/** intro for product */}
          <div className={classes.intro}>
            <div className={classes.img}>
              <div className={classes.normal}>
                {data.product.img?.map((img, index) => {
                  return <img key={index} src={img} />;
                })}
              </div>
              <img className={classes.primary} src={data.product.img[0]} />
            </div>

            <div className={classes.infor}>
              <p className={classes.name}>{data.product.name}</p>
              <p className={classes.price}>{convert(data.product.price)} VND</p>
              <p className={classes.des}>{data.product.short_desc}</p>

              <p>
                CATEGORY:{" "}
                <span className={classes.des}>{data.product.category}</span>
              </p>

              <div className={classes.form}>
                <span>QUANTITY </span>
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

                <button onClick={addToCart} className={classes.submit}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {/** product description*/}
          <div className={classes.description}>
            <p className={classes.title}>DESCRIPTION</p>

            <p className={classes.title1}>PRODUCT DESCRIPTION</p>

            <p className={classes.title2}>
              {longDesc(data.product.long_desc)[0]}:{" "}
            </p>

            <ul>
              {sliceFirst(longDesc(data.product.long_desc)).map(
                (des, index) => {
                  return (
                    <li key={index}>
                      <p>{des}</p>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          {/** related product */}
          <div className={classes.related}>
            <p className={classes.title1}>RELATED PRODUCT</p>
            <ul>
              {data.related.map((product, index) => {
                return (
                  <li key={index}>
                    <Product product={product} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailPage;
