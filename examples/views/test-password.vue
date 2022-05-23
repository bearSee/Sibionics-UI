<template>
  <div class="test-password">
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
    name: 'TestPassword',
    data() {
        return {
            props: {
                type: 'password',
                placeholder: '输入个锤子',
                showPassword: true,
                maxlength: 30,
                prefix: 'el-icon-microphone',
                suffix: 'el-icon-microphone',
                trim: 'none',
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
                    des: '表单元素的类型(必传type=password)',
                    type: 'String',
                    values: 'password',
                    defaultVal: '-',
                },
                {
                    params: 'props.trim',
                    des: '是否过滤空格（all: 过滤所有空格；common: 过滤首尾空格；none: 不过滤空格）',
                    type: 'String',
                    values: 'all/common/none',
                    defaultVal: "'all'",
                },
                {
                    params: 'props.placeholder',
                    des: '输入框占位提示',
                    type: 'String',
                    values: '',
                    defaultVal: '请输入',
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
                    params: 'props.showPassword',
                    des: '是否展示密码',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.prefix',
                    des: '输入框头部图标',
                    type: 'String',
                    values: 'element-ui支持的图标对应的class',
                    defaultVal: '-',
                },
                {
                    params: 'props.suffix',
                    des: '输入框尾部图标',
                    type: 'String',
                    values: 'element-ui支持的图标对应的class',
                    defaultVal: '-',
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
                    des: '是否支持清空',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
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
.test-password {
}
</style>
