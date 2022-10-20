<template>
  <div class="internationalization">
    <div
      class="code-box"
      v-for="(item, index) in data"
      :key="index">
      <h2>{{ $t(item.title || '') }}</h2>
      <h3>{{ $t(item.subTitle || '') }}</h3>
      <template v-if="item.des">
        <li
          v-for="d in item.des"
          :key="d">
          {{ $t(d) }}
        </li>
      </template>
      <pre>
        <code>{{ item.code }}</code>
      </pre>
    </div>
    <h2>{{ $t('效果就是这样') }}</h2>
    <sib-item
      v-model="lang"
      :props="langProps" />
    <h3>{{ $t('多语言测试') }}</h3>
    <el-backtop target=".master-page" />
  </div>
</template>

<script>
export default {
    name: 'Internationalization',
    data() {
        return {
            loadingBox: (text = '') => this.$loading({
                lock: true,
                text,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            }),
            lang: window.localStorage.getItem('lang') || 'zh-CN',
            langProps: {
                type: 'select',
                clearable: false,
                options: [
                    {
                        key: 'zh-CN',
                        value: '简体中文',
                    },
                    {
                        key: 'en-US',
                        value: 'English',
                    },
                ],
            },
            data: [
                {
                    title: '配置 I18n 国际化语言',
                    des: [
                        '在 main.js 入口引入 sibionics-ui 时，你可以将本地的国际化json文件 (一门语言需配置一个json) 配置成 languages，并在 Vue.use 时传入',
                        '你可以通过传入 lang ，声明默认语言',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`import Vue from 'vue';
import App from './App';
// 建议 vue-i18n 安装v8.x版本
import VueI18n from 'vue-i18n';

// ${this.$t('引入 sibionics-ui')}
import sibUI from 'sibionics-ui';

// ${this.$t('引入样式表')}
import 'sibionics-ui/lib/sibionics.css';

// ${this.$t('引入sibionics-ui语言包')}
import messages from 'sibionics-ui/lib/locale';
// ${this.$t('引入本地中文语言配置')}
import en from './locale/lang/en';
// ${this.$t('引入本地英文语言配置')}
import cn from './locale/lang/cn';
// ${this.$t('引入本地其他语言配置')}
// import xx from 'xx';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: window.localStorage.getItem('lang') || 'zh-CN',
    messages: {
        'en-US': { ...messages['en-US'], ...en },
        'zh-CN': { ...messages['zh-CN'], ...cn },
    },
});

Vue.use(sibUI, {
    // ${this.$t('控制饿了么组件默认尺寸，非必传， 可选值')}: large/small/mini
    size: 'mini',
});


new Vue({
    i18n,
    render: h => h(App),
}).$mount('#app');
`,
                },
                {
                    subTitle: 'cn.json',
                    des: [],
                    code: // eslint-disable-next-line vue/script-indent
`export default {
    多语言测试: '年轻人要多熬夜',
};
`,
                },
                {
                    subTitle: 'en.json',
                    des: [],
                    code: // eslint-disable-next-line vue/script-indent
`export default {
    多语言测试: 'Young people should stay up late',
};
`,
                },
                {
                    title: '模板层使用时',
                    des: [],
                    code: // eslint-disable-next-line vue/script-indent
`<template>
    <sib-item v-model="lang" :props="langProps" />
    <h3>{{ $t('多语言测试') }}</h3>
</template>

export default {
    data() {
        return {
            lang: window.localStorage.getItem('lang') || 'zh-CN',
            langProps: {
                type: 'select',
                clearable: false,
                options: [
                    {
                        key: 'zh-CN',
                        value: '简体中文',
                    },
                    {
                        key: 'en-US',
                        value: 'English',
                    },
                ],
            },
        };
    },
    watch: {
        lang(val) {
            window.localStorage.setItem('lang', val);
            this.$i18n.locale = val;
        },
    },
};
`,
                },
            ],
        };
    },
    watch: {
        lang(val) {
            window.localStorage.setItem('lang', val);
            this.$i18n.locale = val;
            // this.loadingBox(`${this.$t('语言切换中')}...`);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 100);
        },
    },
};
</script>

<style lang="scss">

.internationalization {
  .code-box {
    padding: 15px 0;
  }
  pre {
    display: flex;
  }
}
</style>
