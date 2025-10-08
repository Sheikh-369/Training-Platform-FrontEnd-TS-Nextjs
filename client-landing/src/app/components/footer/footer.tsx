'use client';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-300 text-gray-900 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">EduPortal</h2>
          <p className="text-sm text-gray-800">
            Discover and connect with the best educational institutes across the country.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/institute" className="hover:text-indigo-900 transition">
                Institutes
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-900 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-indigo-900 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/register-institute" className="hover:text-indigo-900 transition">
                Register Your Institute
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <FaPhoneAlt />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope />
              <span>support@eduportal.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt />
              <span>Hyderabad, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-indigo-400 text-center py-4 text-sm text-gray-700">
        © {new Date().getFullYear()} EduPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
