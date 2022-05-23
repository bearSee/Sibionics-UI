<template>
  <div class="test-textarea">
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
    name: 'TestTextarea',
    data() {
        return {
            props: {
                type: 'textarea',
                placeholder: '输入个锤子',
                maxlength: 300,
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
                    params: 'props.size',
                    des: '尺寸大小',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: "'small'",
                },
                {
                    params: 'props.type',
                    des: '表单元素的类型(必传type=textarea)',
                    type: 'String',
                    values: 'textarea',
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
                    params: 'props.value',
                    des: '若绑定值为空，将获取该值作为初始值',
                    type: 'String',
                    values: '-',
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
                    params: 'props.readonly',
                    des: '是否只读',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.resize',
                    des: '控制是否能被用户缩放',
                    type: 'String',
                    values: 'none, both, horizontal, vertical',
                    defaultVal: '-',
                },
                {
                    params: 'props.rows',
                    des: '文本域高度固定展示为多少行',
                    type: 'Number',
                    values: '-',
                    defaultVal: '2',
                },
                {
                    params: 'props.autosize',
                    des: '输入框头部图标',
                    type: '[Boolean, Object]',
                    values: '自适应内容高度，可传入对象，如，{ minRows: 2, maxRows: 6 }',
                    defaultVal: '{ minRows: 4, maxRows: 6 }',
                },
                {
                    params: 'props.maxlength',
                    des: '可输入的最大长度',
                    type: 'Number',
                    values: '-',
                    defaultVal: '-',
                },
            ],
            eventData: [
                {
                    name: 'item-change',
                    des: '输入框失焦后值修改抛出的事件',
                    params: 'value',
                },
            ],
            slotData: [],
        };
    },
};
</script>

<style lang="scss">
.test-textarea {
}
</style>
