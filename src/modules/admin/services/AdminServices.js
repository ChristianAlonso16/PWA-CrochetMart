import axiosPrivate from "../../../core/api/HttpPrivate";

const loginAdmin = async (email, password) => {
  try {
    const data = {
      username: email,
      password: password,
    };
    const response = await axiosPrivate.post("/auth/login", data);

    return response.data;
  } catch (error) {
    return error;
  }
};

const getReportOrders = async () => {
  try {
    const response = await axiosPrivate.get("/order/getReportOrders");

    return response.data;
  } catch (error) {
    return error;
  }
};

const getCategories = async () => {
  try {
    const response = await axiosPrivate.get("/category/getByStatus/enable");

    return response.data;
  } catch (error) {
    return error;
  }
};

const getProducts = async () => {
  try {
    const response = await axiosPrivate.get("/product/getAll");

    return response.data;
  } catch (error) {
    return error;
  }
};

const getProductDetails = async (numberProduct) => {
  try {
    const response = await axiosPrivate.get(
      `/product/getDetails/${numberProduct}`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export default {
  loginAdmin,
  getReportOrders,
  getCategories,
  getProducts,
  getProductDetails,
};
