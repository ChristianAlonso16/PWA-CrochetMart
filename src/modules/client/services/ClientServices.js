import axiosPublic from "../../../core/api/HttpPublic";

const getProductsHome = async () => {
  try {
    const response = await axiosPublic.get("/product/getProductsHome");
    return response.data;
  } catch (error) {
    return error;
  }
};

const getNewProducts = async () => {
  try {
    const response = await axiosPublic.get("/product/getNewProducts");
    return response.data;
  } catch (error) {
    return error;
  }
};

const getTopRatedProducts = async () => {
  try {
    const response = await axiosPublic.get("/product/getTopRatedProducts");
    return response.data;
  } catch (error) {
    return error;
  }
};

const getCategories = async () => {
  try {
    const status = "enable";
    const response = await axiosPublic.get(`/category/getByStatus/${status}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export default {
  getProductsHome,
  getNewProducts,
  getCategories,
  getTopRatedProducts,
};
