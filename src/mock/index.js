import Mock from 'mockjs';
import success from './success';
import login from './login';
import userData from './userData';
import menus from './menus';
import users from './users';
import userRole from './userRole';
import roles from './roles';
import roleMenu from './roleMenu';

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

/**
 * 查找用户角色
 */
Mock.mock('/system/user/role', 'post', () => {
    return userRole;
});

/**
 * 保存用户
 */
Mock.mock('/system/user/save', 'post', () => {
    return success;
});

/**
 * 更新用户
 */
Mock.mock('/system/user/update', 'post', () => {
    return success;
});

/**
 * 删除/恢复用户
 */
Mock.mock('/system/user/delete', 'post', () => {
    return success;
});

/**
 * 修改用户密码
 */
Mock.mock('/system/user/password', 'post', () => {
    return success;
});

/**
 * 角色列表
 */
Mock.mock('/system/role', 'post', () => {
    return roles;
});

/**
 * 角色代码校验
 */
Mock.mock('/validate/role', 'post', () => {
    return success;
});

/**
 * 保存角色
 */
Mock.mock('/system/role/save', 'post', () => {
    return success;
});

/**
 * 删除/恢复角色
 */
Mock.mock('/system/role/delete', 'post', () => {
    return success;
});

/**
 * 查找角色菜单
 */
Mock.mock('/system/role/menu', 'post', () => {
    return roleMenu;
});

/**
 * 更新角色
 */
Mock.mock('/system/role/update', 'post', () => {
    return success;
});

export default Mock;
