import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";

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
          <p className="font-medium text-sm text-gray-600 mb-6">
            Lorem ipsum, dolor sit amet consectetur{" "}
          </p>

          {/* News letter form */}
          <form action="" className="flex">
            <input
              type="email"
              placeholder="Enter your Email"
              required
              className="p-3 w-full border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-y text-sm rounded-r-md  hover:bg-gray-800 transition-all"
            >
              {" "}
              Suscribe
            </button>
          </form>
        </div>
        {/* Shop links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support Linkks */}

        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4"> Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://facebook.com"
              target="-blank"
              rel="noopener noreffer"
              className="hover:text-gray-300"
            >
              <TbBrandMeta className="h-5 w-5 " />
            </a>
            <a
              href="https://facebook.com"
              target="-blank"
              rel="noopener noreffer"
              className="hover:text-gray-300"
            >
              <IoLogoInstagram className="h-5 w-5 " />
            </a>
            <a
              href="https://facebook.com"
              target="-blank"
              rel="noopener noreffer"
              className="hover:text-gray-300"
            >
              <RiTwitterXLine className="h-5 w-5 " />
            </a>
          </div>
          <p className="text-gray-500">Call us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            012-3435-467
          </p>
        </div>
      </div>
      {/* Bottom */}{" "}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          © 2025, Rohit. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
