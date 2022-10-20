import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/locale';

import en from './lang/en';
import cn from './lang/cn';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: window.localStorage.getItem('lang') || 'zh-CN',
    messages: {
        'en-US': { ...messages['en-US'], ...en },
        'zh-CN': { ...messages['zh-CN'], ...cn },
    },
});

export default i18n;
