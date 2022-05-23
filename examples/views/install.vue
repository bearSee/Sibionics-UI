<template>
  <div class="install">
    <div
      class="code-box"
      v-for="(item, index) in data"
      :key="index">
      <h2>{{ $t(item.title) }}</h2>
      <pre>
        <code>{{ item.code }}</code>
      </pre>
    </div>
    <div class="des-box">
      <a
        href="https://npmmirror.com/package/sibionics-ui"
        target="_blank">{{ $t('点击查看') }} Sibionics UI {{ $t('所有版本') }}</a>
      <h4>{{ $t('注意') }}：</h4>
      <li>{{ $t('sibionics-ui 内置了 element-ui@2.15.6 版本的依赖，因此你在项目中无需安装 element-ui 且不需要引入它，即可使用它的所有功能') }}</li>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Install',
    data() {
        return {
            data: [
                {
                    title: 'npm安装',
                    code: 'npm i sibionics-ui -S',
                },
                {
                    title: 'npm安装指定版本',
                    code: 'npm i sibionics-ui@0.1.53 -S',
                },
                {
                    title: 'npm安装最新版本',
                    code: 'npm i sibionics-ui@latest -S',
                },
            ],
        };
    },
};
</script>

<style lang="scss">

.install {
  .code-box {
    padding: 15px 0;
  }
  pre {
    display: flex;
  }
}
</style>
