import Mock from 'mockjs';
import success from './success';
import login from './login';
import userData from './userData';
import menus from './menus';
import users from './users';
import userRole from './userRole';
import roles from './roles';
import roleMenu from './roleMenu';
import sysMenus from './sysMenus';
import dicts from './dicts';
import enumList from './enumList';
import idTypes from './idTypes';
import userProfileAvatar from './userProfileAvatar';

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

/**
 * 菜单列表
 */
Mock.mock('/system/menu', 'get', () => {
    return sysMenus;
});

/**
 * 菜单代码校验
 */
Mock.mock('/validate/menu', 'post', () => {
    return success;
});

/**
 * 保存菜单
 */
Mock.mock('/system/menu/save', 'post', () => {
    return success;
});

/**
 * 更新菜单
 */
Mock.mock('/system/menu/update', 'post', () => {
    return success;
});

/**
 * 删除菜单
 */
Mock.mock('/system/menu/delete', 'post', () => {
    return success;
});

/**
 * 字典列表
 */
Mock.mock('/system/dict', 'post', () => {
    return dicts;
});

/**
 * 枚举列表
 */
Mock.mock('/enum', 'post', () => {
    return enumList;
});

/**
 * 字典列表
 */
Mock.mock('/dict', 'post', () => {
    return idTypes;
});

/**
 * 字典代码校验
 */
Mock.mock('/validate/dict', 'post', () => {
    return success;
});

/**
 * 保存字典
 */
Mock.mock('/system/dict/save', 'post', () => {
    return success;
});

/**
 * 更新字典
 */
Mock.mock('/system/dict/update', 'post', () => {
    return success;
});

/**
 * 删除/恢复字典
 */
Mock.mock('/system/dict/delete', 'post', () => {
    return success;
});

/**
 * 上传头像
 */
Mock.mock('/user/profile/avatar', 'post', () => {
    return userProfileAvatar;
});

/**
 * 证件号码校验
 */
Mock.mock('/validate/idNo', 'post', () => {
    return success;
});

/**
 * 更新用户信息
 */
Mock.mock('/user/profile', 'post', () => {
    return success;
});

export default Mock;
