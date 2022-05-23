<template>
  <div class="test-date">
    <div
      v-for="(conf, i) in configs"
      :key="i">
      <h2>{{ conf.title }}</h2>
      <h3>1、使用示例</h3>
      <example
        v-if="conf.common"
        :ignore-keys="['input']">
        <div slot="describe">
          <template v-if="conf.describes">
            <li
              v-for="des in conf.describes"
              :key="des">
              {{ des }}
            </li>
          </template>
          <li v-else>
            基础用法
          </li>
        </div>
        <p>{{ $t('当前已选择') }}：{{ conf.common.value || '--' }}</p>
        <sib-item
          v-model="conf.common.value"
          :props="conf.common.props"
        />
      </example>
      <example
        :ignore-keys="['input']"
        v-if="conf.format">
        <div slot="describe">
          <li>使用format</li>
        </div>
        <p>{{ $t('当前已选择') }}：{{ conf.format.value || '--' }}</p>
        <sib-item
          v-model="conf.format.value"
          :props="conf.format.props"
        />
      </example>
      <config-table
        step="attributes"
        title="2、特有配置"
        v-if="conf.attributeData"
        :table-data="conf.attributeData" />
    </div>
    <h2>公共基础配置</h2>
    <config-table
      step="attributes"
      title="Attributes"
      :table-data="attributeData" />
    <config-table
      step="attributes"
      title="Picker Options"
      :table-data="pickerOptionsData" />
    <config-table
      step="attributes"
      title="Shortcuts"
      :table-data="shortcutsData" />
    <el-backtop target=".master-page" />
  </div>
</template>

<script>

export default {
    name: 'TestDate',
    data() {
        return {
            configs: [
                {
                    title: '一、年选择器',
                    common: {
                        value: '2021',
                        props: {
                            type: 'year',
                        },
                    },
                    format: {
                        value: '2021 年',
                        props: {
                            type: 'year',
                            format: 'yyyy 年',
                            valueFormat: 'yyyy 年',
                        },
                    },
                    attributeData: [
                        {
                            params: 'props.type',
                            des: '表单元素的类型(必传type=year)',
                            type: 'String',
                            values: 'year',
                            defaultVal: '-',
                        },
                    ],
                },
                {
                    title: '二、月选择器',
                    describes: [
                        'format、valueFormat 规则默认为 yyyy-MM',
                    ],
                    common: {
                        value: '2021-10',
                        props: {
                            type: 'month',
                        },
                    },
                    attributeData: [
                        {
                            params: 'props.type',
                            des: '表单元素的类型(必传type=month)',
                            type: 'String',
                            values: 'month',
                            defaultVal: '-',
                        },
                    ],
                },
                {
                    title: '三、日期选择器',
                    describes: [
                        'format、valueFormat 规则默认为 yyyy-MM-dd',
                    ],
                    common: {
                        value: '2021-10-08',
                        props: {
                            type: 'date',
                        },
                    },
                    attributeData: [
                        {
                            params: 'props.type',
                            des: '表单元素的类型(必传type=date)',
                            type: 'String',
                            values: 'date',
                            defaultVal: '-',
                        },
                    ],
                },
                {
                    title: '四、年月日时分秒选择器',
                    describes: [
                        'format、valueFormat 规则默认为 yyyy-MM-dd HH:mm:ss',
                    ],
                    common: {
                        value: '2021-10-08 11:11:11',
                        props: {
                            type: 'datetime',
                        },
                    },
                    attributeData: [
                        {
                            params: 'props.type',
                            des: '表单元素的类型(必传type=datetime)',
                            type: 'String',
                            values: 'datetime',
                            defaultVal: '-',
                        },
                    ],
                },
                {
                    title: '五、选择多个日期',
                    describes: [
                        'format、valueFormat 规则默认为 yyyy-MM-dd',
                    ],
                    common: {
                        value: ['2021-10-06', '2021-10-08'],
                        props: {
                            type: 'dates',
                        },
                    },
                    attributeData: [
                        {
                            params: 'props.type',
                            des: '表单元素的类型(必传type=dates)',
                            type: 'String',
                            values: 'dates',
                            defaultVal: '-',
                        },
                    ],
                },
                {
                    title: '六、年月范围选择',
                    describes: [
                        'format、valueFormat 规则默认为 yyyy-MM',
                    ],
                    common: {
                        value: ['2021-08', '2021-10'],
                        props: {
                            type: 'monthrange',
                        },
                    },
                    attributeData: [
                        {
                            params: 'props.type',
                            des: '表单元素的类型(必传type=monthrange)',
                            type: 'String',
                            values: 'monthrange',
                            defaultVal: '-',
                        },
                    ],
                },
                {
                    title: '七、年月日范围选择',
                    describes: [
                        'format、valueFormat 规则默认为 yyyy-MM-dd',
                    ],
                    common: {
                        value: ['2021-10-06', '2021-10-08'],
                        props: {
                            type: 'daterange',
                        },
                    },
                    attributeData: [
                        {
                            params: 'props.type',
                            des: '表单元素的类型(必传type=daterange)',
                            type: 'String',
                            values: 'daterange',
                            defaultVal: '-',
                        },
                    ],
                },
                {
                    title: '八、年月日时分秒范围选择',
                    describes: [
                        'format、valueFormat 规则默认为 yyyy-MM-dd HH:mm:ss',
                    ],
                    common: {
                        value: ['2021-10-06 06:00:00', '2021-10-08 08:30:59'],
                        props: {
                            type: 'datetimerange',
                        },
                    },
                    attributeData: [
                        {
                            params: 'props.type',
                            des: '表单元素的类型(必传type=datetimerange)',
                            type: 'String',
                            values: 'datetimerange',
                            defaultVal: '-',
                        },
                    ],
                },
            ],
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'String/Array',
                    values: '单日期选择器数据类型为String，连接类型选择器数据类型为Array',
                    defaultVal: '-',
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
                    values: '不同类型日期选择器见每个示例特殊配置Attributes',
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
                    params: 'props.pickerOptions',
                    des: '当前时间选择器特有的选项',
                    type: 'Object',
                    values: '详细配置见Element-ui的date-picker组件 Picker Options 配置说明',
                    defaultVal: '-',
                },
                {
                    params: 'props.format',
                    des: '根据format规则修改展示的值',
                    type: 'String',
                    values: '',
                    defaultVal: '不同类型的选择器format规则见示例',
                },
                {
                    params: 'props.valueFormat',
                    des: '根据valueFormat规则修改绑定的值',
                    type: 'String',
                    values: '',
                    defaultVal: '不同类型的选择器valueFormat规则见示例',
                },
                {
                    params: 'props.placeholder',
                    des: '输入框占位提示，单选择器有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择'",
                },
                {
                    params: 'props.startPlaceholder',
                    des: '起始时间占位提示，连接日期选择器有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择起始时间'",
                },
                {
                    params: 'props.endPlaceholder',
                    des: '截止时间占位提示，连接日期选择器有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择结束时间'",
                },
                {
                    params: 'props.rangeSeparator',
                    des: '连接框的连接符号，连接日期选择器有效',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.value',
                    des: '若绑定值为空，将获取该值作为初始值',
                    type: 'String/Array',
                    values: '单日期选择器数据类型为String，连接类型选择器数据类型为Array',
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
                    params: 'props.clearable',
                    des: '是否支持清空',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
            ],
            pickerOptionsData: [
                {
                    params: 'shortcuts',
                    des: '设置快捷选项，需要传入 { text, onClick } 对象用法参考下表',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'disabledDate',
                    des: '设置禁用状态，参数为当前日期，要求返回 Boolean',
                    type: 'Function',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'cellClassName',
                    des: '设置日期的 className',
                    type: 'Function(Date)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'firstDayOfWeek',
                    des: '周起始日',
                    type: 'Number',
                    values: '1 到 7',
                    defaultVal: '7',
                },
                {
                    params: 'onPick',
                    des: '选中日期后会执行的回调，只有当 daterange 或 datetimerange 才生效',
                    type: 'Function({ maxDate, minDate })',
                    values: '-',
                    defaultVal: '-',
                },
            ],
            shortcutsData: [
                {
                    params: 'text',
                    des: '标题文本',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'onClick',
                    des: '选中后的回调函数，参数是 vm，可通过触发 \'pick\' 事件设置选择器的值。例如 vm.$emit(\'pick\', new Date())',
                    type: 'Function',
                    values: '-',
                    defaultVal: '-',
                },
            ],
        };
    },
};
</script>

<style lang="scss">
.test-date {
  .example .sib-item {
    width: 400px;
  }
}
</style>
