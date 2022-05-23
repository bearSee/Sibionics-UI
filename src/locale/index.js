import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import en from './lang/en';
import cn from './lang/cn';

const registerI18n = (vue, config) => {
    const locales = {
        'en-US': {
            ...enLocale,
            ...en,
            ...(config.languages['en-US'] || config.languages.en || {}),
        },
        'zh-CN': {
            ...zhLocale,
            ...cn,
            ...(config.languages['zh-CN'] || config.languages.cn || {}),
        },
    };

    vue.use(VueI18n);

    vue.config.lang = config.lang || 'zh-CN';

    Object.keys(locales).forEach((lang) => {
        vue.locale(lang, locales[lang]);
    });
};

export default (vue, config) => {
    if (config.languages && Object.prototype.toString.call(config.languages) === '[object Object]') {
        registerI18n(vue, config);
        return;
    }
    vue.prototype.$t = (key) => key;
};
