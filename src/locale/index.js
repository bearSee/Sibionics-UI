import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import en from './lang/en';
import cn from './lang/cn';

const messages = {
    'en-US': {
        ...enLocale,
        ...en,
    },
    'zh-CN': {
        ...zhLocale,
        ...cn,
    },
};

export default messages;
