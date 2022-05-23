<template>
  <div class="test-number">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1、普通number输入框</h4>
      </div>
      <sib-item
        v-model="value1"
        :props="props1" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>2、设置 step ，控制加减按钮的步长</h4>
      </div>
      <sib-item
        v-model="value2"
        :props="props2" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>3、stepStrictly 设置为 true ，即只能输入 step 的倍数</h4>
      </div>
      <sib-item
        v-model="value3"
        :props="props3" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>4、隐藏控制按钮，限制输入区间5-100</h4>
      </div>
      <sib-item
        v-model="value4"
        :props="props4" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>5、小数位数限制为最多两位</h4>
      </div>
      <sib-item
        v-model="value5"
        :props="props5" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>6、使用计算器辅助工具</h4>
        <li>配置 showCalculator: true，可展示计算器工具</li>
      </div>
      <sib-item
        v-model="value6"
        :props="props6" />
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
    name: 'TestText',
    data() {
        return {
            props1: {
                type: 'number',
                placeholder: '输入个锤子',
            },
            value1: 0,
            props2: {
                type: 'number',
                step: 3,
            },
            value2: 1,
            props3: {
                type: 'number',
                step: 2.3,
                stepStrictly: true,
            },
            value3: 2.3,
            props4: {
                type: 'number',
                min: 5,
                max: 100,
                controls: false,
            },
            value4: 88,
            props5: {
                type: 'number',
                precision: 2,
                controls: false,
            },
            value5: 56,
            props6: {
                type: 'number',
                precision: 2,
                controls: false,
                showCalculator: true,
            },
            value6: 0,
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'Number',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'props',
                    des: '表单元素配置',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'props.size',
                    des: '尺寸大小',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: "'small'",
                },
                {
                    params: 'props.type',
                    des: '表单元素的类型(必传type=number)',
                    type: 'String',
                    values: 'number',
                    defaultVal: '-',
                },
                {
                    params: 'props.placeholder',
                    des: '输入框占位提示',
                    type: 'String',
                    values: '',
                    defaultVal: "'请输入'",
                },
                {
                    params: 'props.disabled',
                    des: '是否禁用',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.value',
                    des: '若绑定值为空，将获取该值作为初始值',
                    type: 'Number',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.min',
                    des: '设置计数器允许的最小值',
                    type: 'Number',
                    values: '-',
                    defaultVal: '-Infinity',
                },
                {
                    params: 'props.max',
                    des: '设置计数器允许的最大值',
                    type: 'Number',
                    values: '-',
                    defaultVal: 'Infinity',
                },
                {
                    params: 'props.step',
                    des: '计数器步长',
                    type: 'Number',
                    values: '-',
                    defaultVal: '1',
                },
                {
                    params: 'props.precision',
                    des: '数值精度',
                    type: 'Number',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.stepStrictly',
                    des: '是否只能输入 step 的倍数',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.controls',
                    des: '是否使用控制按钮',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.controlsPosition',
                    des: '控制按钮位置',
                    type: 'String',
                    values: 'right',
                    defaultVal: '-',
                },
                {
                    params: 'props.showCalculator',
                    des: '是否展示计算器辅助工具',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.copyValue',
                    des: '是否允许点击结果值时，将值复制到粘贴板',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.showHistory',
                    des: '是否展示计算记录面板',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
            ],
            eventData: [
                {
                    name: 'item-change',
                    des: '值修改后抛出的事件',
                    params: 'value',
                },
            ],
            slotData: [],
        };
    },
};
</script>

<style lang="scss">
.test-number {
  .example-box {
    .sib-item {
      width: 250px;
    }
  }
}
</style>
