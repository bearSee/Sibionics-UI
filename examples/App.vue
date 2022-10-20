<template>
  <el-container
    id="app"
    v-watermark="watermark">
    <el-header>
      <a
        class="logo"
        href="https://www.npmjs.com/package/sibionics-ui"
        target="_blank">Sibionics UI {{ $t('组件库演示') }}</a>
      <sib-item
        v-model="lang"
        :props="langProps" />
    </el-header>
    <el-container>
      <sib-menu
        class="side-menu"
        show-collapse
        unique-opened
        :menus="menu" />
      <el-container>
        <el-main class="main-container">
          <router-view class="main-container-page" />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
const isDevelopment = process.env.NODE_ENV === 'development';

export default {
    data() {
        return {
            loadingBox: (text = '') => this.$loading({
                lock: true,
                text,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            }),
            watermark: `sibionics-ui ${this.$t('组件库演示')}`,
            lang: window.localStorage.getItem('lang') || 'zh-CN',
            langProps: {
                type: 'dropselect',
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
            menu: [
                {
                    name: '组件库说明',
                    id: 'components-index',
                    icon: 'el-icon-location',
                    children: [
                        {
                            name: '安装',
                            path: '/install',
                        },
                        {
                            name: '快速上手',
                            path: '/quick-use',
                        },
                        {
                            name: '国际化',
                            path: '/internationalization',
                        },
                        {
                            name: '自定义主题色',
                            path: '/custom-theme',
                        },
                        {
                            name: '内置指令',
                            path: '/directives',
                        },
                        {
                            name: '内置filter过滤方式',
                            path: '/filter',
                        },
                        {
                            name: 'utils 插件',
                            path: '/plug-in-unit',
                        },
                        {
                            name: '内置过渡动画',
                            path: '/transition',
                        },
                        {
                            name: '版本更新',
                            path: '/version-tips',
                        },
                    ],
                },
                {
                    name: '普通组件',
                    id: 'components-common',
                    icon: 'el-icon-menu',
                    children: [
                        {
                            name: 'Menu 菜单',
                            path: '/menu',
                        },
                        {
                            name: 'IndexPage 菜单主页',
                            path: '/index-page',
                        },
                        {
                            name: 'CommonPage 公用列表页',
                            path: '/common-page',
                        },
                        {
                            name: 'Dropdown 下拉菜单',
                            path: '/Dropdown',
                        },
                        {
                            name: 'Charts 图表',
                            path: '/charts',
                        },
                        {
                            name: 'Calculator 计算器',
                            path: '/calculator',
                        },
                        {
                            name: 'Formula 公式构造器',
                            path: '/formula',
                        },
                        {
                            name: 'Table 表格',
                            path: '/table',
                        },
                        {
                            name: 'Tree 树',
                            path: '/tree',
                        },
                        {
                            name: 'TableDialog 弹窗表格',
                            path: '/table-dialog',
                        },
                        {
                            name: 'TreeDialog 弹窗树',
                            path: '/tree-dialog',
                        },
                        {
                            name: 'Throttle 防抖',
                            path: '/throttle',
                        },
                    ],
                },
                {
                    name: '表单组件',
                    id: 'components-form',
                    icon: 'el-icon-document',
                    children: [
                        {
                            name: 'Form 表单',
                            path: '/form',
                        },
                    ],
                },
                {
                    name: '表单元素组件',
                    id: 'components-form-son',
                    icon: 'el-icon-setting',
                    children: [
                        {
                            name: 'Label 展示',
                            path: '/label',
                        },
                        {
                            name: 'Text 文本框',
                            path: '/text',
                        },
                        {
                            name: 'Password 密码框',
                            path: '/password',
                        },
                        {
                            name: 'Textarea 文本域',
                            path: '/textarea',
                        },
                        {
                            name: 'Number 数值框',
                            path: '/number',
                        },
                        {
                            name: 'InputRange 文本连接框',
                            path: '/input-range',
                        },
                        {
                            name: 'NumberRange 数值连接框',
                            path: '/number-range',
                        },
                        {
                            name: 'Select 下拉选择器',
                            path: '/select',
                        },
                        {
                            name: 'DropSelect 下拉选择器',
                            path: '/drop-select',
                        },
                        {
                            name: 'Cascader 级联选择器',
                            path: '/cascader',
                        },
                        {
                            name: 'Check 复选框',
                            path: '/check',
                        },
                        {
                            name: 'Radio 单选框',
                            path: '/radio',
                        },
                        {
                            name: 'Switch 开关',
                            path: '/switch',
                        },
                        {
                            name: 'Date 日期选择器',
                            path: '/date',
                        },
                        {
                            name: 'Time 时间选择器',
                            path: '/time',
                        },
                        {
                            name: 'Week 周选择器',
                            path: '/week',
                        },
                        {
                            name: 'Upload 上传',
                            path: '/upload',
                        },
                        {
                            name: 'TablePicker 表格弹窗选择器',
                            path: '/table-picker',
                        },
                        {
                            name: 'TreePicker 树弹窗选择器',
                            path: '/tree-picker',
                        },
                    ],
                },
                {
                    name: 'Vue原型方法',
                    id: 'components-prototype',
                    icon: 'el-icon-star-off',
                    children: [
                        {
                            name: 'Download 下载',
                            path: '/download',
                        },
                    ],
                },
                ...(isDevelopment ? [{
                    name: '本地调试',
                    path: '/test-component',
                    icon: 'el-icon-star-on',
                }] : []),
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
@import './assets/styles/scss/theme.scss';

html {
  overflow: hidden;
}
html,body {
  height: 100%;
  background-color: #f9fbff;
  padding: 0;
  margin: 0;
}
body {
  font-size: 14px;
}
textarea {
  font-family: inherit;
}
a {
  text-decoration:none;
  color: inherit;
}
#app {
  height: 100%;
  & > .el-container {
    height: calc(100% - 60px);
  }
}
#app {
  & > .el-header {
    color: #FFF;
    line-height: 60px;
    background-color: $theme; /* 不支持线性的时候显示 */
    background-image: linear-gradient(to right, #ecf8ff theme);
    display: flex;
    justify-content: space-between;
    .logo {
      font-size: 24px;
      letter-spacing: 3px;
    }
    .slogon {
      font-size: 14px;
      color: #F7F7F7;
      margin-left: 10px;
    }
    .sib-item {
      width: 100px;
      .sib-dropdown {
        justify-content: center;
        .dropdown-link span {
          color: #fff;
        }
      }
    }
  }
  & > .side-menu {
    max-width: 250px;
    .el-menu {
      height: 100%;
      overflow-y: auto;
    }
  }
}
pre {
  box-sizing: border-box;
  background: #23241f;
  overflow: auto;
  border-radius: 5px;
  padding: 20px;
  code {
    color: #fff;
    font-family: sans-serif;
  }
}
.example {
  box-sizing: border-box;
  margin: 10px 0;
  box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%), 0 2px 4px 0 rgb(232 237 250 / 50%);
  .slot-content {
    padding: 20px;
    background: #fff;
    border-bottom: 1px solid #ebeef5;
  }
  p {
    margin-bottom: 10px;
  }
}
.main-container {
  &>div {
    display: flex;
    flex-direction: column;
  }
}
a:not(.logo) {
  color: $theme;
}
</style>
