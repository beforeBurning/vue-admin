/**
 Function: vue 表单验证
 User: burning <923398776@qq.com>
 Date: 2020年05月28日
 */

import { CEN, validEmail, isNumber, isWeChat, isPhone, isChinese, isIdCard, validAlphabets } from '@/utils/validate';

// 账号验证
export const validateUsername = (rule, value, callback) => {
    if (value.length < 2 || value.length > 12) {
        callback(new Error('您的用户名长度不正确'))
    }
    if (!CEN(value)) {
        callback(new Error('用户名只允许含有中英文加数字'))
    } else {
        callback()
    }
};

// 密码验证
export const validatePassword = (rule, value, callback) => {
    if (value.length < 6 || value.length > 12) {
        callback(new Error('密码长度6到12位'))
    } else {
        callback()
    }
};

// 用户名验证
export const validateName = (rule, value, callback) => {
    if (value.length < 2 || value.length > 12) {
        callback(new Error('您的用户名长度不正确'))
    }
    if (!CEN(value)) {
        callback(new Error('用户名只允许含有中英文加数字'))
    } else {
        callback()
    }
};

// 邮箱验证
export const validateEMail = (rule, value, callback) => {
    if (!validEmail(value)) {
        callback(new Error('您的邮箱格式不正确'))
    } else {
        callback()
    }
};

// 纯数字验证
export const validateNumber = (rule, value, callback) => {
    if (!isNumber(value)) {
        callback(new Error('您的输入必须是数字'))
    } else {
        callback()
    }
};

// 微信号验证
export const validateWeChat = (rule, value, callback) => {
    if (!isWeChat(value)) {
        callback(new Error('您的微信号格式不正确'))
    } else {
        callback()
    }
};

// 手机号验证
export const validatePhone = (rule, value, callback) => {
    if (!isPhone(value)) {
        callback(new Error('您的手机号格式不正确'))
    } else {
        callback()
    }
};

// 年龄验证
export const validateAge = (rule, value, callback) => {
    if (value.length < 0 || value.length > 100) {
        callback(new Error('您的年龄输入不正确'))
    }
    if (!isNumber(value)) {
        callback(new Error('您的输入必须是数字'))
    } else {
        callback()
    }
};

// 真实姓名验证
export const validateRealName = (rule, value, callback) => {
    if (value.length === 0 || value.length > 5) {
        callback(new Error('您输入的姓名不正确'))
    }
    if (!isChinese(value)) {
        callback(new Error('您的输入必须是中文'))
    } else {
        callback()
    }
};

// 身份证验证
export const validateIdCard = (rule, value, callback) => {
    if (value.length === 0 || value.length > 18) {
        callback(new Error('您输入的身份证号不正确'))
    }
    if (!isIdCard(value)) {
        callback(new Error('您的输入的身份证号格式有问题'))
    } else {
        callback()
    }
};

// 角色名验证
export const roleName = (rule, value, callback) => {
    if (value.length < 2 || value.length > 12) {
        callback(new Error('您的角色名长度不正确'))
    }
    if (!CEN(value)) {
        callback(new Error('角色名只允许含有中英文加数字'))
    } else {
        callback()
    }
};

// 角色key验证
export const roleKey = (rule, value, callback) => {
    if (value.length < 2 || value.length > 12) {
        callback(new Error('您的角色key长度不正确'))
    }
    if (!validAlphabets(value)) {
        callback(new Error('角色key只允许输入英文'))
    } else {
        callback()
    }
};
