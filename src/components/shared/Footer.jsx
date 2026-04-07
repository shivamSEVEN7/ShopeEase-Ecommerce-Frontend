import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 mt-auto w-full">
      <div className="w-full px-6 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex flex-col items-center md:items-start flex-1">
            <span className="text-2xl font-black tracking-tighter text-blue-600">
              ShopEase
            </span>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-[0.3em] font-bold">
              © 2025 ShopEase Inc.
            </p>
          </div>

          <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest flex-1">
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-blue-600 transition-colors"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                to="/become-seller"
                className="hover:text-blue-600 transition-colors"
              >
                Sell
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* 3. Social Icons - Right Aligned */}
          <div className="flex items-center justify-center md:justify-end gap-6 flex-1">
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 transition-all hover:-translate-y-0.5"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 transition-all hover:-translate-y-0.5"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 transition-all hover:-translate-y-0.5"
            >
              <FaGithub size={14} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 transition-all hover:-translate-y-0.5"
            >
              <FaDiscord size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
