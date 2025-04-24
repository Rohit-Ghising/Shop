import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const NewArrivals = () => {
  const newArrivals = [
    {
      _id: "1",
      name: "Stylish jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=1",
          altText: "Stylish jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylish jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=2",
          altText: "Stylish jacket",
        },
      ],
    },
    {
      _id: "3",
      name: "Stylish jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=3",
          altText: "Stylish jacket",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylish jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Stylish jacket",
        },
      ],
    },
    {
      _id: "5",
      name: "Stylish jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=5",
          altText: "Stylish jacket",
        },
      ],
    },
    {
      _id: "6",
      name: "Stylish jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=6",
          altText: "Stylish jacket",
        },
      ],
    },
    {
      _id: "7",
      name: "Stylish jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=7",
          altText: "Stylish jacket",
        },
      ],
    },
    {
      _id: "8",
      name: "Stylish jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=8",
          altText: "Stylish jacket",
        },
      ],
    },
  ];
  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg to-gray-600 mb-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        {/* Scroll  buttom*/}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button className="p-2 rounded border bg-white to-black">
            <FiChevronLeft className="text-2xl " />
          </button>
          <button className="p-2 rounded border bg-white to-black">
            <FiChevronRight className="text-2xl " />
          </button>
        </div>
      </div>
      {/* contenmt scroll */}
      <div className="container mx-auto overflow-x-auto flex space-x-6 relative">
        {newArrivals.map((product) => (
          <div className="" key={product._id}>
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
