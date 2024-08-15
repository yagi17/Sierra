import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
  const axiosInstance = useAxios();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("data.json")
      .then((response) => {
        const data = response.data;
        setProducts(data);

        const uniqueBrands = [...new Set(data.map((product) => product.brand))];
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
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
      <Nav onSearch={handleSearch} />
      <div className="flex space-x-10 mx-auto my-10 max-w-screen-xl">
        <div className="w-52 bg-slate-500 h-fit p-3 text-sm">
          <h2 className="text-white font-bold mb-4">Filter</h2>
          <div className="mb-4">
            <h3 className="text-white">Brand Name</h3>
            <select
              className="w-full p-2 rounded"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h3 className="text-white">Category Name</h3>
            <select
              className="w-full p-2 rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-white">Price Range</h3>
            <input
              type="number"
              className="w-full p-2 rounded mb-2"
              placeholder="Min Price"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
            />
            <input
              type="number"
              className="w-full p-2 rounded"
              placeholder="Max Price"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>
          <div className="mt-4">
            <h3 className="text-white">Sort by Price</h3>
            <select
              className="w-full p-2 rounded"
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

        <div className="grid md:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div key={index}>
              <div className="">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
