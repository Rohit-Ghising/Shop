import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {" "}
      {/* Left section */}
      <div className="bg-white rounded-lg p-6 ">
        <h2 className=" text-2xl uppercase mb-6">Checkout</h2>
        <form action="">
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
        </form>
      </div>
    </div>
  );
};

export default Checkout;
