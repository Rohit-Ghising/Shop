import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
const cartProducts = [
  {
    productsId: 1,
    name: "shorts",
    size: "m",
    color: "Red",
    quantity: 1,
    price: 15,
    image: "https://picsum.photos/200?random=1",
  },
  {
    productsId: 2,
    name: "jeans",
    size: "m",
    color: "Blue",
    quantity: 1,
    price: 15,
    image: "https://picsum.photos/200?random=2",
  },
];

const CartContent = () => {
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded "
            />
            {/* ___________------------------------------------------- */}
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size:{product.size} | color:{product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                {/* jjc */}
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>${product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
