<template>
  <div class="test-table">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example>
      <div slot="describe">
        <h4>1、{{ $t('普通表格') }}</h4>
      </div>
      <sib-table
        index-style="index"
        :is-pagination="false"
        :table-column="tableColumn1"
        :table-data="tableData" />
    </example>
    <example :slot-template-string="slotTemplateString">
      <div slot="describe">
        <h4>2、{{ $t('自定义列') }}</h4>
        <li>
          {{ $t('table-column 子元素配置支持使用 formatter 回调自定义展示内容，formatter 入参为当前行的数据') }}
        </li>
        <li>
          {{ $t(`table-column 单个列可支持配置 type="slot" 来使用内置插槽，并且在组件模板内嵌套该插槽，该插槽的 name 需与该列的 code 对应`) }}
        </li>
        <li>
          index-style: selection/index/expand/none => {{ $t('首列为:多选框/索引列/展开的按钮列/不显示该列') }}
        </li>
        <li>
          row-key: {{ $t('每一行的唯一键，默认设置为行id') }}；{{ $t('注意：如果每行数据存在唯一id则可省略传入该属性，如果每行数据内不存在id，则需要传入 row-key 指定唯一键') }}
        </li>
        <li>
          selected: {{ $t('默认选中的行，根据 row-key 提供的键与默认值去跟行数据匹配是否选中') }}
        </li>
      </div>
      <sib-table
        index-style="selection"
        row-key="id"
        :selected="['2']"
        :page-sizes="[1, 2, 5, 10]"
        :table-column="tableColumn2"
        :table-data="tableData"
        @selection-change="handlerSelectChange">
        <template #operate="{ row, index }">
          <el-button
            type="text"
            @click="handlerEdit(row, index)">
            {{ $t('编辑') }}
          </el-button>
        </template>
        <template #avatar="{ row }">
          <el-avatar :src="row.avatar" />
        </template>
      </sib-table>
    </example>
    <example :slot-template-string="slotTemplateString3">
      <div slot="describe">
        <h4>3、{{ $t('配置可展开行') }}</h4>
      </div>
      <sib-table
        row-key="id"
        index-style="expand"
        :table-column="tableColumn1"
        :table-data="tableData">
        <template #expand="{ row }">
          {{ row }}
        </template>
      </sib-table>
    </example>
    <example>
      <div slot="describe">
        <h4>4、{{ $t('添加查询模块') }}</h4>
        <li>
          {{ $t('该查询方式是由前端模糊匹配查询，分页方式也是前端基于数据筛选实现的分页') }}
        </li>
        <li>
          {{ $t('打开F12，查询、分页切换不会去掉接口') }}
        </li>
      </div>
      <sib-table
        row-key="id"
        :search-info="searchInfo"
        :table-column="tableColumn1"
        :table-data="tableData" />
    </example>
    <example>
      <div slot="describe">
        <h4>5、{{ $t('自动请求数据，自动后台分页') }}</h4>
        <li>
          {{ $t('一般而言，表格内的数据多半都是从后台接口获取，此时可以取消 table-data 的传入，并配置 request-config，可实现自动获取后台数据') }}
        </li>
        <li>
          {{ $t('数据查询、分页都是掉后台接口实现的数据渲染') }}
        </li>
        <li>
          {{ $t('打开F12，查询、分页切换可以看到它会去掉接口') }}
        </li>
        <li>
          requestConfig: { url: '{{ $t('接口地址') }}', method: '{{ $t('请求方式') }}', params: '{{ $t('请求参数') }}', callback: res => res.data };
        </li>
        <li>
          callback: {{ $t('请求完数据的回调，可以用来修改数据获取层级或者修改源数据结构，默认从 res.data.data 里取返回的数据用于渲染') }}
        </li>
      </div>
      <sib-table
        index-style="selection"
        row-key="id"
        :search-info="searchInfo"
        :table-column="tableColumn1"
        :request-config="requestConfig" />
    </example>
    <example
      :slot-template-string="slotTemplateString5"
      :method-template-string="methodTemplateString5">
      <div slot="describe">
        <h4>6、{{ $t('添加插槽') }}</h4>
      </div>
      <sib-table
        index-style="selection"
        :expand-text="$t('高级搜索')"
        :search-info="searchInfo"
        :table-column="tableColumn1"
        :table-data="tableData">
        <template #search-operate>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus">
            {{ $t('新增条目') }}
          </el-button>
        </template>
        <template #content-body="{ selections }">
          <el-button
            type="primary"
            size="small"
            @click.native="handlerBatchDelete(selections)">
            {{ $t('列表导出') }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click.native="handlerBatchDelete(selections)">
            {{ $t('批量删除') }}
          </el-button>
        </template>
      </sib-table>
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
    <config-table
      step="refs"
      :table-data="refData" />
    <el-backtop target=".master-page" />
  </div>
</template>

<script>
export default {
    name: 'TestTable',
    data() {
        return {
            searchInfo: [
                {
                    label: '姓名',
                    code: 'name',
                    type: 'text',
                },
                {
                    label: '性别',
                    code: 'sex',
                    type: 'text',
                },
                {
                    label: '年龄',
                    code: 'age',
                    type: 'text',
                },
                {
                    label: '身高',
                    code: 'height',
                    type: 'text',
                },
            ],
            tableColumn1: [
                {
                    label: '姓名',
                    code: 'name',
                },
                {
                    label: '性别',
                    code: 'sex',
                },
                {
                    label: '年龄',
                    code: 'age',
                },
                {
                    label: '身高',
                    code: 'height',
                },
                {
                    label: '状态',
                    code: 'status',
                },
            ],
            slotTemplateString: `
                <template #operate="{ row, index }">
                  <el-button
                    type="text"
                    @click="handlerEdit(row, index)">
                    ${this.$t('编辑')}
                  </el-button>
                </template>
                <template #avatar="{ row }">
                  <el-avatar :src="row.avatar" />
                </template>`,
            tableColumn2: [
                {
                    label: '姓名',
                    code: 'name',
                },
                {
                    label: '性别',
                    code: 'sex',
                },
                {
                    label: '年龄',
                    code: 'age',
                },
                {
                    label: '状态',
                    code: 'status',
                    formatter: (row) => ({ 1: '已婚', 0: '未婚' })[row.status],
                },
                {
                    label: '照片',
                    code: 'avatar',
                    type: 'slot',
                },
                {
                    label: '操作',
                    code: 'operate',
                    type: 'slot',
                },
            ],
            tableData: [
                {
                    id: '1',
                    name: '张三',
                    sex: '男',
                    age: 18,
                    height: 165,
                    status: 0,
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                },
                {
                    id: '2',
                    name: '李四',
                    sex: '男',
                    age: 20,
                    height: 185,
                    status: 1,
                    avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                },
                {
                    id: '3',
                    name: '王五',
                    sex: '女',
                    age: 19,
                    height: 170,
                    status: 0,
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                },
            ],
            requestConfig: {
                url: '/table-data.json',
                method: 'get',
                params: {},
                // 请求完数据的回调，可以用来修改数据结构
                // callback: (res) => res.data,
            },
            slotTemplateString3: `
                <!-- ${this.$t('#expand 实际上是 slot="expand" 的缩写, 展开子模块的行数据')} -->
                <template #expand="{ row }">
                    {{ row }}
                </template>`,
            slotTemplateString5: `
                <!-- ${this.$t('#search-operate 实际上是 slot="search-operate" 的缩写')} -->
                <!-- ${this.$t('#search-operate 代表搜索栏后位置的插槽')} -->
                <template #search-operate>
                    <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-plus">
                        ${this.$t('新增条目')}
                    </el-button>
                </template>
                
                <!-- ${this.$t('该插槽抛出两个参数')}: data => ${this.$t('当前页所有列表数据')} selections => ${this.$t('当前已勾选的数据')} -->
                <!-- ${this.$t('#content-body="{ selections }" 实际上是 slot="content-body" slot-scope="{ selections }" 的缩写')} -->
                <!-- ${this.$t('#content-body 介于搜索框和表格之间的部分，可插入相关操作按钮')} -->
                <template #content-body="{ selections, data }">
                    <el-button
                        type="primary"
                        size="small"
                        @click.native="handlerExport(selections)">
                        ${this.$t('列表导出')}
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        @click.native="handlerBatchDelete(selections)">
                        ${this.$t('批量删除')}
                    </el-button>
                </template>`,
            methodTemplateString5: `
                handlerExport(rows) {
                    this.$message.warning('${this.$t('你勾选了')}' + rows.length + '${this.$t('条')}${this.$t('数据')}');
                    console.log(rows);
                },
                handlerBatchDelete(rows) {
                    this.$message.warning('${this.$t('你勾选了')}' + rows.length + '${this.$t('条')}${this.$t('数据')}');
                    console.log(rows);
                },`,
            attributeData: [
                {
                    params: 'size',
                    des: '组件尺寸',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: "'small'",
                },
                {
                    params: 'enterable',
                    des: '是否支持敲回车查询',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'rowSize',
                    des: '搜索框一行展示多少个',
                    type: 'Number',
                    values: '-',
                    defaultVal: '4',
                },
                {
                    params: 'isCancel',
                    des: '是否需要重置按钮',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'lablePosition',
                    des: '表单域label的位置',
                    type: 'String',
                    values: 'left/top/right',
                    defaultVal: "'left'",
                },
                {
                    params: 'rules',
                    des: '搜索框表单校验规则(详细配置见element-ui)',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'labelWidth',
                    des: '表单域标签的宽度(0表示auto)',
                    type: 'Number',
                    values: '-',
                    defaultVal: '0',
                },
                {
                    params: 'expandAll',
                    des: '是否展示全部搜索条件',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'expandText',
                    des: '收起/展开搜索条件文案',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'hideSearchButton',
                    des: '是否隐藏搜索、重置按钮',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'indexStyle',
                    des: '首列样式(多选框/索引列/展开的按钮列/不显示该列)',
                    type: 'String',
                    values: 'selection/index/expand/none',
                    defaultVal: "'index'",
                },
                {
                    params: 'defaultExpandAll',
                    des: '是否默认展开所有子节点',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'indexWidth',
                    des: '序号列的宽度',
                    type: '[String, Number]',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'height',
                    des: 'Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式',
                    type: '[String, Number]',
                    values: '-',
                    defaultVal: "'auto'",
                },
                {
                    params: 'border',
                    des: '表格是否带有纵向边框',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'stripe',
                    des: '是否为斑马纹 table',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'highlightCurrentRow',
                    des: '是否要高亮当前选中的行',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'rowClassName',
                    des: '行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className',
                    type: 'Function({row, rowIndex})/String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'cellClassName',
                    des: '单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className',
                    type: 'Function({row, column, rowIndex, columnIndex})/String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'headerRowClassName',
                    des: '表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className',
                    type: 'Function({row, rowIndex})/String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'headerCellClassName',
                    des: '表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className',
                    type: 'Function({row, column, rowIndex, columnIndex})/String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'emptyText',
                    des: '空数据时显示的文本内容',
                    type: 'String',
                    values: '-',
                    defaultVal: "'暂无数据'",
                },
                {
                    params: 'showSummary',
                    des: '是否在表尾显示合计行',
                    type: 'Boolean',
                    values: 'true, false',
                    defaultVal: 'false',
                },
                {
                    params: 'sumText',
                    des: '合计行第一列的文本',
                    type: 'String',
                    values: '-',
                    defaultVal: "'合计'",
                },
                {
                    params: 'summaryMethod',
                    des: '自定义的合计计算方法',
                    type: 'Function({ columns, data })',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'spanMethod',
                    des: '合并行或列的计算方法',
                    type: 'Function({ row, column, rowIndex, columnIndex })',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'indent',
                    des: '展示树形数据时，树节点的缩进',
                    type: 'Number',
                    values: '-',
                    defaultVal: '16',
                },
                {
                    params: 'lazy',
                    des: '是否懒加载子节点数据',
                    type: 'Boolean',
                    values: 'true, false',
                    defaultVal: 'false',
                },
                {
                    params: 'load',
                    des: '加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息',
                    type: 'Function(row, treeNode, resolve)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'treeProps',
                    des: '渲染嵌套数据的配置选项',
                    type: 'Object',
                    values: '-',
                    defaultVal: "{ hasChildren: 'hasChildren', children: 'children' }",
                },
                {
                    params: 'align',
                    des: '表格内容对齐方式',
                    type: 'String',
                    values: 'left/center/right',
                    defaultVal: "'left'",
                },
                {
                    params: 'tableData',
                    des: '表格数据',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'pageParamKeys',
                    des: '若配置了 requestConfig 请求接口数据，接口查询基础字段名配置（排序方式，排序字段名，当前页码，当页条数）',
                    type: 'Object',
                    values: '-',
                    defaultVal: "{ orderByClause: 'orderByClause', orderBy: 'orderBy', pageIndex: 'pageIndex', pageSize: 'pageSize',}",
                },
                {
                    params: 'rowKey',
                    des: '行数据的 Key，用来优化 Table 的渲染',
                    type: 'String',
                    values: '-',
                    defaultVal: "'id'",
                },
                {
                    params: 'selected',
                    des: '初始选中的行，indexStyle不为selection时无效',
                    type: '[String, Array]',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: 'isRefresh',
                    des: '是否需要手动刷新列表按钮（配置 requestConfig 时生效）',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'isPagination',
                    des: '是否需要分页',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'layout',
                    des: '分页配置',
                    type: 'String',
                    values: 'sizes, prev, pager, next, jumper, ->, total, slot',
                    defaultVal: "'total, sizes, prev, pager, next, jumper'",
                },
                {
                    params: 'pageSize',
                    des: '每页显示条目个数',
                    type: 'Number',
                    values: '-',
                    defaultVal: '10',
                },
                {
                    params: 'pageSizes',
                    des: '每页显示个数选择器的选项设置',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[10, 20, 50, 100]',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'searchInfo',
                    des: '搜索框配置',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'searchInfo[i].label',
                    des: '对应表单项的名称',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'searchInfo[i].code',
                    des: '对应表单项所绑定的字段编码(表单元素修改后的值，会通过该code保存在form对象里，并在点击提交时返回该对象)，必传',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'searchInfo[i].type',
                    des: '对应表单项的类型，必传',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'searchInfo[i].relationships',
                    des: '联动关系配置。该表单项的值变更时，其 relationships 所配置的字段key所对应的值将会清空，若value不为空，并且字段key对应的字段配置如果为接口请求的数据，将会把该表单项变更后的值当做参数，重新调用接口获取数据。，具体用法可参照【Form表单】组件的 relationships',
                    type: 'String',
                    values: '{ 需要联动的表单项的code: 接收该表单项变更后的值所对应的键名 }',
                    defaultVal: '-',
                },
                {
                    params: 'searchInfo[i].relationResults',
                    des: '运算结果配置函数。其类型为Function或者String(可被eval解析的function)，参数为表单对象(form)，该配置需要return一个结果，用于重写该表单项的值。每次其他表单项的值变更时，都会触发运算结果配置函数，具体用法可参照【Form表单】组件的 relationResults',
                    type: 'Function、String(可被eval解析的function)',
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
                    params: 'tableColumn',
                    des: '表格列配置',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'tableColumn[i].label',
                    des: '表格列名',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'tableColumn[i].code',
                    des: '表格展示数据对应的code',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'tableColumn[i].width',
                    des: '对应列的宽度',
                    type: '[String, Number]',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'tableColumn[i].minWidth',
                    des: '对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列',
                    type: '[String, Number]',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'tableColumn[i].fixed',
                    des: '列是否固定在左侧或者右侧，true 表示固定在左侧',
                    type: '[String, Boolean]',
                    values: 'true, left, right',
                    defaultVal: '-',
                },
                {
                    params: 'tableColumn[i].headerAlign',
                    des: '表头对齐方式，若不设置该项，则使用表格的对齐方式',
                    type: 'String',
                    values: 'true, left, right',
                    defaultVal: '-',
                },
                {
                    params: 'tableColumn[i].labelClassName',
                    des: '当前列标题的自定义类名',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'tableColumn[i].showOverflowTooltip',
                    des: '当内容过长被隐藏时显示 tooltip',
                    type: 'Boolean',
                    values: 'true, false',
                    defaultVal: 'true',
                },
                {
                    params: 'tableColumn[i].sortable',
                    des: '对应列是否可以排序，如果 sortable 为 true，若传入 requestConfig.url 则为请求接口排序，否则为组件默认排序',
                    type: 'Boolean',
                    values: 'true, false',
                    defaultVal: 'false',
                },
                {
                    params: 'tableColumn[i].sortFields',
                    des: "对应列如果可以排序，可以通过sortFields来配置排序字段的传值内容，sortFields格式为 { ascending: '升序代表的编码', descending: '降序代表的编码' }",
                    type: 'Object',
                    values: '-',
                    defaultVal: "{ ascending: 'asc', descending: 'desc' }",
                },
                {
                    params: 'tableColumn[i].selectable',
                    des: '仅对 type=selection 的列有效，返回值用来决定这一行的 CheckBox 是否可以勾选',
                    type: 'Function(row, index)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'tableColumn[i].headerSlotcode',
                    des: '对应列的列头插槽名称，可支持自定义列头的内容',
                    type: 'String',
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
                    params: 'autoSearch',
                    des: '如果通过接口请求列表数据，autoSearch 可控制初始渲染表格时是否去请求数据',
                    type: 'Boolean',
                    values: 'true, false',
                    defaultVal: 'true',
                },
                {
                    params: 'requestConfig',
                    des: '接口请求配置项(如果使用接口请求表格数据，则tableData无效)',
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
                    des: '请求到数据后的回调，可以用来修改源数据内容',
                    type: 'Function(res)',
                    values: '-',
                    defaultVal: 'null',
                },
                {
                    params: 'requestConfig.totalCallback',
                    des: '请求到数据后的回调，可以用来指定数据总条数total。总条数total如果在 res.data.total 或 res.data.totalCount 中拿不到，请使用该方法手动返回总条数，否则会导致无法分页',
                    type: 'Function(res)',
                    values: '-',
                    defaultVal: '当页数据条数总和',
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
                    name: 'row-click',
                    des: '当某一行被点击时会触发该事件',
                    params: 'row, column, event',
                },
                {
                    name: 'row-dblclick',
                    des: '当某一行被双击时会触发该事件',
                    params: 'row, column, event',
                },
                {
                    name: 'select',
                    des: '当用户手动勾选数据行的 Checkbox 时触发的事件',
                    params: 'rows, row',
                },
                {
                    name: 'selection-change',
                    des: '勾选框change事件',
                    params: 'rows',
                },
                {
                    name: 'expand-change',
                    des: '当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）',
                    params: 'row, expandedRows',
                },
                {
                    name: 'select-all',
                    des: '全选/全不选',
                    params: 'rows',
                },
                {
                    name: 'form-item-change',
                    des: '搜索框的change事件',
                    params: 'value, info',
                },
                {
                    name: 'before-search',
                    des: '点击查询按钮抛出的方法',
                    params: 'params(当前的查询参数)',
                },
                {
                    name: 'search',
                    des: '获取tableData时抛出的方法',
                    params: 'params(当前的查询参数)',
                },
                {
                    name: 'finish-search',
                    des: '通过接口请求数据完成时，抛出的方法',
                    params: 'currentTableData(当前页的数据), totalTableData(所有数据)',
                },
                {
                    name: 'picker-change',
                    des: '查询框table弹窗选择器类型的change事件',
                    params: '{ rows, value }',
                },
            ],
            slotData: [
                {
                    name: 'search-operate',
                    des: '插入查询按钮后面，可用于添加其他按钮',
                    params: '-',
                },
                {
                    name: 'content-body',
                    des: '介于搜索框和表格之间的部分，可插入相关操作按钮',
                    params: '当前已勾选的行数据 { data, selections }',
                },
                {
                    name: 'column.headerSlotcode',
                    des: '表格中某一列的列头插槽，插槽名称为该列code',
                    params: '当前列数据、当前列头配置、当前列的索引 { column, config, index }',
                },
                {
                    name: 'column.code',
                    des: '表格中某一列对应的单元格插槽，插槽名称为该列code',
                    params: '当前行数据、当前列数据、当前列头配置、当前行的索引、当前行真实索引 { row, column, config, index, realIndex }',
                },
            ],
            refData: [
                {
                    name: 'searchParams',
                    des: '当前请求接口携带的参数',
                    type: '1',
                },
                {
                    name: 'realSelections',
                    des: '当前选中的行数据',
                    type: '1',
                },
                {
                    name: 'currentTableData',
                    des: '当前页的表格数据',
                    type: '1',
                },
                {
                    name: 'getTableData()',
                    des: '重新获取表格数据（可用于外部调用刷新列表）',
                    type: '2',
                },
                {
                    name: 'clearSelection()',
                    des: '清空所有选中',
                    type: '2',
                },
                {
                    name: 'toggleRowSelection(row, selected)',
                    des: '用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）',
                    type: '2',
                },
                {
                    name: 'toggleAllSelection()',
                    des: '用于多选表格，切换所有行的选中状态',
                    type: '2',
                },
                {
                    name: 'toggleRowExpansion(row, expanded)',
                    des: '用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）',
                    type: '2',
                },
                {
                    name: 'setCurrentRow(row)',
                    des: '用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态',
                    type: '2',
                },
                {
                    name: 'clearSort()',
                    des: '用于清空排序条件，数据会恢复成未排序的状态',
                    type: '2',
                },
                {
                    name: 'resetTableHeight()',
                    des: '对 Table 的自适应高度进行重新计算和布局。当 Table 的数据量发生变化时，可能需要调用此方法',
                    type: '2',
                },
                {
                    name: 'doLayout()',
                    des: '对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法',
                    type: '2',
                },
            ],
        };
    },
    methods: {
        handlerEdit(row, index) {
            console.log(row, index);
        },
        handlerSelectChange(rows) {
            console.log(rows);
        },
        handlerBatchDelete(rows) {
            this.$message.warning(`${this.$t('你勾选了')}${rows.length}${this.$t('条')}${this.$t('数据')}`);
            console.log(rows);
        },
    },
    created() {
    },
};
</script>

<style lang="scss">
.test-table {
}
</style>
