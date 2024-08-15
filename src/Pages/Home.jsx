import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

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
                  <h2 className="text-lg font-semibold text-red-500">
                    {product.make} {product.model}
                  </h2>
                  <span className="font-normal">{product.color} Variant</span>
                  <span className="font-bold">${product.price}</span>
                </div>

                <div className="flex justify-between p-4 text-[11px]">
                  <div className="flex flex-col w-fit">
                    {product.features.map((feature, index) => (
                      <div key={index}>
                        {index === 0 && (
                          <div className="flex items-center">
                            <GoDotFill />
                            {feature}
                          </div>
                        )}
                        {index === 1 && (
                          <div className="flex items-center">
                            <GoDotFill />
                            {feature}
                          </div>
                        )}
                        {index >= 2 && (
                          <div className="flex items-center">
                            <GoDotFill />
                            {feature}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* <div className="w-fit"> */}
                  <Link>
                    {" "}
                    <button className="btn bg-red-600 text-white hover:bg-red-600">
                      View Details
                    </button>
                  </Link>
                  {/* </div> */}
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
