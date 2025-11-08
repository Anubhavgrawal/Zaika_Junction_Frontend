import React, { useContext, useState } from "react";
import "./cart.css";
import { StoreContext } from "../../Context/storeContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("");

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Titles</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          // safe qty access with fallback 0
          const qty = cartItems?.[item._id] ?? 0;
          if (qty <= 0) return null;
          return (
            <React.Fragment key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={url + "/images/" + item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{qty}</p>
                <p>₹{item.price * qty}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal:</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Shipping:</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 30}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total:</p>
              <p>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 30}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here:</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter your code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
