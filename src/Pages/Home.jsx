import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import axios from "axios";

const Home = () => {
  const axiosInstance = useAxios();

  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    axios
      .get("data.json")
      .then((response) => {
        console.log(response.data);

        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [axiosInstance]);

  return (
    <div className="flex space-x-10 mx-auto my-10 max-w-screen-xl border-red-500">
      <div className="w-52 bg-slate-500 h-fit p-3">Categories</div>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((product, index) => (
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
                  <h2 className="text-lg font-semibold ">
                   {product.make} {product.model}
                  </h2>
                  <span className="font-normal">
                    {product.color} Variant
                  </span>
                  <span className="font-semibold">
                    ${product.price}
                  </span>
                </div>

                {/* <div className="flex gap-4 mt-4 px-4">
                  <span className="sr-only">Colors available</span>

                  <button
                    aria-label="Yellow"
                    className="p-1 border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer bg-yellow-500 dark:bg-yellow-400"
                  ></button>

                  <button
                    aria-label="Red"
                    className="p-1 border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer bg-red-500 dark:bg-red-400"
                  ></button>

                  <button
                    aria-label="Blue"
                    className="p-1 border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer bg-blue-500 dark:bg-blue-400"
                  ></button>

                  <button
                    aria-label="Black"
                    className="p-1 border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer bg-gray-800 dark:bg-gray-600"
                  ></button>
                </div> */}

                {/* <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
                  <button className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline">
                    <span className="text-base">Add to Cart</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div> */}
              </article>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
