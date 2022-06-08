<template>
  <div class="test-common-page">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <li>使用 &lt;sib-common-page /&gt;，主列表页以及副列表（点击某个字段，展示弹窗，弹窗里展示另外一个表格，这里将其称为副列表）的增删改查、复制、新增子级、启用禁用等基本操作全部可以使用配置进行动态控制</li>
    <example :template-string="templateString">
      <sib-common-page
        ref="pageComponent"
        :border="false"
        :permission-prefix="permissionPrefix"
        :permissions="permissions"
        :main-table-config="mainTableConfig"
        :main-dialog-config="mainDialogConfig"
        :sub-table-config="subTableConfig"
        :sub-dialog-config="subDialogConfig"
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
            permissionPrefix: 'permission_prefix',
            permissions: {
                permission_prefix_view: {
                    url: '',
                    method: 'post',
                    params: {},
                    headers: {},
                },
                permission_prefix_export: {},
                permission_prefix_import: {},
                permission_prefix_add: {},
                permission_prefix_sonAdd: {},
                permission_prefix_edit: {},
                permission_prefix_delete: {},
                permission_prefix_batchDelete: {},
                permission_prefix_copy: {},
                permission_prefix_enable: {},
                permission_prefix_disable: {},
                permission_prefix_batchEnable: {},
                permission_prefix_batchDisable: {},
                permission_prefix_sub_view: {},
                permission_prefix_sub_add: {},
                permission_prefix_sub_export: {},
                permission_prefix_sub_edit: {},
                permission_prefix_sub_copy: {},
                permission_prefix_sub_delete: {},
                permission_prefix_sub_batchDelete: {},
                permission_prefix_sub_enable: {},
                permission_prefix_sub_disable: {},
                permission_prefix_sub_batchEnable: {},
                permission_prefix_sub_batchDisable: {},
            },
            mainTableConfig: {
                rowSize: 3,
                searchInfo: [
                    {
                        label: '姓名',
                        code: 'name',
                        type: 'text',
                    },
                ],
                tableColumn: [
                    {
                        label: '姓名',
                        code: 'name',
                        type: 'slot',
                    },
                    {
                        label: '性别',
                        code: 'sex',
                        formatter: ({ sex }) => ({ 0: '女', 1: '男' })[sex],
                    },
                    {
                        label: '年龄',
                        code: 'age',
                    },
                    {
                        label: '状态',
                        code: 'status',
                        formatter: ({ status }) => ({ 0: '禁用', 1: '启用' })[status],
                    },
                    {
                        label: '操作',
                        code: 'operate',
                        type: 'slot',
                        width: 300,
                        showOverflowTooltip: false,
                    },
                ],
                tableData: Array(20).fill().map((_, i) => ({
                    name: `张三${i + 1}号`,
                    age: i + 10,
                    sex: i % 2,
                    status: i % 2,
                    id: i,
                })),
                requestConfig: {
                    params: {},
                    callback: null,
                },
                importProps: {
                    // 文件类型限制（默认excel表格的格式）
                    accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    // 导入参数
                    params: {},
                    // 是否展示导入文件列表
                    showFileList: false,
                    // 是否展示导入提示文案
                    showTips: false,
                    // 导入按钮名称，默认为 "列表导入"
                    btnText: '列表导入',
                    // 上传前的回调方法，不 return 或者 return false 则中止上传
                    beforeUpload: null,
                    // 导入成功回调，组件内部提供refreshTable方法来刷新主列表和副列表的数据（this.$refs.pageComponent.refreshTable()）
                    onSuccess: null,
                },
                buttonConfig: {
                    add: {
                        name: '新增人员',
                        disabled: false,
                    },
                    sonAdd: {
                        name: '新增子级',
                        disabled: (row, i) => !!(i % 2),
                    },
                    edit: {
                        name: '编辑',
                        disabled: (row, i) => !!(i % 2),
                        show: (row, i) => !!(i % 3),
                    },
                    copy: {
                        name: '复制',
                        disabled: (row, i) => !!(i % 2),
                    },
                    import: {
                        name: '列表导入',
                        disabled: false,
                    },
                    export: {
                        name: '列表导出',
                        disabled: false,
                    },
                    delete: {
                        name: '删除',
                        disabled: (row, i) => !!(i % 2),
                        show: (row, i) => !!(i % 3),
                    },
                    batchDelete: {
                        name: '批量删除',
                        disabled: false,
                    },
                    batchEnable: {
                        name: '批量启用',
                        disabled: false,
                    },
                    batchDisable: {
                        name: '批量禁用',
                        disabled: false,
                    },
                    enable: {
                        name: '启用',
                        disabled: (row, i) => !!(i % 3),
                    },
                    disable: {
                        name: '禁用',
                        disabled: (row, i) => !!(i % 3),
                    },
                },
                enableStatus: {
                    code: 'status',
                    on: '1',
                    off: '0',
                },
                subViewConfig: {
                    code: 'name',
                    disabled: (row, i) => i === 3,
                    paramsKey: 'medicineId',
                    paramsValueKey: 'id',
                },
                handlerOpenSubList: null,
                handlerDeleteRow: null,
                handlerBatchDeleteRows: null,
                handlerEnableRow: null,
                handlerBatchEnableRows: null,
                beforeDelete: null,
            },
            mainDialogConfig: {
                width: '400px',
                submitText: '提交哎喂',
                cancelText: '算了',
                addItemInfo: [
                    {
                        label: '姓名',
                        code: 'name',
                        type: 'text',
                    },
                    {
                        label: '性别',
                        code: 'sex',
                        type: 'select',
                        dataTye: 'number',
                        options: [
                            {
                                key: 0,
                                value: '女',
                            },
                            {
                                key: 1,
                                value: '男',
                            },
                        ],
                    },
                    {
                        label: '状态',
                        code: 'status',
                        type: 'select',
                        dataTye: 'number',
                        options: [
                            {
                                key: 0,
                                value: '禁用',
                            },
                            {
                                key: 1,
                                value: '启用',
                            },
                        ],
                    },
                    {
                        label: '年龄',
                        code: 'age',
                        type: 'text',
                        valueType: 'number',
                        dataTye: 'number',
                    },
                ],
                editItemInfo: [],
                copyItemInfo: [],
                getItemInfo: null,
                form: {},
                rules: {},
                getSpecialConfig: null,
                handlerSubmit: null,
                beforeSubmit: null,
            },
            subTableConfig: {
                rowSize: 3,
                searchInfo: [],
                tableColumn: [
                    {
                        label: '兴趣',
                        code: 'interest',
                    },
                    {
                        label: '爱好',
                        code: 'hobby',
                    },
                    {
                        label: '恋爱状态',
                        code: 'loveStatus',
                        formatter: ({ loveStatus }) => ({ 0: '单身狗', 1: '热恋中' })[loveStatus],
                    },
                    {
                        label: '操作',
                        code: 'operate',
                        type: 'slot',
                        width: 180,
                        showOverflowTooltip: false,
                    },
                ],
                tableData: Array(20).fill().map((_, i) => ({
                    interest: ['打球', '跳舞', '跳绳', '乒乓球', '裸奔'][i % 5],
                    hobby: ['没什么爱好', '好多爱好', '未知'][i % 3],
                    loveStatus: i % 2,
                    id: i,
                })),
                requestConfig: {
                    params: {},
                    callback: null,
                },
                buttonConfig: {
                    add: {
                        name: '新增信息卡',
                    },
                },
                enableStatus: {
                    code: 'loveStatus',
                    on: '1',
                    off: '0',
                },
                dialogConfig: {
                    title: '个人信息卡',
                    width: '800px',
                },
                handlerDeleteRow: null,
                handlerBatchDeleteRows: null,
                handlerEnableRow: null,
                handlerBatchEnableRows: null,
                beforeDelete: null,
            },
            subDialogConfig: {
                width: '',
                submitText: '',
                cancelText: '',
                addItemInfo: [
                    {
                        label: '兴趣',
                        code: 'interest',
                        type: 'text',
                    },
                    {
                        label: '爱好',
                        code: 'hobby',
                        type: 'text',
                    },
                    {
                        label: '恋爱状态',
                        code: 'loveStatus',
                        type: 'select',
                        dataTye: 'number',
                        options: [
                            {
                                key: 0,
                                value: '单身狗',
                            },
                            {
                                key: 1,
                                value: '热恋中',
                            },
                        ],
                    },
                ],
                editItemInfo: [],
                copyItemInfo: [],
                getItemInfo: null,
                form: {},
                rules: {},
                getSpecialConfig: null,
                handlerSubmit: null,
                beforeSubmit: null,
            },
            attributeData: [
                {
                    params: 'permissionPrefix',
                    des: '页面权限字符前缀；它代表的是 permissions 对象中key的前缀，如果key没有前缀，可不传',
                    type: 'String',
                    values: '-',
                    defaultVal: "'unknow'",
                },
                {
                    params: 'permissions',
                    des: '全局权限配置对象（详细说明请展开代码查看示例，不是每一个字段都必须传，可自行根据需要配置）',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'mainTableConfig',
                    des: '主列表配置（详细说明请展开代码查看示例，不是每一个字段都必须传，可自行根据需要配置）',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'mainDialogConfig',
                    des: '主列表的新增、修改、复制弹窗表单配置（详细说明请展开代码查看示例，不是每一个字段都必须传，可自行根据需要配置）',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'subTableConfig',
                    des: '副列表的配置(点击某个字段，展示弹窗，弹窗里展示另外一个表格，这里将其称为副列表，详细说明请展开代码查看示例，不是每一个字段都必须传，可自行根据需要配置)',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'subDialogConfig',
                    des: '副列表的新增、修改、复制弹窗表单配置（详细说明请展开代码查看示例，不是每一个字段都必须传，可自行根据需要配置）',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'border',
                    des: '是否展示列表边框',
                    type: 'Boolean',
                    values: '-',
                    defaultVal: 'true',
                },
            ],
            eventData: [
                {
                    name: 'dialog-form-change',
                    des: '新增、编辑、复制表单弹窗中，表单项值变更抛出的事件; info: 触发值变更的表单元素配置; value: 变更后的值; dialogConfig: 当前弹窗配置（支持修改，一般用于表单项某个值变更后，重新修改itemInfo的情况）; resetFormItemWidth: 重新布局表单的方法',
                    params: '{ info, value, dialogConfig, resetFormItemWidth }',
                },
            ],
            slotData: [
                {
                    name: 'refreshTable',
                    des: '刷新主列表和副列表的数据',
                    type: 2,
                },
            ],
            templateString: `
<template>
    <div class="example-box">
        <!-- 组件使用演示 -->
        <sib-common-page
            ref="pageComponent"
            :border="false"
            :permission-prefix="permissionPrefix"
            :permissions="permissions"
            :main-table-config="mainTableConfig"
            :main-dialog-config="mainDialogConfig"
            :sub-table-config="subTableConfig"
            :sub-dialog-config="subDialogConfig"
        />
    </div>
</template>

<script>

export default {
    name: 'exampleBox',
    data() {
        return {
            /**
             * 页面权限字符前缀
             * 它代表的是 permissions 对象中key的前缀，例如 'permission_prefix_view' 中的 'permission_prefix';
             * 如果 permissions 中的key没有前缀, 形式为 permissions: { view: {...}, export: {...}, import: {...}, ... } 时，可以不用传入 permissionPrefix 字段
            */
            permissionPrefix: 'permission_prefix',
            /**
             * 全局权限配置对象（未配置对应操作则不展示该操作功能）
             */
            permissions: {
                // 查看列表
                permission_prefix_view: {
                    // 可配置的字段
                    url: '',
                    method: 'post',
                    params: {},
                    headers: {},
                },
                // 导出列表
                permission_prefix_export: {},
                // 导入列表
                permission_prefix_import: {},
                // 列表行新增
                permission_prefix_add: {},
                // 列表行新增子级
                permission_prefix_sonAdd: {},
                // 列表行编辑
                permission_prefix_edit: {},
                // 列表行删除
                permission_prefix_delete: {},
                // 列表行批量删除
                permission_prefix_batchDelete: {},
                // 列表行复制
                permission_prefix_copy: {},
                // 列表行启用
                permission_prefix_enable: {},
                // 列表行禁用
                permission_prefix_disable: {},
                // 列表行批量启用
                permission_prefix_batchEnable: {},
                // 列表行批量禁用
                permission_prefix_batchDisable: {},
                // 副列表查看
                permission_prefix_sub_view: {},
                // 副列表行新增
                permission_prefix_sub_add: {},
                // 副列表导出列表
                permission_prefix_sub_export: {},
                // 副列表行编辑
                permission_prefix_sub_edit: {},
                // 副列表行复制
                permission_prefix_sub_copy: {},
                // 副列表行删除
                permission_prefix_sub_delete: {},
                // 副列表行批量删除
                permission_prefix_sub_batchDelete: {},
                // 副列表行启用
                permission_prefix_sub_enable: {},
                // 副列表行禁用
                permission_prefix_sub_disable: {},
                // 副列表行批量启用
                permission_prefix_sub_batchEnable: {},
                // 副列表行批量禁用
                permission_prefix_sub_batchDisable: {},
            },
            // 主列表查询配置
            mainTableConfig: {
                // 查询框一行的展示表单元素的个数
                rowSize: 3,
                // 查询框表单配置
                searchInfo: [
                    {
                        label: '姓名',
                        code: 'name',
                        type: 'text',
                    },
                ],
                // 列表的列配置项
                tableColumn: [
                    {
                        label: '姓名',
                        code: 'name',
                        type: 'slot',
                    },
                    {
                        label: '性别',
                        code: 'sex',
                        formatter: ({ sex }) => ({ 0: '女', 1: '男' })[sex],
                    },
                    {
                        label: '年龄',
                        code: 'age',
                    },
                    {
                        label: '状态',
                        code: 'status',
                        formatter: ({ status }) => ({ 0: '禁用', 1: '启用' })[status],
                    },
                    {
                        label: '操作',
                        code: 'operate',
                        type: 'slot',
                        width: 300,
                        showOverflowTooltip: false,
                    },
                ],
                // 主列表数据为非接口请求时，可传入 tableData
                tableData: Array(20).fill().map((_, i) => ({
                    name: '张三' + (i + 1) + '号',
                    age: i + 10,
                    sex: i % 2,
                    status: i % 2,
                    id: i,
                })),
                // 请求接口的外部配置，一般用于设定默认参数和定义回调方法
                requestConfig: {
                    params: {},
                    callback: null,
                },
                // 列表导入配置
                importProps: {
                    // 文件类型限制（默认excel表格的格式）
                    accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    // 导入参数
                    params: {},
                    // 是否展示导入文件列表
                    showFileList: false,
                    // 是否展示导入提示文案
                    showTips: false,
                    // 导入按钮名称，默认为 "列表导入"
                    btnText: '列表导入',
                    // 上传前的回调方法，不 return 或者 return false 则中止上传
                    beforeUpload: null,
                    // 导入成功回调，组件内部提供refreshTable方法来刷新主列表和副列表的数据（this.$refs.pageComponent.refreshTable()）
                    onSuccess: null,
                },
                // 按钮配置
                buttonConfig: {
                    add: {
                        name: '新增人员',
                        disabled: false,
                    },
                    sonAdd: {
                        name: '新增子级',
                        disabled: (row, i) => !!(i % 2),
                    },
                    edit: {
                        name: '编辑',
                        disabled: (row, i) => !!(i % 2),
                        show: (row, i) => !!(i % 3),
                    },
                    copy: {
                        name: '复制',
                        disabled: (row, i) => !!(i % 2),
                    },
                    import: {
                        name: '列表导入',
                        disabled: false,
                    },
                    export: {
                        name: '列表导出',
                        disabled: false,
                    },
                    delete: {
                        name: '删除',
                        disabled: (row, i) => !!(i % 2),
                        show: (row, i) => !!(i % 3),
                    },
                    batchDelete: {
                        name: '批量删除',
                        disabled: false,
                    },
                    batchEnable: {
                        name: '批量启用',
                        disabled: false,
                    },
                    batchDisable: {
                        name: '批量禁用',
                        disabled: false,
                    },
                    enable: {
                        name: '启用',
                        disabled: (row, i) => !!(i % 3),
                    },
                    disable: {
                        name: '禁用',
                        disabled: (row, i) => !!(i % 3),
                    },
                },
                // 启用禁用规则配置
                enableStatus: {
                    // 用于判断主列表的数据行是否已经被禁用的字段名
                    code: 'status',
                    // 数据行被启用时的值(row.status === '1'代表被启用)
                    on: '1',
                    // 数据行被禁用时的值(row.status === '0'代表被禁用)
                    off: '0',
                },
                // 点击指定的数据行内字段（姓名）查看副列表的相关配置，对应tableColumn下的（姓名）列配置需设置为插槽类型（type='slot'）
                subViewConfig: {
                    // 将主列表中字段为 'name' 的单元格设置为按钮，点击打开副列表弹窗，查看副列表数据
                    code: 'name',
                    /**
                     * 是否禁用
                     * Boolean/Function(row, index)
                     * row: 当前行数据
                     * index: 当前行索引
                     */
                    disabled: (row, i) => i === 3,
                    /**
                     * 在主列表某一行点击打开查看副列表的弹窗后
                     * 请求副列表数据时，将该行的 "id" 赋值给 "rowId"
                     * params: { rowId: row.id } 将当做附加的请求参数去请求副列表的tableData
                     */
                    paramsKey: 'rowId',
                    paramsValueKey: 'id',
                },
                /**
                 * 点击指定的数据行内字段查看副列表的自定义方法 (row, requestConfig, callback)
                 * row 点击时的行数据
                 * requestConfig 请求接口配置的相关配置
                 * callback 打开副列表弹窗的回调方法
                 */
                handlerOpenSubList: null,
                /**
                 * 删除行自定义方法 (row, requestConfig, callback)
                 * row 需要删除的行数据对象
                 * requestConfig 请求接口配置的相关配置
                 * callback 刷新列表的回调方法
                 */
                handlerDeleteRow: null,
                /**
                 * 批量删除行自定义方法 (rows, requestConfig, callback)
                 * rows 需要删除的一个或多个行数据组成的数组
                 * requestConfig 请求接口配置的相关配置
                 * callback 刷新列表的回调方法
                 */
                handlerBatchDeleteRows: null,
                /**
                 * 启用禁用行自定义方法 (row, requestConfig, callback)
                 * row 需要启用或禁用的行数据对象
                 * requestConfig 请求接口配置的相关配置
                 * callback 刷新列表的回调方法
                 */
                handlerEnableRow: null,
                /**
                 * 批量启用禁用行自定义方法 (rows, requestConfig, callback)
                 * rows 需要启用或禁用的一个或多个行数据组成的数组
                 * requestConfig 请求接口配置的相关配置
                 * callback 刷新列表的回调方法
                 */
                handlerBatchEnableRows: null,
                /**
                 * beforeDelete(rows)
                 * 删除行数据之前的回调方法，如果 return true 则执行删除逻辑，return false则中断删除操作
                 * rows: 需要删除的行数据组成的数组
                 */
                beforeDelete: null,
            },
            // 主列表的新增、修改、复制弹窗表单配置
            mainDialogConfig: {
                // 弹窗宽度，可不传，默认500px
                width: '400px',
                // 保存按钮名称，可不传，默认为"保存"
                submitText: '提交哎喂',
                // 取消按钮名称，可不传，默认为"取消"
                cancelText: '算了',
                // 表单项label宽度，Number类型，0代表自适应，默认为自适应，可不传
                labelWidth: 0,
                // 是否需要提交按钮，默认为true，可不传
                isSubmit: true,
                // 是否需要取消按钮，默认为true，可不传
                isCancel: true,
                // 是否不可操作，默认为false，可不传
                disabled: false,
                // 是否允许按回车提交表单，默认为true，可不传
                enterable: true,
                // 新增行数据时的表单配置
                addItemInfo: [
                    {
                        label: '姓名',
                        code: 'name',
                        type: 'text',
                    },
                    {
                        label: '性别',
                        code: 'sex',
                        type: 'select',
                        dataTye: 'number',
                        options: [
                            {
                                key: 0,
                                value: '女',
                            },
                            {
                                key: 1,
                                value: '男',
                            },
                        ],
                    },
                    {
                        label: '状态',
                        code: 'status',
                        type: 'select',
                        dataTye: 'number',
                        options: [
                            {
                                key: 0,
                                value: '禁用',
                            },
                            {
                                key: 1,
                                value: '启用',
                            },
                        ],
                    },
                    {
                        label: '年龄',
                        code: 'age',
                        type: 'text',
                        valueType: 'number',
                        dataTye: 'number',
                    },
                ],
                // 编辑行数据时的表单配置，如未配置，自动从 addItemInfo 取值
                editItemInfo: [],
                // 复制行数据时的表单配置，如未配置，自动从 addItemInfo 取值
                copyItemInfo: [],
                /**
                 * 除了配置addItemInfo、editItemInfo、copyItemInfo之外，还可以通过getItemInfo(type, { currentRow, mainTableData, subTableData })方法，动态根据当前操作类型(新增、编辑、复制)情况来返回表单配置
                 * 如果配置了getItemInfo 方法，则优先采用该方法返回的表单配置
                 * type: 当前的操作类型；add/edit/copy/sonAdd  新增/编辑/复制/新增子级
                 * currentRow: 当前行数据(新增时为row没有值)
                 * mainTableData: 主列表的所有行数据
                 * subTableData: 副列表的所有行数据
                 */
                getItemInfo: null,
                // 新增、修改、复制弹窗表单的默认值
                form: {},
                // 新增、修改、复制弹窗表单的校验规则
                rules: {},
                /**
                 * 获取特殊配置
                 * 通过getSpecialConfig(type, { currentRow, mainTableData, subTableData, dialogConfig })方法，动态根据当前操作类型(新增、编辑、复制)情况来返回弹窗的一些特殊配置
                 * 该方法可以返回类似下列对象的值（相当于可以根据操作类型动态修改传入的弹窗配置的所有属性）
                 * { width, submitText, cancelText, rowSize, labelWidth, isSubmit, isCancel, disabled, enterable, form, rules }
                 * type: 当前的操作类型；add/edit/copy/sonAdd  新增/编辑/复制/新增子级
                 * currentRow: 当前行数据(新增时为row没有值)
                 * mainTableData: 主列表的所有行数据
                 * subTableData: 副列表的所有行数据
                 * dialogConfig: 当前弹窗的所有配置项
                 */
                getSpecialConfig: null,
                /**
                 * 自定义提交表单方法
                 * handlerSubmit(obj, callback)
                 * obj.form: 当前表单数据
                 * obj.type: 当前操作类型
                 * obj.requestConfig: 请求接口配置的相关配置
                 * obj.currentRow: 当前行数据对象
                 * callback: 刷新列表、关闭弹窗的回调函数
                 */
                handlerSubmit: null,
                /**
                 * 表单自动提交前的预处理方法，需return新的form对象
                 * handlerSubmit(obj)
                 * obj.form: 当前表单数据
                 * obj.type: 当前操作类型
                 * obj.currentRow: 当前行数据对象
                 */
                beforeSubmit: null,
            },
            // 副列表查询配置
            subTableConfig: {
                // 查询框一行的展示表单元素的个数
                rowSize: 3,
                // 查询框表单配置
                searchInfo: [],
                // 列表的列配置项
                tableColumn: [
                    {
                        label: '兴趣',
                        code: 'interest',
                    },
                    {
                        label: '爱好',
                        code: 'hobby',
                    },
                    {
                        label: '恋爱状态',
                        code: 'loveStatus',
                        formatter: ({ loveStatus }) => ({ 0: '单身狗', 1: '热恋中' })[loveStatus],
                    },
                    {
                        label: '操作',
                        code: 'operate',
                        type: 'slot',
                        width: 180,
                        showOverflowTooltip: false,
                    },
                ],
                // 副列表数据为非接口请求时，可传入 tableData
                tableData: Array(20).fill().map((_, i) => ({
                    interest: ['打球', '跳舞', '跳绳', '乒乓球', '裸奔'][i % 5],
                    hobby: ['没什么爱好', '好多爱好', '未知'][i % 3],
                    loveStatus: i % 2,
                    id: i,
                })),
                // 请求接口的外部配置，一般用于设定默认参数和定义回调方法
                requestConfig: {
                    params: {},
                    callback: null,
                },
                // 按钮配置 可配置属性与主列表按钮配置相同
                buttonConfig: {
                    add: {
                        name: '新增信息卡',
                    },
                },
                // 启用禁用规则配置
                enableStatus: {
                    // 用于判断主列表的数据行是否已经被禁用的字段名
                    code: 'loveStatus',
                    // 数据行被启用时的值(row.status === '1'代表被启用)
                    on: '1',
                    // 数据行被禁用时的值(row.status === '0'代表被禁用)
                    off: '0',
                },
                // 副列表数据展示的弹窗配置
                dialogConfig: {
                    /**
                     * 弹窗标题 title
                     * String/Function(currentRow)
                     * currentRow => 当前行数据
                     */
                    title: '个人信息卡',
                    // title: (currentRow) => currentRow.name,
                    // 弹窗宽度，默认1200px
                    width: '800px',
                },
                /**
                 * 删除行自定义方法 (row, requestConfig, callback)
                 * row 需要删除的行数据对象
                 * requestConfig 请求接口配置的相关配置
                 * callback 刷新列表的回调方法
                 */
                handlerDeleteRow: null,
                /**
                 * 批量删除行自定义方法 (rows, requestConfig, callback)
                 * rows 需要删除的一个或多个行数据组成的数组
                 * requestConfig 请求接口配置的相关配置
                 * callback 刷新列表的回调方法
                 */
                handlerBatchDeleteRows: null,
                /**
                 * 启用禁用行自定义方法 (row, requestConfig, callback)
                 * row 需要启用或禁用的行数据对象
                 * requestConfig 请求接口配置的相关配置
                 * callback 刷新列表的回调方法
                 */
                handlerEnableRow: null,
                /**
                 * 批量启用禁用行自定义方法 (rows, requestConfig, callback)
                 * rows 需要启用或禁用的一个或多个行数据组成的数组
                 * requestConfig 请求接口配置的相关配置
                 * callback 刷新列表的回调方法
                 */
                handlerBatchEnableRows: null,
                /**
                 * beforeDelete(rows)
                 * 删除行数据之前的回调方法，如果 return true 则执行删除逻辑，return false则中断删除操作
                 * rows: 需要删除的行数据组成的数组
                 */
                beforeDelete: null,
            },
            // 副列表的新增、修改、复制弹窗表单配置
            subDialogConfig: {
                // 弹窗宽度，可不传，默认500px
                width: '',
                // 保存按钮名称，可不传，默认为"保存"
                submitText: '',
                // 取消按钮名称，可不传，默认为"取消"
                cancelText: '',
                // 表单项label宽度，Number类型，0代表自适应，默认为自适应，可不传
                labelWidth: 0,
                // 是否需要提交按钮，默认为true，可不传
                isSubmit: true,
                // 是否需要取消按钮，默认为true，可不传
                isCancel: true,
                // 是否不可操作，默认为false，可不传
                disabled: false,
                // 是否允许按回车提交表单，默认为true，可不传
                enterable: true,
                // 新增行数据时的表单配置
                addItemInfo: [
                    {
                        label: '兴趣',
                        code: 'interest',
                        type: 'text',
                    },
                    {
                        label: '爱好',
                        code: 'hobby',
                        type: 'text',
                    },
                    {
                        label: '恋爱状态',
                        code: 'loveStatus',
                        type: 'select',
                        dataTye: 'number',
                        options: [
                            {
                                key: 0,
                                value: '单身狗',
                            },
                            {
                                key: 1,
                                value: '热恋中',
                            },
                        ],
                    },
                ],
                // 编辑行数据时的表单配置，如未配置，自动从 addItemInfo 取值
                editItemInfo: [],
                // 复制行数据时的表单配置，如未配置，自动从 addItemInfo 取值
                copyItemInfo: [],
                /**
                 * 除了配置addItemInfo、editItemInfo、copyItemInfo之外，还可以通过getItemInfo(type, { currentRow, mainTableData, subTableData })方法，动态根据当前操作类型(新增、编辑、复制)情况来返回表单配置
                 * 如果配置了getItemInfo 方法，则优先采用该方法返回的表单配置
                 * type: 当前的操作类型；add/edit/copy/sonAdd  新增/编辑/复制/新增子级
                 * currentRow: 当前行数据(新增时为row没有值)
                 * mainTableData: 主列表的所有行数据
                 * subTableData: 副列表的所有行数据
                 */
                getItemInfo: null,
                // 新增、修改、复制弹窗表单的默认值
                form: {},
                // 新增、修改、复制弹窗表单的校验规则
                rules: {},
                /**
                 * 获取特殊配置
                 * 通过getSpecialConfig(type, { currentRow, mainTableData, subTableData, dialogConfig })方法，动态根据当前操作类型(新增、编辑、复制)情况来返回弹窗的一些特殊配置
                 * 该方法可以返回类似下列对象的值（相当于可以根据操作类型动态修改传入的弹窗配置的所有属性）
                 * { width, submitText, cancelText, rowSize, labelWidth, isSubmit, isCancel, disabled, enterable, form, rules }
                 * type: 当前的操作类型；add/edit/copy/sonAdd  新增/编辑/复制/新增子级
                 * currentRow: 当前行数据(新增时为row没有值)
                 * mainTableData: 主列表的所有行数据
                 * subTableData: 副列表的所有行数据
                 * dialogConfig: 当前弹窗的所有配置项
                 */
                getSpecialConfig: null,
                /**
                 * 自定义提交表单方法
                 * handlerSubmit(obj, callback)
                 * obj.form: 当前表单数据
                 * obj.type: 当前操作类型
                 * obj.requestConfig: 请求接口配置的相关配置
                 * obj.currentRow: 当前行数据对象
                 * callback: 刷新列表、关闭弹窗的回调函数
                 */
                handlerSubmit: null,
                /**
                 * 表单自动提交前的预处理方法，需return新的form对象
                 * handlerSubmit(obj)
                 * obj.form: 当前表单数据
                 * obj.type: 当前操作类型
                 * obj.currentRow: 当前行数据对象
                 */
                beforeSubmit: null,
            },
        };
    },
};
< /script>
`,
        };
    },
};
</script>

<style lang="scss">
.test-common-page {
}
</style>
