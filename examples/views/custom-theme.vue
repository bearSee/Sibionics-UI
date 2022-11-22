<template>
  <div class="custom-theme">
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
    <el-backtop target=".master-page" />
  </div>
</template>

<script>
export default {
    name: 'CustomTheme',
    data() {
        return {
            data: [
                {
                    title: '创建样式文件',
                    des: [
                        '你可以创建一个 scss 样式文件，例如文件名可以叫 global-style.scss',
                        '然后在 main.js 中，不再引入 sibionics-ui 的打包后的样式，而是引入你创建的这个 global-style.scss 样式文件',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`import Vue from 'vue';
import App from './App';

// ${this.$t('引入 sibionics-ui')}
import sibUI from 'sibionics-ui';

// ${this.$t('引入')} global-style.scss，${this.$t('来替代')} sibionics-ui/lib/sibionics.css
import './global-style.scss';

Vue.use(sibUI);


new Vue({
    render: h => h(App),
}).$mount('#app');
`,
                },
                {
                    subTitle: 'global-style.scss',
                    code: // eslint-disable-next-line vue/script-indent
`/* ${this.$t('设置全局主题色')} */
$--color-primary: red;

@import "~sibionics-ui/lib/theme-chalk/index.scss";
`,
                },
            ],
        };
    },
};
</script>

<style lang="scss">

.custom-theme {
  .code-box {
    padding: 15px 0;
  }
  pre {
    display: flex;
  }
}
</style>
