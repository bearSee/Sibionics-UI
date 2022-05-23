<template>
  <div class="test-switch">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <!-- 示例1 -->
    <example :ignore-keys="['input']">
      <p>当前绑定的值：{{ value }}</p>
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
    name: 'TestSwitch',
    data() {
        return {
            props: {
                type: 'switch',
                on: 1,
                off: 0,
            },
            value: 1,
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'String/Number',
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
                    des: '表单元素的类型(必传type=switch)',
                    type: 'String',
                    values: 'switch',
                    defaultVal: '-',
                },
                {
                    params: 'props.on',
                    des: '开启对应的值',
                    type: 'String',
                    values: '-',
                    defaultVal: 'on',
                },
                {
                    params: 'props.off',
                    des: '关闭对应的值',
                    type: 'String',
                    values: '-',
                    defaultVal: 'off',
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
                    type: 'String/Number',
                    values: '-',
                    defaultVal: '-',
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
.test-switch {
}
</style>
