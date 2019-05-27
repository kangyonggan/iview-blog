export default {
    respCo: '0000',
    respMsg: '成功',
    data: {
        'menus': [{
            menuCode: 'SYSTEM',
            menuName: '系统',
            icon: 'ios-cog-outline',
            children: [{
                menuCode: 'SYSTEM_USER',
                menuName: '用户管理',
                icon: ''
            }, {
                menuCode: 'SYSTEM_ROLE',
                menuName: '角色管理',
                icon: ''
            }, {
                menuCode: 'SYSTEM_MENU',
                menuName: '菜单管理',
                icon: ''
            }, {
                menuCode: 'SYSTEM_DICT',
                menuName: '字典管理',
                icon: ''
            }]
        }, {
            menuCode: 'SITES',
            menuName: '网站',
            icon: 'ios-desktop-outline',
            children: [{
                menuCode: 'SITES_ARTICLE',
                menuName: '文章管理',
                icon: ''
            }, {
                menuCode: 'SITES_ALBUM',
                menuName: '相册管理',
                icon: ''
            }, {
                menuCode: 'SITES_VIDEO',
                menuName: '视频管理',
                icon: ''
            }, {
                menuCode: 'SITES_NOVEL',
                menuName: '小说管理',
                icon: ''
            }]
        }]
    }
};
