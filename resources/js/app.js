/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

window.axios.defaults.headers["X-CSRF-TOKEN"] = document.head.querySelector('meta[name="csrf-token"]').content;

Vue.filter('snakeToTitleCase', function (value) {
    if (value) {
        return value.split('_').map(function (item) {
            return item.charAt(0).toUpperCase() + item.substring(1);
        }).join(' ');
    }
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect)

import Dashboard from './views/Dashboard'
import UsersIndex from './views/users/Index'
import UsersCreate from './views/users/Create'
import UsersEdit from './views/users/Edit'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/home', name: 'home', component: Dashboard },
    { path: '/user', name: 'users.index', component: UsersIndex },
    { path: '/user/create', name: 'users.create', component: UsersCreate },
    { path: '/user/edit/:id', name: 'users.edit', component: UsersEdit },
    {
        // catch all 404 - define at the very end
        path: "*",
        component: () => import("./views/errors/NotFound.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

const app = new Vue({
    router
}).$mount('#app');
