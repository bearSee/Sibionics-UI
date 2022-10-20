<template>
  <div class="quick-use">
    <div
      class="code-box"
      v-for="(item, index) in data"
      :key="index">
      <h2>{{ $t(item.title || '') }}</h2>
      <h3>{{ item.subTitle || '' }}</h3>
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
    name: 'QuickUse',
    data() {
        return {
            data: [
                {
                    title: '引入 sibionics-ui',
                    des: [
                        '当前只提供完整引入，你可以按照以下步骤在 main.js 内进行引入',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`import Vue from 'vue';
import App from './App';

// ${this.$t('引入 sibionics-ui')}
import sibUI from 'sibionics-ui';

// ${this.$t('引入样式表')}
import 'sibionics-ui/lib/sibionics.css';

Vue.use(sibUI);


new Vue({
    render: h => h(App),
}).$mount('#app');
`,
                },
                {
                    title: '引入 sibionics-ui 后，以下方法会自动挂载在基本数据类型的原型上',
                    subTitle: 'String.formatTime',
                    des: [
                        '你可以使用 {n} 来截取时间字符串中的年月日时分秒，并进行任意组合',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`const dateTime = '2021-10-20 22:22:22';

const time1 = dateTime.formatTime('{0}年{1}月{2}日 {3}时{4}分{5}秒');
const time2 = dateTime.formatTime('{0}-{1}');
const time3 = dateTime.formatTime('{3}-{4}');
const time4 = dateTime.formatTime('年：{0} 时：{3}');

console.log(time1)  // 2021年10月20日 22时22分22秒
console.log(time2)  // 2021-10
console.log(time3)  // 22时22分
console.log(time4)  // 年：2021 时：22
`,
                },
                {
                    subTitle: 'Number.toFixed',
                    des: [
                        '该方法是基于原 Number 原型上的 toFixed 方法进行重写，修复了其精度丢失的bug，使用规则与原来一模一样',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`const number = 0.235;

// ${this.$t('引入sibionics之前')}
console.log(number.toFixed(2))  // 0.23

// ${this.$t('引入sibionics之后')}
console.log(number.toFixed(2))  // 0.24
`,
                },
                {
                    title: '以下对象会自动挂载在 window 对象上',
                    subTitle: 'NProgress',
                    des: [
                        '该对象提供了 start 和 done 表示开始和结束加载进度的两个方法，其作用是模拟展示浏览器数据加载的进度条，一般可配置在 axios 接口拦截处',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`// axios.js

import Vue from 'vue';
import axios from 'axios';

const Axios = axios.create();

// 在 request 拦截器中，展示进度条
axios.interceptors.request.use(config => {
  window.NProgress.start()
  return config
});

// 在 response 拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  window.NProgress.done()
  return config
});
`,
                },
                {
                    title: '以下方法会自动挂载在 window.SIB 对象上',
                    subTitle: 'deepCopy',
                    des: [
                        '该方法的作用是对对象进行深拷贝',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`const obj = { a: 1, b: 2 };
const obj1 = obj;
const obj2 = window.SIB.deepCopy(obj);

console.log(obj1)  // { a: 1, b: 2 }
console.log(obj2)  // { a: 1, b: 2 }

obj.a = 999;

console.log(obj)  // { a: 999, b: 2 }
console.log(obj1)  // { a: 999, b: 2 }
console.log(obj2)  // { a: 1, b: 2 }
`,
                },
                {
                    subTitle: 'download',
                    des: [
                        '该方法的作用是下载附件',
                        '它接收两个参数，第一个为 附件url地址 或者 Blob 对象，第二个为文件名(需要带后缀，非必传)',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`// 根据 url 下载附件
const fileSrc = 'http://www.bearsee.com.cn/images/catcher-grain.jpg';
window.SIB.download(fileSrc);

// 根据 Blob 对象 下载附件
const blob = new Blob(['<a id="a"><b id="b">hello world!</b></a>'], { type : 'text/html' });
window.SIB.download({ data: blob }, 'demo.html');
`,
                },
                {
                    subTitle: 'getuuid',
                    des: [
                        '该方法的作用是获取随机uuid',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`console.log(window.SIB.getuuid())  // 7972e6a3-c0f5-4d8d-b7bb-28c238f82b0e
`,
                },
                {
                    subTitle: 'getCertainDate',
                    des: [
                        '用于获取距离今日 n 天的日期',
                        '它接收两个参数，第一个为距离今天的天数(Number)，可以为负数，第二个为返回的日期格式',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`// ${this.$t('默认获取今天日期')}
const date1 = window.SIB.getCertainDate();
console.log(date1)  // 2021-10-21

// ${this.$t('第一个参数传0，也相当于获取今天的日期，第二个参数为格式化规则')}
const date2 = window.SIB.getCertainDate(0, 'YYYY年MM月DD日 hh时mm分ss秒S毫秒 第q季度');
console.log(date2)  // 2021年10月21日 11时22分05秒403毫秒 第4季度

// ${this.$t('获取后天的日期')}
const date3 = window.SIB.getCertainDate(2, 'YYYY-MM-DD hh:mm:ss');
console.log(date3)  // '2021-10-23 11:22:05'

// ${this.$t('获取前三天的日期')}
const date4 = window.SIB.getCertainDate(-3);
console.log(date4)  // '2021-10-18'`,
                },
                {
                    subTitle: 'repairAccuracy',
                    des: [
                        '该方法的作用是将数值在运算后丢失精度的结果转为正常值',
                        '它接收两个参数，第一个为需要处理的数值(Number或者String，最后都会转成Number类型)，第二个是输出的结果需要保留的小数位数',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`const num1 = 0.1 + 0.2;
const num2 = window.SIB.repairAccuracy(0.1 + 0.2);
const num3 = window.SIB.repairAccuracy(0.1028 + 0.2342, 2);

console.log(num1)  // 0.30000000000000004
console.log(num2)  // 0.3
console.log(num3)  // 0.34
`,
                },
                {
                    subTitle: 'isMobilePhone',
                    des: [],
                    code: // eslint-disable-next-line vue/script-indent
`console.log(window.SIB.isMobilePhone('18888888888'))  // true
`,
                },
                {
                    subTitle: 'isTelephone',
                    des: [],
                    code: // eslint-disable-next-line vue/script-indent
`console.log(window.SIB.isTelephone('0755-88888888'))  // true
`,
                },
                {
                    subTitle: 'isEmail',
                    des: [],
                    code: // eslint-disable-next-line vue/script-indent
`console.log(window.SIB.isEmail('123456@163.com'))  // true
`,
                },
                {
                    subTitle: 'isURL',
                    des: [],
                    code: // eslint-disable-next-line vue/script-indent
`console.log(window.SIB.isURL('http://www.bearsee.com.cn/sibionics-ui'))  // true
`,
                },
                {
                    subTitle: 'isIdentityCode',
                    des: [],
                    code: // eslint-disable-next-line vue/script-indent
`console.log(window.SIB.isIdentityCode('430321199503106666'))  // false (${this.$t('校验位错误')})
`,
                },
                {
                    subTitle: 'verificationRules',
                    des: [],
                    code: // eslint-disable-next-line vue/script-indent
`const { checkUsername, checkPassword, checkCode } = window.SIB.verificationRules;

// ${this.$t('字母，数字，下划线')}
console.log(checkUsername('abcd_123'))  // true

// ${this.$t('以字母开头，长度在6位以上，只能包含字母、数字和下划线')}
console.log(checkPassword('abcd123456'))  // true

// ${this.$t('以字母开头，只能包含字母、数字和下划线')}
console.log(checkCode('abcd123456'))  // true
`,
                },
            ],
        };
    },
};
</script>

<style lang="scss">

.quick-use {
  .code-box {
    padding: 15px 0;
  }
  pre {
    display: flex;
  }
}
</style>
