import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const handleClickOutside = (e) => {
    //cloe side bar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };
  useEffect(() => {
    //Addd event listner
    document.addEventListener("mousedown", handleClickOutside);
    // clean event listnereturn
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=1" }],
        },
        {
          _id: 2,
          name: "Product 1",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=2" }],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=3" }],
        },
        {
          _id: 4,
          name: "Product 4",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=4" }],
        },

        {
          _id: 5,
          name: "Product 1",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=5" }],
        },
        {
          _id: 6,
          name: "Product 1",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=6" }],
        },
        {
          _id: 7,
          name: "Product 3",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=7" }],
        },
        {
          _id: 8,
          name: "Product 4",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=8" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Mobile filter button */}
      <button
        onClick={toggleSideBar}
        className=" lg:hidden border p-2 flex justify-center items-center "
      >
        {" "}
        hello
        <FaFilter className="mr-2" />
      </button>
      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50  left-0 w-64 bg-white  overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>
      <div className="flex-grow p-4 ">
        <h2 className=" text-2xl up mb-4">All Collections</h2>
        {/* Sort Options */}
        <SortOptions />
        {/* Product Drid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
