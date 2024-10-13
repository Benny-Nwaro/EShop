import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { getServer } from "../../utils";
import { message } from "antd";

const Payment = ({ cart, total }) => {
  const handleToken = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const context = { token, cart, total };

    try {
      const res = await axios.post(`${getServer()}/api/payment`, context, config);
      if (res.data.status === 200) {
        message.success("Payment completed");
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.error("Payment error:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51Q8lqE2LiFskzq6HElcUxomGEkWsaXW5zQaTsdDfFKG9KFAxE0I5wNRi5tvoex1pZ3yKe0QVvcuvmPF0mRuFruXl00Jl6oBOBr"
        token={handleToken}
        shippingAddress
        billingAddress
        amount={total * 100}
        name="Complete Transaction"
      />
    </div>
  );
};

export default Payment;
