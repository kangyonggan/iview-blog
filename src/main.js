import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Util from './libs/util';
import App from './app.vue';
import './libs/http';
import './components/index';
import env from './config/env';
import './libs/common';
import app from './store/app';
import iEditor from 'iview-editor';
import 'iview-editor/dist/iview-editor.css';

if (env === 'mock') {
    require('./mock');
}

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);
Vue.use(iEditor);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();

    if (to.meta.title) {
        Util.title(to.meta.title);
    }

    if (to.name === 'login') {
        next();
        return;
    }

    let token = Util.token();
    if (token) {
        next();
    } else {
        // 未登陆的前往登录界面
        Util.removeToken();
        next({
            name: 'login'
        });
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {app}
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
