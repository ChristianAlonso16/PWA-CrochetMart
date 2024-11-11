import axiosPublic from '../../../core/api/HttpPublic';

const getProductsHome = async () => {
    try {
        const response = await axiosPublic.get('/product/getProductsHome');
        return response.data;
    } catch (error) {
        return error;
    }
};

export default {
    getProductsHome
};