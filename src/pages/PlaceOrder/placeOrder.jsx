import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("cod");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    paymentMode: paymentMode,
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(e);
    setData((data) => ({ ...data, [name]: value }));
  };

  const initPayment = (data)=>{
    const option={
      key:"rzp_test_Ra3QNRBTZAWfmj",
      amount:data.amount,
      currency:data.currency,
      description:"test transection",
      order_id: data.id,
      handler:async (response)=>{
        try{
          const {data} = await axios.post(url + "/api/order/verify", response,{
          headers: { token },
          });
          console.log(data);
        }
        catch(error){
          console.log(error);
        }
      }
    }
    const rzp1 = new window.Razorpay(option);
    rzp1.open();
  }

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 30,
    };
    
    if(paymentMode === "cod"){
      let responseCod = await axios.post(url + "/api/order/place-order-cod", orderData,{
      headers: { token },
      });
      console.log("response of cod is" ,responseCod);
      toast.success("your order is placed!");

      setInterval (() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }
    else{
      try{
        let response = await axios.post(url + "/api/order/place-order", orderData, {
        headers: { token },
        });
        console.log("inside online payment",response);
        initPayment(response.data.data);
        
      }
      catch(error) {
        console.log("error inside place order online",error);
        
      }
      // let response = await axios.post(url + "/api/order/place-order", orderData, {
      // headers: { token },
      // });
      // console.log("inside online payment",response);
      // if (response.data.success) {
      // const { session_url } = response.data;
      // window.location.replace(session_url);
      // } else {
      //   alert("Order placement failed. Please try again.");
      // }
    }
    // let response = await axios.post(url + "api/order/place-order", orderData, {
    //   headers: { token },
    //   });
    // if (responseCod.data.success) {
    //   const { session_url } = responseCod.data;
    //   window.location.replace(session_url);
    // } else {
    //   alert("Order placement failed. Please try again.");
    // }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <ToastContainer />
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First-Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last-Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
        <div className="paymentMode">
          <div className="paymentMode-option">
            <input
              type="checkbox"
              name="isCashOnDelivery"
              id="isCashOnDelivery"
              checked={paymentMode === "cod"}
              onChange={() => setPaymentMode("cod")}
            />
            <label htmlFor="isCashOnDelivery">Cash on Delivery</label>
          </div>
          <div className="paymentMode-option">
            <input
              type="checkbox"
              name="isOnlinePayment"
              id="isOnlinePayment"
              checked={paymentMode === "online"}
              onChange={() => setPaymentMode("online")}
            />
            <label htmlFor="isOnlinePayment">Pay Online</label>
          </div>
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal:</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Shipping:</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total:</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
