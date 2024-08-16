import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "./useAuth";

const SignUp = () => {
  const { createUser, googleLogIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleLogIn()
    .then(() => {
        navigate("/");
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password)
    .then(() => {
        navigate("/");
    })
}

  return (
    <>
      <section className=" min-h-screen flex box-border justify-center items-center">
        <div className="bg-gray-300 rounded-2xl flex max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-3xl text-center text-red-600">
              Register
            </h2>
            {/* <p className="text-sm mt-4">If you don't have an account..</p> */}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-500 mt-1 text-xs">
                    Name field is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-500 mt-1 text-xs">
                    Email is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  })}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500 mt-1 text-xs">
                    Password must be 6 character
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 mt-1 text-xs">
                    Password must contain 1 uppercase and 1 lowercase character
                  </span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <button
                className="btn bg-red-600 hover:bg-red-600 text-white py-2 rounded-xl duration-300 font-medium"
                type="submit"
              >
                Login
              </button>
            </form>

            <div className="mt-6  items-center text-gray-100">
              <hr className="border-gray-300" />
              <p className="text-center text-black text-sm">OR</p>
              <hr className="border-gray-300" />
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm duration-300 hover:bg-[#60a8bc4f] font-medium"
            >
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Login with Google
            </button>

            <div className="mt-4 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 text-xs">
                If you already a member,{" "}
                <Link to={"/login"}>
                  <span className="link text-blue-700 font-bold">login</span>
                </Link>{" "}
                here.
              </p>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl max-h-[1600px]"
              src="https://ih1.redbubble.net/image.4901797160.2334/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
            />
          </div>
        </div>
      </section>
      ;
    </>
  );
};

export default SignUp;
