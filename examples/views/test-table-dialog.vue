<template>
  <div class="test-table-dialog">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :excess-template-string="excessTemplateString">
      <div slot="describe">
        <h4>1、{{ $t('单选弹窗选择器') }}</h4>
      </div>
      <div>
        <p>{{ $t('当前已选择') }}：{{ selections1.length ? selections1 : '--' }}</p>
        <el-button
          type="primary"
          @click="visible1 = true">
          {{ $t('点击打开单选弹窗选择器') }}
        </el-button>
      </div>
      <sib-table-picker
        :title="$t('单选弹窗选择器')"
        row-key="rowId"
        :visible.sync="visible1"
        :table-config="tableConfig1"
        @selection-change="selectionChange($event, 'selections1')"
      />
    </example>
    <example :excess-template-string="excessTemplateString">
      <div slot="describe">
        <h4>2、{{ $t('多选弹窗选择器') }}</h4>
      </div>
      <div>
        <p>{{ $t('当前已选择') }}：{{ selections2.length ? selections2 : '--' }}</p>
        <el-button
          type="primary"
          @click="visible2 = true">
          {{ $t('点击打开多选弹窗选择器') }}
        </el-button>
      </div>
      <sib-table-picker
        :title="$t('多选弹窗选择器')"
        row-key="rowId"
        :visible.sync="visible2"
        :table-config="tableConfig2"
        @selection-change="selectionChange($event, 'selections2')"
      />
    </example>
    <example :excess-template-string="excessTemplateString">
      <div slot="describe">
        <h4>3、{{ $t('请求接口获取数据') }}</h4>
        <li>{{ $t('配置 requestConfig，可实现通过后台接口获取数据，此时 tableConfig.data 无效') }}</li>
      </div>
      <div>
        <p>{{ $t('当前已选择') }}：{{ selections3.length ? selections3 : '--' }}</p>
        <el-button
          type="primary"
          @click="visible3 = true">
          {{ $t('点击打开弹窗选择器') }}
        </el-button>
      </div>
      <sib-table-picker
        :title="$t('通过请求接口获取数据')"
        row-key="rowId"
        :visible.sync="visible3"
        :table-config="tableConfig2"
        :request-config="requestConfig"
        @selection-change="selectionChange($event, 'selections3')"
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
        const tableConfig = {
            // 关闭多选
            multiple: false,
            rowSize: 2,
            query: [
                {
                    label: '姓名',
                    code: 'name',
                    type: 'text',
                },
            ],
            field: [
                {
                    label: '姓名',
                    code: 'name',
                },
                {
                    label: '人员编码',
                    code: 'code',
                },
            ],
            data: [
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
            ],
        };
        return {
            excessTemplateString: `<el-button type="primary" @click="visible = true">${this.$t('点击打开弹窗选择器')}</el-button>`,
            visible1: false,
            tableConfig1: JSON.parse(JSON.stringify(tableConfig)),
            selections1: [],
            visible2: false,
            tableConfig2: JSON.parse(JSON.stringify({ ...tableConfig, multiple: true })),
            selections2: [],
            visible3: false,
            selections3: [],
            requestConfig: {
                url: '/table-data.json',
                method: 'get',
                params: {},
            },
            attributeData: [
                {
                    params: 'visible',
                    des: '是否显示 table选择器，支持 .sync 修饰符',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'title',
                    des: '弹窗标题',
                    type: 'String',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: 'width',
                    des: '弹窗宽度',
                    type: 'String',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: 'selected',
                    des: '已选择的数据',
                    type: '[String, Array]',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'tableConfig',
                    des: '弹窗表格配置项',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'tableConfig.rowKey',
                    des: '表格所在行的唯一键',
                    type: 'String',
                    values: '-',
                    defaultVal: "'id'",
                },
                {
                    params: 'tableConfig.multiple',
                    des: '是否支持多选',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'tableConfig.rowSize',
                    des: '表格查询条件一行展示多少个(同sib-table的row-size)',
                    type: 'Number',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'tableConfig.query',
                    des: '表格查询条件配置项(同sib-table的search-info)',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'tableConfig.field',
                    des: '表格列配置项(同sib-table的table-column)',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'tableConfig.data',
                    des: '表格数据(同sib-table的table-data)',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'tableConfig.pageParamKeys',
                    des: '若配置了 requestConfig 请求接口数据，接口查询基础字段名配置（排序方式，排序字段名，当前页码，当页条数）',
                    type: 'Object',
                    values: '-',
                    defaultVal: "{ orderByClause: 'orderByClause', orderBy: 'orderBy', pageIndex: 'pageIndex', pageSize: 'pageSize',}",
                },
                {
                    params: 'tableConfig.isPagination',
                    des: '是否需要分页',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'tableConfig.pageSize',
                    des: '每页显示条目个数',
                    type: 'Number',
                    values: '-',
                    defaultVal: '10',
                },
                {
                    params: 'tableConfig.pageSizes',
                    des: '每页显示个数选择器的选项设置',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[5, 10]',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'requestConfig',
                    des: '接口请求配置项(如果使用接口请求表格数据，则tableConfig.data无效)',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'requestConfig.url',
                    des: '接口请求地址',
                    type: 'String',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: 'requestConfig.method',
                    des: '请求方式',
                    type: 'String',
                    values: 'get/post',
                    defaultVal: "'get'",
                },
                {
                    params: 'requestConfig.params',
                    des: '请求参数',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'requestConfig.callback',
                    des: '请求到数据后的回调，可以用来修改源数据结构',
                    type: 'Function',
                    values: '-',
                    defaultVal: 'null',
                },
                {
                    params: 'requestConfig.stringify',
                    des: '通过接口请求数据时是否使用表单提交请求参数',
                    type: 'Boolean',
                    values: 'true, false',
                    defaultVal: 'false',
                },
            ],
            eventData: [
                {
                    name: 'selection-change',
                    des: '选中行change事件',
                    params: 'rows',
                },
            ],
            slotData: [],
        };
    },
    methods: {
        selectionChange(rows, key) {
            this[key] = rows;
            console.log('选中的行数据：', rows);
        },
    },
};
</script>

<style lang="scss">
.test-table-dialog {
}
</style>
