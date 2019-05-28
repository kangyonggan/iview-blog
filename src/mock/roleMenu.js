export default {
    respCo: '0000',
    respMsg: '成功',
    data: {
        allMenus:[{
            menuId: 1,
            menuCode: 'SYSTEM',
            menuName: '系统',
            icon: 'md-settings',
            children: [{
                menuId: 2,
                menuCode: 'SYSTEM_USER',
                menuName: '用户管理',
                icon: ''
            }, {
                menuId: 3,
                menuCode: 'SYSTEM_ROLE',
                menuName: '角色管理',
                icon: ''
            }, {
                menuId: 4,
                menuCode: 'SYSTEM_MENU',
                menuName: '菜单管理',
                icon: ''
            }, {
                menuId: 5,
                menuCode: 'SYSTEM_DICT',
                menuName: '字典管理',
                icon: ''
            }]
        }, {
            menuId: 6,
            menuCode: 'SITES',
            menuName: '网站',
            icon: 'md-desktop',
            children: [{
                menuId: 7,
                menuCode: 'SITES_ARTICLE',
                menuName: '文章管理',
                icon: ''
            }, {
                menuId: 8,
                menuCode: 'SITES_ALBUM',
                menuName: '相册管理',
                icon: ''
            }, {
                menuId: 9,
                menuCode: 'SITES_VIDEO',
                menuName: '视频管理',
                icon: ''
            }, {
                menuId: 10,
                menuCode: 'SITES_NOVEL',
                menuName: '小说管理',
                icon: ''
            }]
        }],
        roleMenus: [1, 2, 3, 4, 5]
    }
};
