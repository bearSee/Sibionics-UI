<template>
  <div class="test-input-range">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <div class="input-range-value">
        {{ value }}
      </div>
      <sib-item
        v-model="value"
        :props="props" />
    </example>
    <config-table :table-data="attributeData" />
    <config-table
      step="events"
      :table-data="eventData" />
  </div>
</template>

<script>
export default {
    name: 'TestInputRange',
    data() {
        return {
            value: ['一二三四五', '上山打老虎'],
            props: {
                type: 'inputrange',
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
                    des: '表单元素的类型(必传type=inputrange)',
                    type: 'String',
                    values: 'text',
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
                    params: 'props.rangeSeparator',
                    des: '连接符',
                    type: 'String',
                    values: '',
                    defaultVal: '-',
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
                    params: 'props.readonly',
                    des: '是否只读',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.showWordLimit',
                    des: '是否展示字数统计',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.maxlength',
                    des: '可输入的最大长度',
                    type: 'Number',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.clearable',
                    des: '展示清除图标',
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
.test-input-range {
  .input-range-value {
    margin-bottom: 15px;
  }
  .sib-item {
    width: 450px;
  }
}
</style>
