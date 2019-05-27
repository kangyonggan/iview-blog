function layout(resolve) {
    return require(['./views/layout.vue'], resolve);
}

const routers = [{
    path: '/',
    name: 'layout',
    redirect: '/index',
    component: (resolve) => layout(resolve),
    children: [
        {
            path: '/',
            name: 'index',
            meta: {
                title: '首页'
            },
            component: (resolve) => require(['./views/index.vue'], resolve)
        },
        {
            path: '/*',
            name: '404',
            meta: {
                title: '资源不存在'
            },
            component: (resolve) => require(['./views/error/404.vue'], resolve)
        }
    ]
}, {
    path: '/system',
    name: 'SYSTEM',
    meta: {
        title: '系统'
    },
    redirect: '/user',
    component: (resolve) => layout(resolve),
    children: [
        {
            path: 'user',
            name: 'SYSTEM_USER',
            meta: {
                title: '用户管理'
            },
            component: (resolve) => require(['./views/system/user/index.vue'], resolve)
        },
        {
            path: 'role',
            name: 'SYSTEM_ROLE',
            meta: {
                title: '角色管理'
            },
            component: (resolve) => require(['./views/system/role/index.vue'], resolve)
        },
        {
            path: 'menu',
            name: 'SYSTEM_MENU',
            meta: {
                title: '菜单管理'
            },
            component: (resolve) => require(['./views/system/menu/index.vue'], resolve)
        },
        {
            path: 'dict',
            name: 'SYSTEM_DICT',
            meta: {
                title: '字典管理'
            },
            component: (resolve) => require(['./views/system/dict/index.vue'], resolve)
        }
    ]
}, {
    path: '/login',
    name: 'login',
    meta: {
        title: '用户登录'
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
}];

export default routers;