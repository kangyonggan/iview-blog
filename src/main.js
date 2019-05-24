import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import iView from 'iview';
import '../my-theme/dist/iview.css';
import Util from './libs/util';
import App from './app.vue';
import './libs/http';
import './components/index';
import env from './config/env';
import './libs/common';
import app from './store/app';

if (env === 'mock') {
    require('./mock');
}

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    store: {app},
    render: h => h(App)
});
