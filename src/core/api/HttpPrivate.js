import axios from "axios";
import router from "@/router";
import store from "@/store/store";
const SERVER_URL = process.env.VUE_APP_API_URL;
const client = axios.create({
    baseURL: SERVER_URL,
    timeout: 3000
})
client.interceptors.request.use(
    function (config) {
        const auth_token = localStorage.getItem('token')
        if (auth_token !== undefined) {
            if (!config.url.includes('login')) {
                config.headers.Authorization = `Bearer ${auth_token}`
            }
        }
      
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)


client.interceptors.response.use(
    (response) => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    async (error) => {
        if (!error.response) {
            localStorage.removeItem('token')
            return Promise.reject(error)
        }
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    break;
                case 401:
                    store.commit('clearToken');
                    router.push({ name: 'unautorized' })
                    break;
                case 403:

                    store.commit('clearToken');
                    router.push({ name: 'unautorized' })
                    break;
                case 404:
                    break;
                case 500:
                    break;

            }
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export default {
    get: function (endPoint, config) {
        return client.get(endPoint, config);
    },
    post: function (endPoint, object, config) {
        return client.post(endPoint, object, config || {});
    },
    put: function (endPoint, object, config) {
        return client.put(endPoint, object, config || {});
    },
    delete: function (endPoint) {
        return client.delete(endPoint);
    },
};