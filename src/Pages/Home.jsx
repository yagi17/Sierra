import { useEffect, useState, useRef } from "react";
import useAxios from "../Hooks/useAxios";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
  const axiosInstance = useAxios();
  const searchInputRef = useRef(null); // Add a ref for the search input

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [brands, setBrands] = useState([]);

  const [categories, setCategories] = useState([]);
  // console.log(categories);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("data.json")
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
  }, [axiosInstance]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("");
    setSelectedCategory("");
    setPriceRange([0, 100000]);
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
  }, [
    products,
    searchQuery,
    selectedBrand,
    selectedCategory,
    priceRange,
    sortOrder,
  ]);

  return (
    <>
      <Nav onSearch={handleSearch} searchInputRef={searchInputRef} />
      <div className="flex space-x-10 mx-auto my-10 max-w-screen-xl">
        {/* Filter section */}
        <div className="w-52 min-h-screen sticky">
          <h2 className="font-bold mb-4">Filter</h2>

          {/* select category */}

          <div className="mb-4">
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
          <div className="mb-4">
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
                min="0"
                max="100000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full"
              />
            </div>
          </div>

          {/* sort by price */}
          <div className="">
            <h3 className="text-white">Sort by Price</h3>
            <select
              className="w-full py-2 rounded outline-none focus:ring-0"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
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

        <div className="grid md:grid-cols-3 gap-4 w-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index}>
                <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden">
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
                    <span className="font-normal">{product.color} Variant</span>
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
              </div>
            ))
          ) : (
            <div className="col-span-3">
              <h2 className="text-xl font-semibold text-red-600">
                No car found
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
