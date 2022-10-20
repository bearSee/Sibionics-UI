import Vue from 'vue';
import axios from 'axios';
import { encryptAES } from '@/utils/encryption';

const { formatDate } = window.SIB;
const { origin, pathname } = window.location;

const axiosConfig = {
    baseURL: `${origin}${pathname}`,
    timeout: 30 * 1000, // Timeout
};
const Axios = axios.create(axiosConfig);
// 请求拦截
Axios.interceptors.request.use(
    (config) => {
        // UUID || 生成随机数
        const uuid = Array(8).fill().map(() => (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1)).join('');
        const aun = window.localStorage.getItem(`accessToken-${window.systemId}`) || '';
        const timeStamp = formatDate(new Date(), 'YYYYMMDDhhmmss');
        config.headers = {
            ...config.headers,
            aun,
            mid: encryptAES(uuid),
            ts: encryptAES(timeStamp),
        };
        // get请求增加时间戳，避免服务器304
        if (config.method === 'get') {
            config.params = {
                _t: timeStamp,
                ...config.params,
            };
        }
        window.NProgress.start();
        return config;
    },
    (error) => {
        window.NProgress.done();
        Promise.reject(error);
    },
);

// 响应拦截
Axios.interceptors.response.use(
    async (res) => {
        window.NProgress.done();
        const { code, message } = res.data || {};

        // 返回成功响应
        if (res.config.responseType === 'blob' || String(code) === '200') return res;

        // 错误提示拦截
        const messageTip = message || '服务器响应失败，请稍后再试';
        Vue.prototype.$message.error(messageTip);

        return Promise.reject(res);
    },
    (error) => {
        window.NProgress.done();
        Vue.prototype.$message.error('服务器内部异常');
        return Promise.reject(error);
    },
);

window.axios = Axios;
Vue.prototype.$http = Axios;
