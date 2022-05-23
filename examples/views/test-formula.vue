<template>
  <div class="test-formula">
    <h3>
      {{ $t('使用前') }}
    </h3>
    <li>首先需要在 index.html 的 &lt;head /&gt; 标签内引入 Mathjax 数学公式的 CDN 地址</li>
    <pre>
        <code>&lt;script type="text/javascript" src="//cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML">&lt;/script&gt;</code>
      </pre>
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example>
      <div slot="describe">
        <h4>基础示例</h4>
        <p>complete: 点击完成后抛出的事件;参数类型为 Object，包含以下三个字段</p>
        <li>functionString: 可被eval的fn字符串，传入包含变量的对象后自动返回计算结果;</li>
        <li>formula: 计算公式; </li>
        <li>mathjax: Mathjax规则的展示代码</li>
      </div>
      <sib-formula @complete="handlerComplete1" />
    </example>
    <example :template-string="templateString">
      <div slot="describe">
        <h4>结合 &lt;sib-form&gt; 动态构造计算公式</h4>
        <li>variables: 传入的默认变量列表；例如：[{ name: '数值1', key: 'number1', ..., }] name表示变量名称, key代表代入计算时的变量字段</li>
        <li>delVariable: 是否允许删除变量, 默认为 true</li>
      </div>
      <sib-formula
        :variables="variables"
        :del-variable="false"
        @complete="handlerComplete" />
      <sib-form
        v-if="isUpdated"
        :is-submit="false"
        :is-cancel="false"
        :row-size="4"
        :item-info="itemInfo" />
    </example>
    <config-table
      step="attributes"
      :table-data="attributeData" />
    <config-table
      step="events"
      :table-data="eventData" />
    <config-table
      step="slots"
      :table-data="slotData" />
    <el-backtop target=".master-page" />
  </div>
</template>

<script>

export default {
    name: 'TestFormula',
    data() {
        return {
            isUpdated: true,
            variables: [
                {
                    name: '数值1',
                    key: 'number1',
                },
                {
                    name: '数值2',
                    key: 'number2',
                },
                {
                    name: '数值3',
                    key: 'number3',
                },
                {
                    name: '数值4',
                    key: 'number4',
                },
            ],
            itemInfo: [
                {
                    label: '数值1',
                    code: 'number1',
                    type: 'text',
                    valueType: 'number',
                },
                {
                    label: '数值2',
                    code: 'number2',
                    type: 'text',
                    valueType: 'number',
                },
                {
                    label: '数值3',
                    code: 'number3',
                    type: 'number',
                },
                {
                    label: '数值4',
                    code: 'number4',
                    type: 'number',
                },
                {
                    label: '结果',
                    code: 'result',
                    type: 'label',
                    relationResults: '',
                },
            ],
            attributeData: [
                {
                    params: 'variables',
                    des: '默认变量列表, name表示变量名称, key代表代入计算时的变量字段',
                    type: 'Array',
                    values: "[{ name: '', key: '' }]",
                    defaultVal: '[ ]',
                },
                {
                    params: 'delVariable',
                    des: '是否允许删除变量',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
            ],
            eventData: [
                {
                    name: 'complete',
                    des: '点击完成后抛出的事件; functionString: 可被eval的fn字符串，传入包含变量的对象后自动返回计算结果; formula: 计算公式; mathjax: Mathjax规则的展示代码',
                    params: '{ functionString, formula, mathjax }',
                },
            ],
            slotData: [],
            templateString: `
<template>
  <div class="test-formula-configuration">
    <sib-formula
      :variables="variables"
      :del-variable="false"
      @complete="handlerComplete" />
    <sib-form
      v-if="isUpdated"
      :is-submit="false"
      :is-cancel="false"
      :row-size="2"
      :item-info="itemInfo" />
  </div>
</template>

<script>

export default {
    name: 'FormulaConfiguration',
    data() {
        return {
            isUpdated: true,
            variables: [
                {
                    name: '数值1',
                    key: 'number1',
                },
                {
                    name: '数值2',
                    key: 'number2',
                },
                {
                    name: '数值3',
                    key: 'number3',
                },
                {
                    name: '数值4',
                    key: 'number4',
                },
            ],
            itemInfo: [
                {
                    label: '数值1',
                    code: 'number1',
                    type: 'text',
                    valueType: 'number',
                },
                {
                    label: '数值2',
                    code: 'number2',
                    type: 'text',
                    valueType: 'number',
                },
                {
                    label: '数值3',
                    code: 'number3',
                    type: 'number',
                },
                {
                    label: '数值4',
                    code: 'number4',
                    type: 'number',
                },
                {
                    label: '结果',
                    code: 'result',
                    type: 'label',
                    relationResults: '',
                },
            ],
        };
    },
    methods: {
        handlerComplete({ functionString }) {
            this.isUpdated = false;
            const index = this.itemInfo.findIndex(({ code }) => code === 'result');
            this.$set(this.itemInfo[index], 'relationResults', functionString);
            this.$set(this.itemInfo[index], 'labelTips', '公式更新为：' + 'functionString');
            this.$nextTick(() => {
                this.isUpdated = true;
                this.$notify({
                    title: '公式应用成功',
                    message: '请在下方修改输入框的值，【结果】将依据定义的公式进行动态变化',
                });
            });
        },
    },
};
< /script>
<style lang="scss">
.test-formula-configuration {
    .sib-form {
        margin-top: 20px;
    }
}
</style>
`,
        };
    },
    methods: {
        handlerComplete1(obj) {
            console.log('公式构造完成：\n', obj);
        },
        handlerComplete({ functionString }) {
            this.isUpdated = false;
            const index = this.itemInfo.findIndex(({ code }) => code === 'result');
            this.$set(this.itemInfo[index], 'relationResults', functionString);
            this.$set(this.itemInfo[index], 'labelTips', `公式更新为：\n${functionString}`);
            this.$nextTick(() => {
                this.isUpdated = true;
                this.$notify({
                    title: '公式应用成功',
                    message: '请在下方修改输入框的值，【结果】将依据定义的公式进行动态变化',
                });
            });
        },
    },
};
</script>

<style lang="scss">
.test-formula {
    .sib-form {
        margin-top: 20px;
    }
}
</style>
