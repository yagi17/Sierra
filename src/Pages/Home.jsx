import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
  const searchInputRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 210000]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_apiLink}/cars`)
      .then((response) => {
        const data = response.data;
        setProducts(data);

        const uniqueBrands = [...new Set(data.map((product) => product.brand))];
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category).filter(Boolean)),
        ];

        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("");
    setSelectedCategory("");
    setPriceRange([0, 210000]);
    setSortOrder("asc");

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const isWithinPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return (
        ((product.name &&
          product.name.toLowerCase().includes(lowercasedQuery)) ||
          (product.model &&
            product.model.toLowerCase().includes(lowercasedQuery)) ||
          (product.brand &&
            product.brand.toLowerCase().includes(lowercasedQuery))) &&
        (selectedBrand === "" || product.brand === selectedBrand) &&
        (selectedCategory === "" || product.category === selectedCategory) &&
        isWithinPriceRange
      );
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredProducts(sorted);

    // Reset the current page to 1 when filters change
    setCurrentPage(1);
  }, [
    products,
    searchQuery,
    selectedBrand,
    selectedCategory,
    priceRange,
    sortOrder,
  ]);

  // Calculate the paginated products directly in the render
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <Nav onSearch={handleSearch} searchInputRef={searchInputRef} />
      <div className="md:flex md:space-x-10 mx-auto my-10 lg:max-w-screen-xl md:w-11/12 w-10/12">
        {/* Filter section */}
        <div className="md:w-52 min-h-screen sticky">
          {/* sort by price */}

          <div className="flex items-center space-x-3 font-bold">
            <h2 className="text-sm text-red-600">Price:</h2>
            <div className="p-1 rounded-lg ">
              <select
                className="w-fit rounded outline-none font-bold text-sm focus:ring-0"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>

          {/* select category */}

          <div className="my-1">
            <h3 className="font-bold text-red-600">Category Name</h3>
            <div className="flex flex-col">
              <label className="label cursor-pointer">
                <span className="label-text">All Categories</span>
                <input
                  type="radio"
                  name="category"
                  className="radio size-4"
                  value=""
                  checked={selectedCategory === ""}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
              </label>
              {categories.map((category, index) => (
                <label key={index} className="label cursor-pointer">
                  <span className="label-text">{category}</span>
                  <input
                    type="radio"
                    name="category"
                    className="radio size-4"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Select Brand name */}
          <div className="my-1">
            <h3 className="font-bold text-red-600">Brand Name</h3>
            <div className="flex flex-col">
              <label className="label cursor-pointer">
                <span className="label-text">All Brand</span>

                <input
                  type="radio"
                  name="brand"
                  className="radio size-4"
                  value=""
                  checked={selectedBrand === ""}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                />
              </label>
              {brands.map((brand, index) => (
                <label key={index} className="label cursor-pointer">
                  <span className="label-text">{brand}</span>
                  <input
                    type="radio"
                    name="brand"
                    className="radio size-4"
                    value={brand}
                    checked={selectedBrand === brand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-black">
              Price Range <span className="text-red-600">${priceRange[1]}</span>
            </h3>

            <div className="flex items-center space-x-4 mt-2">
              <input
                type="range"
                min="19999"
                max="210000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              className="w-full p-2 rounded bg-red-600 text-white hover:bg-red-700"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* item section */}
        <div className="w-full mx-auto md:mt-0 mt-6">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="md:grid md:grid-cols-2 gap-4 md:space-y-0 space-y-4 w-full">
                {paginatedProducts.map((product, index) => (
                  // <div >
                    <article key={index} className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden">
                      <div>
                        <img
                          className="object-cover h-64 w-full"
                          src={product.image}
                          alt={product.model}
                        />
                      </div>

                      <div className="flex flex-col gap-1 mt-4 px-4">
                        <h2 className="text-lg font-semibold text-red-500">
                          {product.name}
                        </h2>
                        <span className="font-normal">
                          {product.color} Variant
                        </span>
                        <span className="font-bold">${product.price}</span>
                      </div>

                      <div className="flex justify-between p-4 text-[11px]">
                        <div className="flex flex-col w-fit">
                          {product.features.map((feature, index) => (
                            <div key={index}>
                              {index <= 2 && (
                                <div className="flex items-center">
                                  <GoDotFill />
                                  {feature}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <Link>
                          <button className="btn bg-red-600 text-white hover:bg-red-600">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </article>
                  // </div>
                ))}
              </div>

              {/* Pagination */}

              <div className="mt-8 flex justify-center w-full items-center">
                <div className="inline-flex border-2 border-gray-500 rounded-lg justify-center items-center p-1 bg-white space-x-2">
                  <button
                    className={`p-1 rounded border text-black bg-white hover:text-white hover:bg-blue-600 hover:border-blue-600 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      />
                    </svg>
                  </button>
                  <p className="text-red-600">
                    Page {currentPage} of{" "}
                    {Math.ceil(filteredProducts.length / itemsPerPage)}
                  </p>

                  <button
                    className={`p-1 rounded border text-black bg-white hover:text-white hover:bg-blue-600 hover:border-blue-600 ${
                      currentPage ===
                      Math.ceil(filteredProducts.length / itemsPerPage)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(
                          prevPage + 1,
                          Math.ceil(filteredProducts.length / itemsPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(filteredProducts.length / itemsPerPage)
                    }
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            // no cars
            <>
              <div className="h-1/2 flex justify-center items-center w-full">
                <h2 className="text-2xl text-center font-semibold text-red-600">
                  No car found !!
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
