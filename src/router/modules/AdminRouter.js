import Dasboard from "../../modules/admin/views/AdminDashBoard.vue"
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

            }
        ]
    },
]