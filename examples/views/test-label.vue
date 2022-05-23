<template>
  <div class="test-label">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <!-- 示例1 -->
    <example :ignore-keys="['input']">
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
    name: 'TestLabel',
    data() {
        return {
            props: {
                type: 'label',
            },
            value: '世上本没有路，走的人多了，便成了路。',
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
                    params: 'props.type',
                    des: '表单元素的类型(必传type=label)',
                    type: 'String',
                    values: 'label',
                    defaultVal: '-',
                },
                {
                    params: 'props.value',
                    des: '若绑定值为空，将获取该值作为初始值',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
            ],
            eventData: [],
            slotData: [],
        };
    },
};
</script>

<style lang="scss">
.test-label {
}
</style>
