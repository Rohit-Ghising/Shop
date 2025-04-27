import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: "",
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);
  const catogories = ["Top wear", "Buttom wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Biege",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyster",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders = ["men", "women"];
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      brand: params.size || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.size.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 1000]);
  }, [searchParams]);
  return (
    <div className="p-4 ">
      <h3 className="text-xl  font-medium text-gray-800 mb-4"> Filter</h3>
      {/* Category filter */}
      <div className="mb-6 ">
        <label htmlFor="" className="block to-gray-600  font-medium mb-2 ">
          Category
          {catogories.map((category) => (
            <div key={category} className=" flex items-center mb-1 ">
              <input
                type="radio"
                name="category"
                className=" mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />{" "}
              <span className="text-gray-700">{category}</span>
            </div>
          ))}
        </label>
      </div>
      {/* Gender Section */}
      <div className="mb-6 ">
        <label htmlFor="" className="block to-gray-600  font-medium mb-2 ">
          Gender
          {genders.map((gender) => (
            <div key={gender} className=" flex items-center mb-1 ">
              <input
                type="radio"
                name="gender"
                className=" mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />{" "}
              <span className="text-gray-700">{gender}</span>
            </div>
          ))}
        </label>
      </div>
      {/* Color section */}
      <div className="mb-6 ">
        <label htmlFor="" className="block to-gray-600  font-medium mb-2 ">
          {" "}
          Color
        </label>
        <div className="flex flex-wrap gap-2 ">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105"
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>
      {/* Size filter */}
      <div className="mb-6 ">
        {" "}
        <label htmlFor="" className="block text-gray-600 font-medium mb-2 ">
          Size
        </label>
        {sizes.map((size) => (
          <div key={size} className=" flex items-center mb-1 ">
            <input
              type="checkbox"
              name="size"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300
            "
            />
            <span className="to-gray-700 ">{size}</span>
          </div>
        ))}
      </div>
      {/* MAterialfilter */}
      <div className="mb-6 ">
        {" "}
        <label htmlFor="" className="block text-gray-600 font-medium mb-2 ">
          Size
        </label>
        {materials.map((material) => (
          <div key={material} className=" flex items-center mb-1 ">
            <input
              type="checkbox"
              name="material"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300
            "
            />
            <span className="to-gray-700 ">{material}</span>
          </div>
        ))}
      </div>
      {/* Brand filter */}
      <div className="mb-6 ">
        {" "}
        <label htmlFor="" className="block text-gray-600 font-medium mb-2 ">
          Size
        </label>
        {brands.map((brand) => (
          <div key={brand} className=" flex items-center mb-1 ">
            <input
              type="checkbox"
              name="brand"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300
            "
            />
            <span className="to-gray-700 ">{brand}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSideBar;
