import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineArrowRight,
} from "react-icons/hi";
import { Link } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HeroBanner />
      </div>

      <div className="py-12 border-b border-slate-100/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4 w-full">
          <div className="flex items-center gap-3 group text-left">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <HiOutlineTruck className="text-xl" />
            </div>
            <div className="leading-tight">
              <h3 className="font-bold text-slate-800 text-xs uppercase">
                Free Delivery
              </h3>
              <p className="text-xs text-slate-500">
                On orders over <span className="font-semibold">₹500</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 group text-left md:justify-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <HiOutlineShieldCheck className="text-xl" />
            </div>
            <div className="leading-tight">
              <h3 className="font-bold text-slate-800 text-xs uppercase">
                Secure Payment
              </h3>
              <p className="text-xs text-slate-500">
                100% protected <span className="font-semibold">Checkout</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 group text-left md:justify-end">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <HiOutlineRefresh className="text-xl" />
            </div>
            <div className="leading-tight">
              <h3 className="font-bold text-slate-800 text-xs uppercase">
                Easy Returns
              </h3>
              <p className="text-xs text-slate-500">
                Hassle-free{" "}
                <span className="font-semibold">7-day return policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-800 text-4xl font-bold"> Products</h1>
          <span className="text-slate-700">
            Discover our handpicked selection of top-rated items just for you!
          </span>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">{error}</span>
          </div>
        ) : (
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products
                ?.slice(0, 4)
                .map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        )}
        {!loading && !error && (
          <div className="flex justify-center mt-12 mb-20">
            <Link to={"/products"}>
              <button className="group flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-all hover:shadow-2xl hover:shadow-blue-200 active:scale-95">
                <span>Explore All Products</span>
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
