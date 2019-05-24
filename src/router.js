function main(resolve) {
    return require(['./views/layout.vue'], resolve);
}

const routers = [{
    path: '/',
    name: 'index',
    redirect: '/index',
    component: (resolve) => main(resolve),
    children: [
        {
            path: 'index',
            name: 'index',
            meta: {
                title: '首页'
            },
            component: (resolve) => require(['./views/index.vue'], resolve)
        }
    ]
}, {
    path: '/login',
    name: 'login',
    meta: {
        title: '用户登录'
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
}, {
    path: '/*',
    name: '404',
    component: (resolve) => require(['./views/error/404.vue'], resolve)
}];

export default routers;
