<template>
  <div class="transition-page">
    <div
      v-for="(conf, i) in configs"
      :key="i">
      <h2>{{ $t(conf.title || '') }}</h2>
      <example
        :excess-template-string="conf.excessTemplateString"
        :css-templatetring="cssTemplatetring"
        :default-data="conf.data">
        <div slot="describe">
          <template v-if="conf.describes">
            <li
              v-for="des in conf.describes"
              :key="des">
              {{ $t(des) }}
            </li>
          </template>
        </div>
        <div>
          <template v-if="conf.isComponent">
            <div>
              <el-button @click="conf.show = !conf.show">
                {{ $t('点击我') }}
              </el-button>
              <div class="box-container transition-box-container">
                <el-collapse-transition>
                  <div v-show="conf.show">
                    <div class="box transition-box">
                      el-collapse-transition
                    </div>
                    <div class="box transition-box">
                      el-collapse-transition
                    </div>
                  </div>
                </el-collapse-transition>
              </div>
            </div>
          </template>
          <template v-else>
            <el-button @click="conf.show = !conf.show">
              {{ $t('点击我') }}
            </el-button>
            <div class="box-container">
              <transition
                v-for="name in conf.classNames"
                :key="name"
                :name="name">
                <div
                  v-show="conf.show"
                  class="box">
                  .{{ name }}
                </div>
              </transition>
            </div>
          </template>
        </div>
      </example>
    </div>
    <el-backtop target=".master-page" />
  </div>
</template>

<script>
export default {
    name: 'TransitionPage',
    data() {
        return {
            cssTemplatetring: `
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409EFF;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }`,
            configs: [
                {
                    title: 'fade 淡入淡出',
                    describes: [],
                    isComponent: false,
                    classNames: ['el-fade-in-linear', 'el-fade-in'],
                    show: true,
                    data: { show: true },
                    excessTemplateString: // eslint-disable-next-line vue/script-indent
    `<el-button @click="show = !show">${this.$t('点击我')}</el-button>
        <div style="display: flex; margin-top: 20px; height: 100px;">
            <transition name="el-fade-in-linear">
                <div v-show="show" class="transition-box">.el-fade-in-linear</div>
            </transition>
            <transition name="el-fade-in">
                <div v-show="show" class="transition-box">.el-fade-in</div>
            </transition>
        </div>`,
                },
                {
                    title: 'zoom 缩放',
                    describes: [],
                    isComponent: false,
                    classNames: ['el-zoom-in-center', 'el-zoom-in-top', 'el-zoom-in-bottom'],
                    show: true,
                    data: { show: true },
                    excessTemplateString: // eslint-disable-next-line vue/script-indent
    `<el-button @click="show = !show">${this.$t('点击我')}</el-button>
        <div style="display: flex; margin-top: 20px; height: 100px;">
            <transition name="el-zoom-in-center">
                <div v-show="show" class="transition-box">.el-zoom-in-center</div>
            </transition>
            <transition name="el-zoom-in-top">
                <div v-show="show" class="transition-box">.el-zoom-in-top</div>
            </transition>
            <transition name="el-zoom-in-bottom">
                <div v-show="show" class="transition-box">.el-zoom-in-bottom</div>
            </transition>
        </div>`,
                },
                {
                    title: 'collapse 展开折叠',
                    describes: ['使用 el-collapse-transition 组件实现折叠展开效果'],
                    isComponent: true,
                    show: true,
                    data: { show: true },
                    excessTemplateString: // eslint-disable-next-line vue/script-indent
    `<el-button @click="show = !show">${this.$t('点击我')}</el-button>
        <div style="margin-top: 20px; height: 200px;">
            <el-collapse-transition>
                <div v-show="show">
                    <div class="transition-box">el-collapse-transition</div>
                    <div class="transition-box">el-collapse-transition</div>
                </div>
            </el-collapse-transition>
        </div>`,
                },
            ],
        };
    },
};
</script>

<style lang="scss">
@import '../assets/styles/scss/theme.scss';

.transition-page {
  .box-container {
    margin-top: 20px;
    height: 110px;
    .box {
      margin-bottom: 10px;
      width: 200px;
      height: 100px;
      border-radius: 4px;
      background-color: $theme;
      text-align: center;
      color: #fff;
      padding: 40px 20px;
      box-sizing: border-box;
      margin-right: 20px;
      display: inline-block;
      &.transition-box {
        display: block;
      }
    }
    &.transition-box-container {
      height: 210px;
    }
  }
}
</style>
