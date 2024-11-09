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

const getCategoriesByStatus = async () => {
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
const getAllCategories = async () => {
  try {
    const response = await axiosPrivate.get("/category/getAll");

    return response.data;
  } catch (error) {
    return error;
  }
};
const deleteCategory = async (numberProduct) => {
  try {
    const response = await axiosPrivate.get(
      `/category/deleteCategory/${numberProduct}`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
const updateCategory = async (numberProduct) => {
  try {
    const response = await axiosPrivate.get(
      `/category/update/${numberProduct}`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

const getAttributesByName = async (name) => {
  try {
    const response = await axiosPrivate.get(`/attribute/getByName/${name}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getCountProducts = async () => {
  try {
    const response = await axiosPrivate.get("/product/countProducts");

    return response.data;
  } catch (error) {
    return error;
  }
};

const getCountUsers = async () => {
  try {
    const response = await axiosPrivate.get("/user/countUsers/enable");

    return response.data;
  } catch (error) {
    return error;
  }
};

const getCountOrders = async () => {
  try {
    const response = await axiosPrivate.get("/order/countOrders");

    return response.data;
  } catch (error) {
    return error;
  }
};
const getVariants = async (numProduct) => {
  try {
    const response = await axiosPrivate.get(
      `/product/getVariants/${numProduct}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const getVariantDetails = async (numVariant) => {
  try {
    const response = await axiosPrivate.get(
      `/product/getVariantDetails/${numVariant}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const addCategory = async (name, description, icon) => {
  try {
    const category = {
      categoryName: name,
      categoryDescription: description,
      icono: icon,
    };

    const response = await axiosPrivate.post("/category/register", category);

    return response.data;
  } catch (error) {
    return error;
  }
};

export default {
  loginAdmin,
  getReportOrders,
  getCategoriesByStatus,
  getAllCategories,
  getProducts,
  getProductDetails,
  getAttributesByName,
  getCountProducts,
  getCountUsers,
  getCountOrders,
  getVariants,
  getVariantDetails,
  deleteCategory,
  updateCategory,
  addCategory,
};
