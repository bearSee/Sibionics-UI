<template>
  <div class="test-week">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <p>{{ $t('当前已选择') }}：{{ value || '--' }}</p>
      <sib-item
        v-model="value"
        :props="props"
      />
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
    name: 'TestWeek',
    data() {
        return {
            value: '',
            props: {
                type: 'week',
            },
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'String',
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
                    des: '表单元素的类型(必传type=week)',
                    type: 'String',
                    values: 'week',
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
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.placeholder',
                    des: '输入框占位提示，props.isRange不为true时有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择'",
                },
                {
                    params: 'props.pickerOptions',
                    des: '当前时间选择器特有的选项，参照饿了么UI DatePicker 中 Picker Options 配置',
                    type: 'Object',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.format',
                    des: '将选中的值转换成特定的时间格式',
                    type: 'String',
                    values: '',
                    defaultVal: "'yyyy 第 WW 周'",
                },
                {
                    params: 'props.clearable',
                    des: '是否展示清空图标',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
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
.test-week {
}
</style>
