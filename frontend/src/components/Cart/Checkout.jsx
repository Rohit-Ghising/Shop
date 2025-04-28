import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PaypalButton";
const cart = {
  products: [
    {
      name: "Srykish jacket",
      size: "M",
      color: "White",
      price: "120",
      image: "https://picsum.photos/500/500?random=1",
    },
    {
      name: "Srykish jacket",
      size: "M",
      color: "Black",
      price: "120",
      image: "https://picsum.photos/500/500?random=2",
    },
  ],
  totalPrice: 240,
};

const Checkout = () => {
  const navigate = useNavigate();
  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const handlePaymentSucess = (details) => {
    console.log("paymen", details);
    navigate("/order-confirmation");
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {" "}
      {/* Left section */}
      <div className="bg-white rounded-lg p-6 ">
        <h2 className=" text-2xl uppercase mb-6">Checkout</h2>
        <form action="" onSubmit={handleCreateCheckout}>
          {" "}
          <h3 className="text-lg mb-4 ">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value="user@exaple.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4 ">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 ">First Name:</label>
              <input
                type="text"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstname: e.target.value,
                  })
                }
                value={shippingAddress.firstname}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {/* Lastname */}
            <div>
              <label className="block text-gray-700 ">Last Name:</label>
              <input
                type="text"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastname: e.target.value,
                  })
                }
                value={shippingAddress.lastname}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          {/* ------- */}
          <div className="mb-4 ">
            {" "}
            <label className="block text-gray-700 ">Address</label>
            <input
              required
              className="w-full p-2 border rounded"
              type=" text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
            />
          </div>
          {/* ---------------------------------- */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 ">City:</label>
              <input
                type="text"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                value={shippingAddress.city}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {/* --- */}
            <div>
              <label className="block text-gray-700 ">Postal Code:</label>
              <input
                type="text"
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                value={shippingAddress.postalCode}
                className="w-full p-2 border rounded"
                required
              />{" "}
            </div>
          </div>
          {/* ---------------------------- */}
          <div className="mb-4 ">
            {" "}
            <label className="block text-gray-700 ">Country:</label>
            <input
              required
              className="w-full p-2 border rounded"
              type=" text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
            />
          </div>
          {/* ------------------------ */}
          <div className="mb-4 ">
            {" "}
            <label className="block text-gray-700 ">Phone:</label>
            <input
              required
              className="w-full p-2 border rounded"
              type=" text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className=" mt-6 ">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded "
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4 ">Pay With Paypal</h3>
                {/* paypalbutton */}
                <PayPalButton
                  amount={100}
                  onSucess={handlePaymentSucess}
                  onError={(err) => alert("paymnet fsiled.try again")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className=" bg-gray-50 p-6  rounded-lg">
        <h3 className="text-lg mb-4 ">Order Summary</h3>
        <div className="border-t mb-4 py-4 ">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b "
            >
              <div className="flex items-start ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h2-40 object-cover  mr-4 
                 "
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500 ">Size:{product.size}</p>
                  <p className="text-gray-500 ">Color:{product.color}</p>
                </div>
              </div>
              <p className="text-xl ">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4 ">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg ">
          <p>Shipping </p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4 ">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
