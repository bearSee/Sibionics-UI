import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/install',
    },
    {
      path: '/master',
      name: 'master',
      redirect: '/install',
      component: () => import('./views/master'),
      children: [
        {
          path: '/test-component',
          name: '本地调试',
          component: () => import('./views/test-component'),
        },
        {
          path: '/install',
          name: '安装',
          component: () => import('./views/install'),
        },
        {
          path: '/quick-use',
          name: '快速上手',
          component: () => import('./views/quick-use'),
        },
        {
          path: '/internationalization',
          name: '国际化',
          component: () => import('./views/internationalization'),
        },
        {
          path: '/custom-theme',
          name: '自定义主题色',
          component: () => import('./views/custom-theme'),
        },
        {
          path: '/directives',
          name: '内置指令',
          component: () => import('./views/directives'),
        },
        {
          path: '/filter',
          name: '内置filter过滤方式',
          component: () => import('./views/filter'),
        },
        {
          path: '/plug-in-unit',
          name: 'utils 插件',
          component: () => import('./views/plug-in-unit'),
        },
        {
          path: '/transition',
          name: '内置过渡动画',
          component: () => import('./views/transition'),
        },
        {
          path: '/version-tips',
          name: '版本更新',
          component: () => import('./views/version-tips'),
        },
        {
          path: '/charts',
          name: 'Charts 图表',
          component: () => import('./views/test-charts'),
        },
        {
          path: '/calculator',
          name: 'Calculator 计算器',
          component: () => import('./views/test-calculator'),
        },
        {
          path: '/formula',
          name: 'Formula 公式构造器',
          component: () => import('./views/test-formula'),
        },
        {
          path: '/menu',
          name: 'Menu 菜单',
          component: () => import('./views/test-menu'),
        },
        {
          path: '/index-page',
          name: 'IndexPage 菜单主页',
          component: () => import('./views/test-index-page'),
          children: [
            {
              path: '/index-page/calculator',
              name: 'Calculator 计算器',
              component: () => import('./views/test-calculator'),
            },
            {
              path: '/index-page/table',
              name: 'Table 表格',
              component: () => import('./views/test-table'),
            },
          ],
        },
        {
          path: '/common-page',
          name: 'CommonPage 公用列表页',
          component: () => import('./views/test-common-page'),
        },
        {
          name: 'Dropdown 下拉菜单',
          path: '/Dropdown',
          component: () => import('./views/test-dropdown'),
        },
        {
          path: '/table',
          name: 'Table 表格',
          component: () => import('./views/test-table'),
        },
        {
          path: '/form',
          name: 'Form 表单',
          component: () => import('./views/test-form'),
        },
        {
          path: '/tree',
          name: 'Tree 树',
          component: () => import('./views/test-tree'),
        },
        {
          path: '/throttle',
          name: 'Throttle 防抖',
          component: () => import('./views/test-throttle'),
        },
        {
          path: '/label',
          name: 'Label 展示',
          component: () => import('./views/test-label'),
        },
        {
          path: '/text',
          name: 'Text 文本框',
          component: () => import('./views/test-text'),
        },
        {
          path: '/password',
          name: 'Password 密码框',
          component: () => import('./views/test-password'),
        },
        {
          path: '/textarea',
          name: 'Textarea 文本域',
          component: () => import('./views/test-textarea'),
        },
        {
          path: '/number',
          name: 'Number 数值框',
          component: () => import('./views/test-number'),
        },
        {
          path: '/input-range',
          name: 'InputRange 文本连接框',
          component: () => import('./views/test-input-range'),
        },
        {
          path: '/number-range',
          name: 'NumberRange 数值连接框',
          component: () => import('./views/test-number-range'),
        },
        {
          path: '/check',
          name: 'Check 复选框',
          component: () => import('./views/test-check'),
        },
        {
          path: '/radio',
          name: 'Radio 单选框',
          component: () => import('./views/test-radio'),
        },
        {
          path: '/switch',
          name: 'Switch 开关',
          component: () => import('./views/test-switch'),
        },
        {
          path: '/select',
          name: 'Select 下拉选择器',
          component: () => import('./views/test-select'),
        },
        {
          path: '/drop-select',
            name: 'DropSelect 下拉选择器',
            component: () => import('./views/test-drop-select'),
        },
        {
          path: '/cascader',
          name: 'Cascader 级联选择器',
          component: () => import('./views/test-cascader'),
        },
        {
          path: '/date',
          name: 'Date 日期选择器',
          component: () => import('./views/test-date'),
        },
        {
          path: '/time',
          name: 'Time 时间选择器',
          component: () => import('./views/test-time'),
        },
        {
          path: '/week',
          name: 'Week 周选择器',
          component: () => import('./views/test-week'),
        },
        {
          path: '/upload',
          name: 'Upload 上传',
          component: () => import('./views/test-upload'),
        },
        {
          path: '/download',
          name: 'Download 下载',
          component: () => import('./views/test-download'),
        },
        {
          path: '/table-picker',
          name: 'TablePicker 表格弹窗选择器',
          component: () => import('./views/test-table-picker'),
        },
        {
          path: '/tree-picker',
          name: 'TreePicker 树弹窗选择器',
          component: () => import('./views/test-tree-picker'),
        },
        {
          path: '/table-dialog',
          name: 'TablePicker 弹窗表格',
          component: () => import('./views/test-table-dialog'),
        },
        {
          path: '/tree-dialog',
          name: 'TreePicker 弹窗树',
          component: () => import('./views/test-tree-dialog'),
        },
      ],
    },
  ],
});

export default router;
