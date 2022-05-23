<template>
  <div class="test-table-picker">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1、弹窗选择器基础用法</h4>
        <li>code：选中行后，从该行数据内获取code对应字段的值，必传</li>
      </div>
      <p>当前选中：{{ value1 }}</p>
      <sib-item
        v-model="value1"
        :props="props1"
        @table-picker-change="tablePickerChange"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>2、showCode 设置选中后展示的内容</h4>
        <li>showCode：选中行后，从该行数据内获取showCode对应字段的值，用于展示，若未指定showCode，则直接展示code对应字段的值</li>
      </div>
      <p>当前选中：{{ value2 }}</p>
      <sib-item
        v-model="value2"
        :props="props2"
        @table-picker-change="tablePickerChange"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>3、从接口请求数据</h4>
        <li>配置 requestConfig，可实现通过后台接口获取数据，此时tableConfig.data无效</li>
        <li>requestAlways：是否每次打开弹窗都去重新请求接口数据</li>
        <li>requestAlways = false，表示只请求一次，此时 requestConfig.totalCallback 无效，然后需注意确保数据源获取正常，可使用 requestConfig.callback 改变数据源获取方式</li>
      </div>
      <p>当前选中：{{ value3 }}</p>
      <sib-item
        v-model="value3"
        :props="props3"
        @table-picker-change="tablePickerChange"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>4、多选</h4>
        <li>配置 tableConfig.multiple 为 true 即可实现多选</li>
      </div>
      <p>当前选中：{{ value4 }}</p>
      <sib-item
        v-model="value4"
        :props="props4"
        @table-picker-change="tablePickerChange"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>5、设置默认选中</h4>
        <li>需要额外传入初始展示值 formatValue</li>
      </div>
      <p>当前选中：{{ value5 }}</p>
      <sib-item
        v-model="value5"
        :format-value="formatValue"
        :props="props5"
        @table-picker-change="tablePickerChange"
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
    name: 'TestTablePicker',
    data() {
        const query = [
            {
                label: '姓名',
                code: 'name',
                type: 'text',
            },
        ];
        const field = [
            {
                label: '姓名 (name)',
                code: 'name',
            },
            {
                label: '人员编码 (code)',
                code: 'code',
            },
        ];
        const data = [
            {
                name: '张三',
                code: '001',
                rowId: '1',
            },
            {
                name: '李四',
                code: '002',
                rowId: '2',
            },
            {
                name: '王五',
                code: '003',
                rowId: '3',
            },
            {
                name: '奔跑的提款机',
                code: '666',
                rowId: '4',
            },
            {
                name: '前端爱好者',
                code: '004',
                rowId: '5',
            },
            {
                name: '菜鸟',
                code: '005',
                rowId: '6',
            },
            {
                name: '旗鼓相当的对手',
                code: '006',
                rowId: '7',
            },
        ];
        return {
            value1: [],
            props1: {
                type: 'table',
                code: 'code',
                tableConfig: {
                    query,
                    field,
                    data,
                },
            },
            value2: [],
            props2: {
                type: 'table',
                code: 'code',
                showCode: 'name',
                tableConfig: {
                    query,
                    field,
                    data,
                },
            },
            value3: [],
            props3: {
                type: 'table',
                code: 'code',
                showCode: 'name',
                tableConfig: {
                    query,
                    field,
                    data: [],
                },
                requestAlways: false,
                requestConfig: {
                    url: '/table-data.json',
                    method: 'get',
                    params: {},
                    callback: (res) => ((res && res.data || {}).data || {}).records || [],
                },
            },
            value4: [],
            props4: {
                type: 'table',
                code: 'code',
                showCode: 'name',
                tableConfig: {
                    multiple: true,
                    query,
                    field,
                    data: [],
                },
                requestConfig: {
                    url: '/table-data.json',
                    method: 'get',
                    params: {},
                },
            },
            value5: ['666', '000'],
            formatValue: '奔跑的提款机,小策',
            props5: {
                type: 'table',
                code: 'code',
                showCode: 'name',
                tableConfig: {
                    multiple: true,
                    query,
                    field,
                    data: [],
                },
                requestConfig: {
                    url: '/table-data.json',
                    method: 'get',
                    params: {},
                },
            },
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'Array',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'formatValue',
                    des: '设置默认选中展示的值',
                    type: 'String',
                    values: '',
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
                    des: '表单元素的类型(必传type=table)',
                    type: 'String',
                    values: 'table',
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
                    params: 'props.placeholder',
                    des: '选择框占位提示',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择'",
                },
                {
                    params: 'props.label',
                    des: '弹窗标题',
                    type: 'String',
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
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'props.tableConfig',
                    des: '弹窗表格配置项',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'props.tableConfig.multiple',
                    des: '是否支持多选',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.tableConfig.rowSize',
                    des: '表格查询条件一行展示多少个(同sib-table的row-size)',
                    type: 'Number',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'props.tableConfig.query',
                    des: '表格查询条件配置项(同sib-table的search-info)',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'props.tableConfig.field',
                    des: '表格列配置项(同sib-table的table-column)',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'props.tableConfig.data',
                    des: '表格数据(同sib-table的table-data)',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'props.tableConfig.requestAlways',
                    des: '如果配置了 requestConfig 请求接口数据，requestAlways 则控制是否每次打开弹窗都重新请求数据，为false则只请求一次数据',
                    type: 'Boolean',
                    values: 'true, false',
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
                    params: 'props.requestConfig',
                    des: '接口请求配置项(如果使用接口请求表格数据，则props.tableConfig.data无效)',
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
                    defaultVal: 'get',
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
                    params: 'props.requestConfig.totalCallback',
                    des: '请求到数据后的回调，可以用来指定数据总条数total。总条数total如果在 res.data.total 或 res.data.totalCount 中拿不到，请使用该方法手动返回总条数，否则会导致无法分页',
                    type: 'Function(res)',
                    values: '-',
                    defaultVal: '当页数据条数总和',
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
                    name: 'table-picker-change',
                    des: '选中行之后提交',
                    params: 'rows, value',
                },
            ],
            slotData: [],
        };
    },
    methods: {
        tablePickerChange({ rows, value }) {
            console.log('选中的行数据：', rows, '\n对应的值：', value);
        },
    },
};
</script>

<style lang="scss">
.test-table-picker {
  .sib-item {
    width: 300px;
  }
}
</style>
