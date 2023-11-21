import classes from "./DetailOrder.module.css";
import { useParams } from "react-router-dom";
import useFetch from "../../component/hook/useFetch";
import Table from "react-bootstrap/Table";
import React from "react";
import { api } from "../../api/api";
// chuyen string thanh so
const convert = (price) => {
  return (price =
    typeof price === "string"
      ? price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : price);
};

// page
const DetailOrder = () => {
  const id = useParams();
  const { data, loading, error } = useFetch(
    `${api}/orders/detail?orderId=${id.idOrder}`
  );

  return (
    <React.Fragment>
      {data && (
        <div className={classes.container}>
          <h1>INFORMATION ORDER</h1>
          <p>ID User: {data.order.idUser}</p>
          <p>Full Name: {data.order.orderInfo.name}</p>
          <p>Phone: {data.order.orderInfo.phone}</p>
          <p>Address: {data.order.orderInfo.address}</p>
          <p>Total: {data.order.total} VND</p>

          <Table striped size="sm">
            <thead>
              <tr>
                <th>ID PRODUCT</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              {data.products?.map((product, index) => {
                return (
                  <tr className={classes.tr}>
                    <td>{product.product._id}</td>
                    <td>
                      <img
                        className={classes.img}
                        src={product.product.img[0]}
                      />
                    </td>
                    <td>{product.product.name}</td>
                    <td>{convert(product.product.price)} VND</td>
                    <td>{product.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailOrder;
