<template>
  <div class="master">
    <h2>
      {{ $t('欢迎使用') }} Sibionics UI（v{{ version }}）
      <span class="element-target">
        （{{ $t('基于') }}
        <a
          href="https://element.eleme.cn/"
          target="_blank">Element UI</a>）
      </span>
      —— {{ componentName }}
    </h2>
    <router-view class="master-page vertical-scroll" />
  </div>
</template>

<script>
const version = require('../../package.json').version;

export default {
    name: 'Master',
    data() {
        return {
            version,
        };
    },
    computed: {
        componentName() {
            return this.$t(this.$route.name || '');
        },
    },
};
</script>

<style lang="scss">
@import '../assets/styles/scss/theme.scss';

.master {
  width: 100%;
  height: 100%;
  & > div:not(.el-backtop) {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 3.16em);
    padding: 10px 20px;
    overflow: auto;
  }
  .element-target {
    font-size: 16px;
    color: $theme;
  }
}
</style>
