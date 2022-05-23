<template>
  <div class="filter">
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
      <template v-if="item.title === 'formatDate'">
        <li>{{ $t('默认过滤') }}：{{ date | formatDate }}</li>
        <li>
          {{ $t('自定义过滤') }}：{{ date | formatDate('YYYY年MM月DD日 hh时mm分ss秒S毫秒 第q季度') }}
        </li>
      </template>
      <template v-else-if="item.title === 'formatMoney'">
        <li> {{ $t('默认过滤') }}：{{ money | formatMoney }}</li>
        <li> {{ $t('自定义过滤') }}：{{ money | formatMoney(3) }}</li>
      </template>
    </div>
    <el-backtop target=".master-page" />
  </div>
</template>

<script>
export default {
    name: 'FilterPage',
    data() {
        return {
            date: new Date(),
            money: '15627.25684',
            data: [
                {
                    title: 'formatDate',
                    des: [
                        '如果遇到 Date 格式数据，你可以在模板层使用 formatDate，使其变成你想要的日期格式',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`<template>
    <li>${this.$t('默认过滤')}：{{ date | formatDate }}</li>
    <li>${this.$t('自定义过滤')}：{{ date | formatDate('YYYY年MM月DD日 hh时mm分ss秒S毫秒 第q季度') }}</li>
</template>

<script>
    export default {
        data() {
            return {
                date: new Date(),
            };
        },
    };
</ script>
`,
                },
                {
                    title: 'formatMoney',
                    des: [
                        'formatMoney 是格式化金额数字的方法',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`<template>
    <li>${this.$t('默认过滤')}：{{ money | formatMoney }}</li>
    <li>${this.$t('自定义过滤')}：{{ money | formatMoney(3) }}</li>
</template>

<script>
    export default {
        data() {
            return {
                money: '15627.25684',
            };
        },
    };
</ script>
`,
                },
            ],
        };
    },
};
</script>

<style lang="scss">

.filter {
  .code-box {
    padding: 15px 0;
  }
  pre {
    display: flex;
  }
}
</style>
