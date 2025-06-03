import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);
  //Clear cart when order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      console.log("checkout ordr", checkout);
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);
  const calculateEstimateDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white ">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8 ">
        Thankyou for your orser
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20 ">
            <div className="">
              <h2 className="text-xl font-semibold ">
                Order Id:{checkout._id}
              </h2>
              <p className="text-gray-500">
                Order Date:{new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* estimated delivery */}
            <div className="">
              {" "}
              <p className="text-emerald-700 text-sm ">
                Estimated Delivery{" "}
                {calculateEstimateDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Order Items */}
          <div className="mb-20 ">
            {checkout.checkoutItems?.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md marker:mr-4 "
                />
                <div className="">
                  <h4 className="text-md font-semibold"> {item.name}</h4>
                  <p className="text-sm text-gray-500 ">
                    {item.color}|{item.size}
                  </p>
                </div>
                <div className="ml-auto text-right ">
                  <p className="text-md ">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty:{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment and Delivery  */}
          <div className="grid grid-cols-2 gap-8 ">
            {/* payementingo */}
            <div className="">
              <h4 className="text-lg font-semibold mb-2 ">Payment</h4>
              <p className="text-gray-600 ">Paypal</p>
            </div>
            {/* Delivery */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{""}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
