import Dasboard from "../../modules/admin/views/AdminDashBoard.vue"
import Products from "../../modules/admin/views/AdminProducts.vue"
export default [
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/dashboard',
        component: () => import("../../layouts/AdminLayout.vue"),
        meta: {
            title: 'Admin',
            role: "admin"
        },
        children: [

            {
                path: '/admin/dashboard',
                name: 'dashboard',
                component: Dasboard,
                meta: {
                    title: 'Dashboard',
                    role: "admin"
                }

            },
            {
                path: '/admin/products',
                name: 'products',
                component: Products,
                meta: {
                    title: 'Products',
                    role: "admin"
                }

            }
        ]
    },
]