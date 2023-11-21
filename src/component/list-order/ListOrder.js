import classes from "./ListOrder.module.css";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import OrderItem from "./OrderItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hook/useFetch";
import axios from "axios";
import { api } from "../../api/api";
const ListOrder = () => {
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useFetch(`${api}/orders?userId=${user._id}`);

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Table striped size="sm">
          <thead>
            <tr>
              <th>ID ORDER</th>
              <th>ID USER</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>TOTAL</th>
              <th>DELIVERY</th>
              <th>STATUS</th>
              <th>DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order, index) => {
              return <OrderItem order={order} key={order._id} />;
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default ListOrder;
