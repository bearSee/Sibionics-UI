<template>
  <div class="test-text">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <sib-item
        v-model="value"
        :props="props"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>使用 valueType 格式化输入框的文本内容</h4>
        <li>valueType: letter 输入框失焦后，将自动过滤掉 非大小写字母 以外的字符</li>
        <li>valueType: number 输入框失焦后，将使用 parseFloat 将内容进行转换。</li>
        <li>valueType: letter-number 输入框失焦后，将自动过滤掉 非大小写字母、数字以及下划线 以外的字符</li>
      </div>
      <sib-item
        v-model="value1"
        :props="props1"
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
    name: 'TestText',
    data() {
        return {
            props: {
                type: 'text',
                placeholder: '输入个锤子',
                showWordLimit: true,
                maxlength: 30,
                prefix: 'el-icon-microphone',
                trim: 'none',
                unit: '天/次',
                // unit: '<span class="unit-btn">按钮</span>',
            },
            value: '世上本没有路，走的人多了，便成了路。',
            props1: {
                type: 'text',
                valueType: 'number',
            },
            value1: '',
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
                    des: '表单元素的类型(必传type=text)',
                    type: 'String',
                    values: 'text',
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
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.valueType',
                    des: '输入框失焦后，会将内容进行转换',
                    type: 'String',
                    values: 'letter/number/letter-number',
                    defaultVal: '-',
                },
                {
                    params: 'props.min',
                    des: 'props.valueType 为 number 时生效，限制数字的最小值',
                    type: 'Number',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.max',
                    des: 'props.valueType 为 number 时生效，限制数字的最大值',
                    type: 'Number',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.precision',
                    des: 'props.valueType 为 number 时，支持配置 props.precision 控制数值精度(小数位数)',
                    type: 'String/Number',
                    values: '-',
                    defaultVal: '0',
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
                    params: 'props.prefixText',
                    des: '输入框头部文本',
                    type: 'String',
                    values: '-',
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
                    params: 'props.suffixText',
                    des: '输入框尾部文本',
                    type: 'String',
                    values: '-',
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
    mounted() {
        // this.$el.querySelector('.unit-btn').onclick = () => {
        //     // eslint-disable-next-line no-alert
        //     alert(this.value);
        // };
    },
};
</script>

<style lang="scss">
.test-text {
}
</style>
