// import React, { useState, useEffect } from "react";
// import Hero from "../components/Layout/Hero";
// import GenderCollectionSection from "../components/Products/GenderCollectionSection";
// import NewArrivals from "../components/Products/NewArrivals";
// import ProductDetails from "../components/Products/ProductDetails";
// import ProductGrid from "../components/Products/ProductGrid";
// import FeaturedCollection from "../components/Products/FeaturedCollection";
// import { FeaturesSection } from "../components/Products/FeaturesSection";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsByFilters } from "../redux/slices/productSlice";
// import axios from "axios";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);
//   const [bestSellerProduct, setBestSellerProduct] = useState(null);
//   useEffect(() => {
//     //Fetch products for a specific collection
//     dispatch(
//       fetchProductsByFilters({
//         gender: "women",
//         category: "Bottom Wear",
//         limit: "8",
//       })
//     );
//     //Fetch Best seller product
//     const fetchBestSeller = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
//         );
//         setBestSellerProduct(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBestSeller();
//   }, [dispatch]);

//   return (
//     <div>
//       <Hero />
//       <GenderCollectionSection />
//       <NewArrivals />

//       <h2 className="text-3xl text-center font-bold mb-4 gap-6">
//         {" "}
//         Best Seller
//       </h2>
//       <ProductDetails />
//       <div className="container mx-auto ">
//         <h2 className="text-3xl text-center font-bold  mb-4">
//           {" "}
//           {bestSellerProduct ? (
//             <ProductDetails productId={bestSellerProduct._id} />
//           ) : (
//             <p className="text-center ">Loading best seller</p>
//           )}
//           Top Wears For Womens!
//           <ProductGrid products={products} loading={loading} error={error} />
//         </h2>
//       </div>
//       <FeaturedCollection />
//       <FeaturesSection />
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import { FeaturesSection } from "../components/Products/FeaturesSection";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for "Women" Bottom Wear
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // Fetch the best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        console.log("API response:", response.data);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch best seller:", error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);
  console.log("Best Seller Product:", bestSellerProduct);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      <div className="my-8">
        <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
        {console.log("bestSellerProduct in render:", bestSellerProduct)}
        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <p className="text-center">Loading best seller...</p>
        )}
      </div>

      <div className="container mx-auto my-8">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears For Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
