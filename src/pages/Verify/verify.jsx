import React, { useContext } from "react";
import "./verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/storeContext";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const success = searchParams.get("success");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
