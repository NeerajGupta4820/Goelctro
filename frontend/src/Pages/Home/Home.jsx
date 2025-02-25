import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import { useGetLatestProductsQuery } from "../../redux/api/productAPI";
import Sale from "../../Components/Sale/Sale";
import UpcomingProducts from "../../Components/upcomingProducts/UpcomingProducts";
import { useFetchAllCategoriesQuery } from "../../redux/api/categoryAPI";
import "./Home.css";
import CategoriesProducts from "../../Components/HomeProductComponent/CategoriesProducts";

const Home = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleCategory = (id) => {
    navigate("/allProducts", { state: { category: id } });
  };

  const { data: productData, isLoading: isProductLoading } =
    useGetLatestProductsQuery();
  const products = productData?.products || [];

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useFetchAllCategoriesQuery();

  const categories = categoryData?.data || [];
  const categoriesToShow = categories.slice(currentIndex, currentIndex + 6);

  const handlePrevClick = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, categories.length - 6) : prevIndex - 1
    );
  }, [categories.length]);

  const handleNextClick = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 6 >= categories.length ? 0 : prevIndex + 1
    );
  }, [categories.length]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setMessage(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div>
      <Header />
      <div className="categories-section">
        <h2>Shop by Categories</h2>
        {isCategoryLoading ? (
          <p>Loading categories...</p>
        ) : isCategoryError ? (
          <p>Failed to load categories. Please try again later.</p>
        ) : (
          <div className="categories-container">
            <button
              className="category-slider-button prev"
              onClick={handlePrevClick}
              disabled={categories.length <= 6}
            >
              &lt;
            </button>
            <ul className="categories-list">
              {categoriesToShow.map((category) => (
                <li key={category._id}>
                  <a onClick={() => handleCategory(category._id)}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                    />
                    {window.innerWidth > 480 ? category.name : ""}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="category-slider-button next"
              onClick={handleNextClick}
              disabled={categories.length <= 6}
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      {/* Latest Products Slider */}
      <ProductSlider
        products={products}
        title="Latest Products"
        isLoading={isProductLoading}
        link="/filter"
      />
      {/* Sale Section */}
      <Sale />
      
      <CategoriesProducts/>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <h2>Subscribe to Our Newsletter</h2>
        <form onSubmit={handleSubscribe} className="newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="newsletter-input"
          />
          <button type="submit" className="newsletter-button">
            Subscribe
          </button>
        </form>
        {message && <p className="subscription-message">{message}</p>}
      </section>
      <UpcomingProducts />
    </div>
  );
};

export default Home;
