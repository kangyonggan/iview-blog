export default {
    respCo: '0000',
    respMsg: '成功',
    data: {
        'user': {
            'userId': 1,
            'avatar': ''
        },
        'menu': {
            children: [{
                menuCode: 'SYSTEM',
                menuName: '系统',
                icon: 'ios-cog-outline',
                children: [{
                    menuCode: 'SYSTEM-USER',
                    menuName: '用户管理',
                    icon: ''
                }, {
                    menuCode: 'SYSTEM-ROLE',
                    menuName: '角色管理',
                    icon: ''
                }, {
                    menuCode: 'SYSTEM-MENU',
                    menuName: '菜单管理',
                    icon: ''
                }, {
                    menuCode: 'SYSTEM-DICT',
                    menuName: '字典管理',
                    icon: ''
                }]
            }, {
                menuCode: 'SITES',
                menuName: '网站',
                icon: 'ios-color-palette-outline',
                children: [{
                    menuCode: 'SITES-ARTICLE',
                    menuName: '文章管理',
                    icon: ''
                }, {
                    menuCode: 'SITES-ALBUM',
                    menuName: '相册管理',
                    icon: ''
                }, {
                    menuCode: 'SITES-VIDEO',
                    menuName: '视频管理',
                    icon: ''
                }, {
                    menuCode: 'SITES-NOVEL',
                    menuName: '小说管理',
                    icon: ''
                }]
            }]
        }
    }
};
