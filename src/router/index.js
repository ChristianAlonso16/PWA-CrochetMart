import Vue from 'vue'
import VueRouter from 'vue-router'
import adminRouter from "./modules/AdminRouter";
import clientRouter from "./modules/ClientRouter";
import utils from '../core/utils/FunctionGlobals';
import AdminLogin from "@/views/AdminLogin/AdminLogin.vue"
import AdminKeyView from '@/modules/admin/views/AdminKeyView.vue';
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/inicio',
        component: {
            render(c) {
                return c("router-view")
            }
        },
        children: [

            ...adminRouter.map(route => {
                route.meta.requireAuth = true
                return { ...route }
            }),
            ...clientRouter.map(route => {
                route.meta.requireAuth = false;
                return { ...route }
            }),
        ]
    },
    {
        path: '/admin225ij5a2o1uzptgeo9g',
        name: 'login',
        component: AdminLogin,
        meta: {
            title: 'Iniciar sesión'
        }
    },
    {
        path: '/adminkey',
        name: 'ak',
        component: AdminKeyView,
        meta: {
            title: 'AdminKwy'
        }
    },
    {
        path: '/unautorized',
        name: 'unautorized',
        component: () => import('../views/UnAuthorized/UnAuthorized.vue')
    },
    {
        path: '/*',
        name: '404',
        component: () => import('../views/ErrorPage/ErrorPage.vue')
    }

]

const router = new VueRouter({
    mode: 'history', routes
})

router.beforeEach((to, from, next) => {
    const canAccess = utils.getToken()

    if (canAccess && to.path.toString().toLowerCase() === '/admin225ij5a2o1uzptgeo9g') {
        const role = utils.getRole()
        if (role.toString().toLowerCase() === 'admin') {
            return next('/admin');

        }
    }
    next()
})

export default router