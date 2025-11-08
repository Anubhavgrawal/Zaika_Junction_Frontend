import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // const url = "http://localhost:3000";
  const url = "https://zaika-junction-backend-qj4z.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    // use functional update and guard if current state is null/undefined
    setCartItems((pre) => {
      const current = pre || {};
      return { ...current, [itemId]: (current[itemId] || 0) + 1 };
    });
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (e) {
        console.error("addToCart request failed", e);
      }
    }
  };
  
  const removeFromCart = async (itemId) => {
    setCartItems((pre) => {
      const current = pre || {};
      const newQty = Math.max((current[itemId] || 0) - 1, 0);
      if (newQty === 0) {
        // remove key when qty becomes 0
        const { [itemId]: _, ...rest } = current;
        return rest;
      }
      return { ...current, [itemId]: newQty };
    });
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (e) {
        console.error("removeFromCart request failed", e);
      }
    }
  };
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
  
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((food) => food._id === item);
        if (itemInfo && typeof itemInfo.price === "number") {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };
  
  const fetchFoodList = async () => {
    try{const response = await axios.get(url + "/api/food/list");
    // console.log(response.data.data);
    setFoodList(response.data.data);}
    catch (error){
      console.log("inside function",error);
    }
  };
  
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    // ensure cartItems is always an object
    setCartItems(response.data?.cartData || {});
  };
  
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
