'use client';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full text-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {/* EduPortal Info */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">EduPortal</h2>
          <p className="text-sm leading-relaxed">
            EduPortal is your gateway to quality education. We help learners, teachers, and institutions connect through a powerful and modern platform. Discover top institutes, explore learning paths, and shape your future — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/institute" className="hover:text-indigo-600 transition">
                Browse Institutes
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-600 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/register-institute" className="hover:text-indigo-600 transition">
                Register Institute
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-indigo-600 transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-indigo-600 transition">
                Terms & Policies
              </Link>
            </li>
          </ul>
        </div>

        {/* Support / Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support & Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <FaPhoneAlt className="mt-1 text-indigo-500" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-2">
              <FaEnvelope className="mt-1 text-indigo-500" />
              <span>support@eduportal.com</span>
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-indigo-500" />
              <span>Hyderabad, India</span>
            </li>
            <li className="pt-2">
              <p className="text-gray-700">
                Need help? Reach out to our team anytime. We’re here to support you.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 py-3">
        © {new Date().getFullYear()} EduPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
