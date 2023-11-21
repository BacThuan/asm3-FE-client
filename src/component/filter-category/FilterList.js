import classes from "./FilterList.module.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Product from "../product-related/Product";
import useFetch from "../hook/useFetch";
import { api } from "../../api/api";
const FilterList = () => {
  let category = useSelector((state) => state.category);

  const [page, setPage] = useState(1);
  const { data, loading, error, reFetch } = useFetch(
    `${api}/products?page=${page}&category=${category}`
  );

  const changePage = (option) => {
    if (option === "-") setPage((pre) => pre - 1);
    else setPage((pre) => pre + 1);
  };

  useEffect(() => {
    reFetch();
  }, [category, page]);
  return (
    <React.Fragment>
      {data && (
        <div className={classes.container}>
          <div className={classes.search}>
            <input
              className={classes.input}
              type="text"
              placeholder="Enter Search Here!"
            />
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Default sorting
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <ul className={classes.list}>
            {loading && "Loading page ..."}
            {data?.length === 0 && "No more product!"}
            {!loading &&
              data?.map((product, index) => {
                return (
                  <li key={index}>
                    <Product product={product} />
                  </li>
                );
              })}
          </ul>
          <div className={classes.page}>
            <Pagination>
              {page > 1 && <Pagination.Prev onClick={() => changePage("-")} />}
              <Pagination.Item>{page}</Pagination.Item>
              {data.length !== 0 && (
                <Pagination.Next onClick={() => changePage("+")} />
              )}
            </Pagination>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default FilterList;
