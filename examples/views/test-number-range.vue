<template>
  <div class="test-number-range">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1、普通number连接框</h4>
      </div>
      <div class="number-range-value">
        {{ value1 }}
      </div>
      <sib-item
        v-model="value1"
        :props="props1" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>2、隐藏控制按钮，设置小数精度，控制输入范围 5 - 10</h4>
        <li>详情示例请参照 <a href="/sibionics-ui/#/number">Number表单元素</a></li>
      </div>
      <div class="number-range-value">
        {{ value2 }}
      </div>
      <sib-item
        v-model="value2"
        :props="props2" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>3、展示计算器辅助工具</h4>
        <li>配置 showCalculator: true，可展示计算器工具</li>
      </div>
      <div class="number-range-value">
        {{ value3 }}
      </div>
      <sib-item
        v-model="value3"
        :props="props3" />
    </example>
    <config-table :table-data="attributeData" />
    <config-table
      step="events"
      :table-data="eventData" />
  </div>
</template>

<script>
export default {
    name: 'TestNumberrange',
    data() {
        return {
            value1: [15, 26],
            props1: {
                type: 'numberrange',
            },
            value2: [5.3, 6.6],
            props2: {
                type: 'numberrange',
                min: 5,
                max: 10,
                precision: 1,
                controls: false,
            },
            value3: [10, 201],
            props3: {
                type: 'numberrange',
                controls: false,
                showCalculator: true,
                showHistory: true,
            },
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'Array',
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
                    des: '表单元素的类型(必传type=numberrange)',
                    type: 'String',
                    values: 'numberrange',
                    defaultVal: '-',
                },
                {
                    params: 'props.startPlaceholder',
                    des: '第一个输入框占位提示',
                    type: 'String',
                    values: '',
                    defaultVal: "'请输入'",
                },
                {
                    params: 'props.endPlaceholder',
                    des: '第二个输入框占位提示',
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
                    type: 'Array',
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
                    des: '输入框失焦后值修改抛出的事件',
                    params: 'value',
                },
            ],
        };
    },
};
</script>

<style lang="scss">
.test-number-range {
  .number-range-value {
    margin-bottom: 15px;
  }
  .sib-item {
    width: 450px;
  }
}
</style>
