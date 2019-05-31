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
        }, {
            path: 'system/user',
            name: 'SYSTEM_USER',
            meta: {
                title: '用户管理'
            },
            component: (resolve) => require(['./views/system/user/index.vue'], resolve)
        },
        {
            path: 'system/role',
            name: 'SYSTEM_ROLE',
            meta: {
                title: '角色管理'
            },
            component: (resolve) => require(['./views/system/role/index.vue'], resolve)
        },
        {
            path: 'system/menu',
            name: 'SYSTEM_MENU',
            meta: {
                title: '菜单管理'
            },
            component: (resolve) => require(['./views/system/menu/index.vue'], resolve)
        },
        {
            path: 'system/dict',
            name: 'SYSTEM_DICT',
            meta: {
                title: '字典管理'
            },
            component: (resolve) => require(['./views/system/dict/index.vue'], resolve)
        },
        {
            path: 'sites/article',
            name: 'SITES_ARTICLE',
            meta: {
                title: '文章管理'
            },
            component: (resolve) => require(['./views/sites/article/index.vue'], resolve)
        },
        {
            path: 'sites/article/create',
            name: 'SITES_ARTICLE_CREATE',
            meta: {
                title: '新增文章'
            },
            component: (resolve) => require(['./views/sites/article/create.vue'], resolve)
        },
        {
            path: 'sites/article/:articleId/edit',
            name: 'SITES_ARTICLE_EDIT',
            meta: {
                title: '编辑文章'
            },
            component: (resolve) => require(['./views/sites/article/edit.vue'], resolve)
        },
        {
            path: 'sites/album',
            name: 'SITES_ALBUM',
            meta: {
                title: '相册管理'
            },
            component: (resolve) => require(['./views/sites/album/index.vue'], resolve)
        },
        {
            path: 'sites/video',
            name: 'SITES_VIDEO',
            meta: {
                title: '视频管理'
            },
            component: (resolve) => require(['./views/sites/video/index.vue'], resolve)
        },
        {
            path: 'sites/novel',
            name: 'SITES_NOVEL',
            meta: {
                title: '小说管理'
            },
            component: (resolve) => require(['./views/sites/novel/index.vue'], resolve)
        },
        {
            path: 'user/profile',
            name: 'USER_PROFILE',
            meta: {
                title: '个人资料'
            },
            component: (resolve) => require(['./views/user/profile/index.vue'], resolve)
        },
        {
            path: 'user/password',
            name: 'USER_PASSWORD',
            meta: {
                title: '修改密码'
            },
            component: (resolve) => require(['./views/user/password/index.vue'], resolve)
        }, {
            path: '/*',
            name: '404',
            meta: {
                title: '资源不存在'
            },
            component: (resolve) => require(['./views/error/404.vue'], resolve)
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
