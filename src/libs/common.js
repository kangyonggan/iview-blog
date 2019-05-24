import Vue from 'vue';
import Config from '@/config/config';
import Util from '@/libs/util';

// 定义全局方法
Vue.prototype.error = error;
Vue.prototype.success = success;
Vue.prototype.warning = warning;
Vue.prototype.dateFormat = dateFormat;
Vue.prototype.util = Util;

/**
 * 错误
 *
 * @param respMsg
 */
function error(respMsg) {
    this.$Notice.error({
        title: '错误',
        desc: respMsg,
        duration: 3
    });
}

/**
 * 成功
 *
 * @param respMsg
 */
function success(respMsg) {
    this.$Notice.success({
        title: '消息',
        desc: respMsg
    });
}

/**
 * 警告
 *
 * @param respMsg
 */
function warning(respMsg) {
    this.$Notice.warning({
        title: '警告',
        desc: respMsg,
        duration: 3
    });
}

/**
 * 时间戳格式化
 *
 * @param timestamp
 * @param format
 */
function dateFormat(timestamp, format) {
    let d = new Date();
    d.setTime(timestamp);
    return d.format(format);
}

/**
 * 日期时间格式化
 *
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function (fmt) {
    let o = {
        'M+': this.getMonth() + 1,                 //月份
        'd+': this.getDate(),                    //日
        'H+': this.getHours(),                   //小时
        'm+': this.getMinutes(),                 //分
        's+': this.getSeconds(),                 //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};
