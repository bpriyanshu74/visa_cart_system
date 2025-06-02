// Footer.jsx
import React from "react";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaPinterest,
} from "react-icons/fa";

const Footer = ({ isCartOpen }) => {
  return (
    <footer
      className={`bg-[#F2F2F2] text-gray-800 py-10 px-6 md:px-16 ${
        isCartOpen ? "lg:mr-[400px]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-6 gap-8 mb-10">
        {/* First Row: 6 columns */}
        <div>
          <h3 className="font-semibold mb-4">ABOUT US</h3>
          <ul className="space-y-2 text-sm">
            <li>About Y Axis</li>
            <li>Careers</li>
            <li>CSR</li>
            <li>Office Network</li>
            <li>Press and News</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">TESTIMONIALS</h3>
          <ul className="space-y-2 text-sm">
            <li>Success Videos</li>
            <li>Customer Reviews</li>
            <li>Social Reviews</li>
            <li>Visa Success</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">BLOGS</h3>
          <ul className="space-y-2 text-sm">
            <li>Immigration Blog</li>
            <li>Overseas Jobs</li>
            <li>Newsletter</li>
            <li>Visa Stories</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">INDIAN LANGUAGES</h4>
          <ul className="space-y-1 text-sm">
            <li>Hindi</li>
            <li>Tamil</li>
            <li>Gujarati</li>
            <li>Telugu</li>
            <li>Marathi</li>
            <li>Kannada</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">FOREIGN LANGUAGES</h4>
          <ul className="space-y-1 text-sm">
            <li>Arabic</li>
            <li>French</li>
            <li>Chinese</li>
            <li>German</li>
            <li>Korean</li>
            <li>Ukrainian</li>
            <li>Italian</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">CONTACT US</h3>
          <div className="text-sm space-y-4">
            <div>
              <strong>India Y-Axis</strong>
              <p>INDIA</p>
              <p>+91 7670800001</p>
              <p>info@y-axis.com</p>
              <p>www.y-axis.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-start gap-8">
        {/* Left side countries */}
        <div className="flex flex-wrap gap-12 text-sm text-gray-700">
          <div>
            <strong>Australia</strong>
            <p>AUSTRALIA</p>
            <p>+61 399394818</p>
            <p>australia@y-axis.com.au</p>
            <p>www.y-axis.com.au</p>
          </div>

          <div>
            <strong>UAE</strong>
            <p>UAE</p>
            <p>+971 (0)42483900</p>
            <p>dubai@y-axis.com</p>
            <p>www.y-axis.ae</p>
          </div>

          <div>
            <strong>UK</strong>
            <p>UK</p>
            <p>+44 1253226009</p>
            <p>info@y-axis.co.uk</p>
            <p>www.y-axis.co.uk</p>
          </div>

          <div>
            <strong>Canada</strong>
            <p>Canada</p>
            <p>+1 226 243 2213</p>
            <p>info@y-axis.ca</p>
            <p>www.y-axis.ca</p>
          </div>
        </div>

        {/* Right side follow + subscribe */}
        <div className="flex flex-col gap-8 min-w-[280px] max-w-sm">
          <div>
            <h3 className="font-semibold mb-4">FOLLOW US</h3>
            <ul className="flex gap-4 text-2xl text-gray-600">
              <li>
                <a
                  href="https://www.youtube.com/c/YAxisOverseas"
                  aria-label="YouTube"
                  target="_blank"
                >
                  <FaYoutube />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/yaxisoverseas/"
                  aria-label="Instagram"
                  target="_blank"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/y-axis-overseas-careers/"
                  aria-label="LinkedIn"
                  target="_blank"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/yaxisoverseascareers/"
                  aria-label="Facebook"
                  target="_blank"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://in.pinterest.com/yaxisoverseas/"
                  aria-label="Pinterest"
                >
                  <FaPinterest />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">SUBSCRIBE NEWSLETTER</h3>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your Email"
                className="p-2 rounded border border-gray-400 flex-grow"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-12 text-gray-500">
        &copy; {new Date().getFullYear()} Y Axis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
