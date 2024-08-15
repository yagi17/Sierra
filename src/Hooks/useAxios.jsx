import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "/data.json",
});
const useAxios = () => {
  return axiosPublic;
};

export default useAxios;