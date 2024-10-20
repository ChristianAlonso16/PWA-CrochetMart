import LandPage from "@/modules/client/views/LandPage.vue";
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

        ],
    },
];
