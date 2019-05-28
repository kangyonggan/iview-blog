import Mock from 'mockjs';
import success from './success';
import login from './login';
import userData from './userData';
import menus from './menus';
import users from './users';

/**
 * 登录
 */
Mock.mock('login', 'post', () => {
    return login;
});

/**
 * 登出
 */
Mock.mock('logout', 'get', () => {
    return success;
});

/**
 * 用户数据
 */
Mock.mock('userData', 'get', () => {
    return userData;
});

/**
 * 用户菜单
 */
Mock.mock('menus', 'get', () => {
    return menus;
});

/**
 * 用户列表
 */
Mock.mock('/system/user', 'post', () => {
    return users;
});

/**
 * 电子邮箱校验
 */
Mock.mock('/validate/email', 'post', () => {
    return success;
});


export default Mock;
