import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import env from '@/config/env';

let util = {};

/**
 * aes
 *
 * @type {string}
 */
util.AES_KEY = CryptoJS.enc.Latin1.parse('kangyonggan12345');
util.AES_IV = CryptoJS.enc.Latin1.parse('kangyonggan12345');

/**
 * 令牌存放在Cookie中的key
 *
 * @type {string}
 */
util.tokenKey = 'x-auth-token';

/**
 * 设置浏览器标题
 *
 * @param title
 */
util.title = function (title) {
    title = title ? title + ' - 东方骄子' : '东方骄子';
    window.document.title = title;
};

/**
 * 从Cookie中获取令牌
 *
 * @returns {*}
 */
util.token = function () {
    const token = Cookies.get(this.tokenKey);
    if (token) {
        return token;
    }
    return '';
};

/**
 * 从Cookie中移除令牌
 */
util.removeToken = function () {
    Cookies.set(this.tokenKey, '', {expires: -1});
};

/**
 * 向Cookie中添加令牌
 */
util.setToken = function (token) {
    Cookies.set(this.tokenKey, token, {expires: 30});
};

/**
 * aes加密
 *
 * @param data
 * @returns {string}
 */
util.encrypt = function (data) {
    data = CryptoJS.AES.encrypt(JSON.stringify(data), util.AES_KEY, {
        iv: util.AES_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString();
    return JSON.stringify(data);
};

/**
 * url简单加密
 *
 * @param url
 * @returns {string}
 */
util.encryptUrlSimple = function (url) {
    url = CryptoJS.AES.encrypt('' + url, util.AES_KEY, {
        iv: util.AES_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString();
    return url;
};

/**
 * url加密
 *
 * @param url
 * @returns {string}
 */
util.encryptUrl = function (url) {
    url = CryptoJS.AES.encrypt('' + url, util.AES_KEY, {
        iv: util.AES_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString();
    return encodeURIComponent(url);
};

/**
 * aes解密
 *
 * @param data
 * @returns {Object}
 */
util.decrypt = function (data) {
    if (env === 'mock') {
        return data;
    }
    if (!data) {
        return {};
    }

    let decrypted = CryptoJS.AES.decrypt(data, util.AES_KEY, {
        iv: util.AES_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
};

/**
 * url解密
 *
 * @param url
 * @returns {Object}
 */
util.decryptUrl = function (url) {
    url = CryptoJS.AES.decrypt(url, util.AES_KEY, {
        iv: util.AES_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString(CryptoJS.enc.Utf8);

    return decodeURIComponent(url);
};

/**
 * 存储标签导航列表
 *
 * @param userId
 * @param list
 */
util.setTagNavList = function (userId, list) {
    Cookies.set('tagNaveList_' + userId, list);
};

/**
 * 获取标签导航列表
 * @param userId
 */
util.getTagNavList = function (userId) {
    let list = Cookies.get('tagNaveList_' + userId);
    return list ? JSON.parse(list) : [{
        name: 'index',
        meta: {
            title: '首页'
        }
    }];
};

export default util;
