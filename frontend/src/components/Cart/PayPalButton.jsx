import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSucess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AW0AsxvwDrZlIWVp54Wdi4B9GMNGS9gGUFvyqS-b4xvNYnh1K9RVDWbiy1ZRQOKmYSeUCo6sWelRCLKb",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSucess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
