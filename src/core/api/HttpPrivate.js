import axios from "axios";
import router from "@/router";
import store from "@/store/store";
import PouchDB from "pouchdb";
const SERVER_URL = "http://127.0.0.1:8080/api"
const db = new PouchDB("offline_requests");

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
            const offlineRequest = {
                _id: new Date().toISOString(),
                method: error.config.method,
                url: error.config.url,
                data: error.config.data || {},
                headers: error.config.headers,
            };
            try {
                await db.put(offlineRequest);
                console.warn("Peticion guardada en modo offline.");
            } catch (dbError) {
                console.error("Error al guardar la peticion offline:", dbError);
            }
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
const retryOfflineRequests = async () => {
    try {
        const allDocs = await db.allDocs({ include_docs: true });
        for (const doc of allDocs.rows) {
            const request = doc.doc;
            try {
                await axios({
                    method: request.method,
                    url: `${SERVER_URL}${request.url}`,
                    data: request.data,
                    headers: request.headers,
                });
                await db.remove(request);
                console.log("Peticion reenviada con exito:", request);
            } catch (error) {
                console.error("Error al reintentar peticion offline:", error);
            }
        }
    } catch (error) {
        console.error("Error al procesar peticiones offline:", error);
    }
};
retryOfflineRequests();

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