import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            {" "}
            Be the first to hear about new products,exclusive ofers ansghgshabh{" "}
          </p>
          <p>Lorem ipsum, dolor sit amet consectetur </p>
          {/* News letter form */}
          <form action="" className="flex">
            <input
              type="email"
              placeholder="Enter your Email"
              required
              className="p-3 w-full border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            />
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
