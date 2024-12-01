import LandPage from "@/modules/client/views/LandPage.vue";
import DetailsProduct from "@/modules/client/views/DetailsProduct.vue";
import ProductsPage from "@/modules/client/views/ProductsPage.vue";
export default [
    {
        path: "/",
        name: 'publico',
        redirect: '/inicio',
        component: () => import("../../layouts/PublicLayout.vue"),
        meta: {
            title: "Cliente",
            role: "public"
        },
        children: [
            {
                path: "/inicio",
                name: "Inicio",
                component: LandPage,
                meta: {
                    title: "Inicio",
                },
            },
            {
                path: '/details-product',
                name: 'DetailsProduct',
                component: DetailsProduct,
                meta: {
                    title: 'Detalle de productos'
                }
            },
            {
                path: '/productos',
                name: 'Products',
                component: ProductsPage,
                meta: {
                    title: 'Productos'
                }
            }
        ],
    },
];
