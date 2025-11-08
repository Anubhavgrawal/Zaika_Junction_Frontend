import React, { useContext, useState, useEffect } from "react";
import "./myOrders.css";
import { StoreContext } from "../../Context/storeContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      // "/api/v1/orders/getOrders"
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      // ensure we always set an array
      setData(response.data?.data || []);
    } catch (err) {
      console.error("fetchOrders failed", err);
      setData([]); // fallback
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {(data || []).map((order, index) => {
          const items = order?.items || [];
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="item" />
              {console.log(order)}
              <p>
                {items.map((item, i) => {
                  if (i === items.length - 1) {
                    return item.name + " x" + item.quantity;
                  } else {
                    return item.name + " x" + item.quantity + ", ";
                  }
                })}
              </p>
              <p>₹{order?.amount ?? 0}</p>
              <p>Items: {items.length} </p>
              <p>
                <span>&#x25cf;</span>
                <b>{order?.status ?? "unknown"}</b>{" "}
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
