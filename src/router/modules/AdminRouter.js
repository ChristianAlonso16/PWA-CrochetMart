import Dasboard from "../../modules/admin/views/AdminDashBoard.vue";
import Products from "../../modules/admin/views/AdminProducts.vue";
import ProductVariants from "../../modules/admin/views/AdminProductVariants.vue";
export default [
  {
    path: "/admin",
    name: "admin",
    redirect: "/admin/dashboard",
    component: () => import("../../layouts/AdminLayout.vue"),
    meta: {
      title: "Admin",
      role: "admin",
    },
    children: [
      {
        path: "/admin/dashboard",
        name: "dashboard",
        component: Dasboard,
        meta: {
          title: "Inicio",
          role: "admin",
        },
      },
      {
        path: "/admin/products",
        name: "products",
        component: Products,
        meta: {
          title: "Productos",
          role: "admin",
        },
      },
      {
        path: "/admin/productvariants",
        name: "productvariants",
        component: ProductVariants,
        meta: {
          title: "Productos /",
          role: "admin",
        },
        props: true,
      },
    ],
  },
];
