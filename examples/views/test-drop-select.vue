<template>
  <div class="test-drop-select">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1、普通单选下拉选择</h4>
      </div>
      <p>{{ $t('当前已选择') }}：{{ value1 || '--' }}</p>
      <sib-item
        v-model="value1"
        :props="props1"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>2、从接口请求数据</h4>
        <li>配置 requestConfig: { url: ' ', method: ' ', params: { }, callback: () => {} } </li>
        <li>optionProps: { key: ' ', value: ' ' } 获取完后台数据后，通过配置optionProps用于指定选中的数据中value字段用于展示，key字段用来保存</li>
        <li>setInitialVal: true 表示请求接口获取到数据后，默认选中第一条</li>
      </div>
      <p>{{ $t('当前已选择') }}：{{ value2 || '--' }}</p>
      <sib-item
        v-model="value2"
        :props="props2"
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
    name: 'TestDropdown',
    data() {
        return {
            value1: '1',
            props1: {
                type: 'dropselect',
                options: [
                    {
                        key: '1',
                        value: '金樽清酒斗十千',
                    },
                    {
                        key: '2',
                        value: '玉盘珍羞直万钱',
                    },
                    {
                        key: '3',
                        value: '停杯投箸不能食',
                    },
                    {
                        key: '4',
                        value: '拔剑四顾心茫然',
                    },
                    {
                        key: '5',
                        value: '欲渡黄河冰塞川',
                    },
                    {
                        key: '6',
                        value: '将登太行雪满山',
                    },
                ],
            },
            value2: '',
            props2: {
                type: 'dropselect',
                setInitialVal: true,
                optionProps: {
                    key: 'id',
                    value: 'name',
                },
                requestConfig: {
                    url: '/table-data.json',
                    method: 'get',
                    params: {},
                    // 请求完数据的回调，可以用来修改数据结构
                    callback: (res) => res.data.data.records,
                },
            },
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'String（多选时，类型为Array）',
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
                    des: '表单元素的类型(必传type=dropdown)',
                    type: 'String',
                    values: 'dropdown',
                    defaultVal: '-',
                },
                {
                    params: 'props.value',
                    des: '若绑定值为空，将获取该值作为初始值',
                    type: 'Array',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.size',
                    des: '尺寸大小',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: "'small'",
                },
                {
                    params: 'props.setInitialVal',
                    des: '若从接口获取下拉选项，配置 setInitialVal: true 可以使该下拉框默认赋值第一个选项',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.disabled',
                    des: '是否禁用',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.placement',
                    des: '下拉选项弹出位置',
                    type: 'String',
                    values: 'top/top-start/top-end/bottom/bottom-start/bottom-end',
                    defaultVal: "'bottom'",
                },
                {
                    params: 'props.placeholder',
                    des: '占位提示',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择'",
                },
                {
                    params: 'props.clearable',
                    des: '是否展示清空图标',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'props.options',
                    des: '下拉选项配置',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[]',
                },
                {
                    params: 'props.options[i].key',
                    des: '下拉选项选中时保存的键',
                    type: '-',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.options[i].value',
                    des: '下拉选项展示的值',
                    type: '-',
                    values: '-',
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
                    params: 'props.optionProps',
                    des: "指定下拉选项配置的键/值所对应的code，一般用于配置接口从后台获取数据的情况，默认展示的字段叫value，获取值的字段叫key，可能后台返回的数据中并不包含key和value，而是叫id和name，那么此时你需要配置成{ key: 'id', value: ''name' }",
                    type: 'Object',
                    values: '-',
                    defaultVal: "{ key: 'key', value: ''value' }",
                },
                {
                    params: 'props.optionProps.key',
                    des: '指定下拉选项配置的主键所对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'key'",
                },
                {
                    params: 'props.optionProps.value',
                    des: '指定下拉选项配置的展示值所对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'value'",
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'props.requestConfig',
                    des: '接口请求配置项(如果使用接口请求下拉数据，则传入的 options 无效)',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'props.requestConfig.url',
                    des: '接口请求地址',
                    type: 'String',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: 'props.requestConfig.method',
                    des: '请求方式',
                    type: 'String',
                    values: 'get/post',
                    defaultVal: "'get'",
                },
                {
                    params: 'props.requestConfig.params',
                    des: '请求参数',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'props.requestConfig.callback',
                    des: '请求到数据后的回调，可以用来修改源数据结构',
                    type: 'Function',
                    values: '-',
                    defaultVal: 'null',
                },
                {
                    params: 'props.requestConfig.stringify',
                    des: '通过接口请求数据时是否使用表单提交请求参数',
                    type: 'Boolean',
                    values: 'true, false',
                    defaultVal: 'false',
                },
            ],
            eventData: [
                {
                    name: 'item-change',
                    des: '表单项值变更抛出的事件',
                    params: 'value',
                },
                {
                    name: 'select-change',
                    des: '下拉框 select 事件',
                    params: '{ value, formatValue, checkedNodes, checkedLeafNodes }',
                },
            ],
            slotData: [],
        };
    },
};
</script>

<style lang="scss">
.test-drop-select {
}
</style>
