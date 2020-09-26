import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "../components/HelloWorld";
import Login from "../components/Login";

Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/helloworld',
            component: HelloWorld
        },
        // {
        //     path: '/index',
        //     name: 'index',
        //     component: Index
        // },
        // {
        //     path: '/register',
        //     name: 'register',
        //     component: Register
        // // },
        // // {
        // //     path: '*',
        // //     name: '/404',
        // //     component: NotFound
        // // }
    ]
});
export default router
