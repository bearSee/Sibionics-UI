<template>
  <div class="test-form">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example>
      <div slot="describe">
        <h4>1、普通表单</h4>
        <li>表单元素配置中支持配置value，用于展示默认值</li>
      </div>
      <sib-form
        :item-info="itemInfo1"
        @submit="handlerSubmit"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>2、带校验表单</h4>
        <li>row-size可以设定一行展示多少个表单元素，默认为1，即为块状排列</li>
        <li>给表单元素配置添加 required: true 即可实现添加该字段的必填校验</li>
      </div>
      <sib-form
        :row-size="2"
        :item-info="itemInfo2"
        @submit="handlerSubmit"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>3、自定义校验</h4>
        <li>
          传入rules自定义校验规则对象，即可实现自定义校验。详细用法参照
          <a
            href="https://github.com/yiminghe/async-validator"
            target="_blank">async-validator</a>
        </li>
      </div>
      <sib-form
        :row-size="3"
        :item-info="itemInfo2"
        :rules="rules"
        @submit="handlerSubmit"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>4、部分表单元素配置展示</h4>
        <li>组件抛出的submit方法包含form表单数据和关闭按钮加载状态的回调函数，submit(form, cb)，提交完成后，需要手动调用cb()来关闭加载中状态</li>
        <li>组件也支持传入form，初始值对象。form初始值的优先级大于表单元素配置中的value</li>
        <li>详细表单元素配置规则请参照 <a href="/#/label">Item表单元素</a> 菜单</li>
        <li>表单元素配置所支持的type目前有：</li>
        <sib-table
          size="mini"
          :is-pagination="false"
          :table-column="tableColumn"
          :table-data="tableData"
        />
      </div>
      <sib-form
        :row-size="3"
        :item-info="itemInfo"
        :form="form"
        @submit="handlerSubmit"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>5、表单项联动</h4>
        <li>为某个表单项配置 relationships 可使它和其他表单项建立联动关系</li>
        <li>
          每当配置了该字段的表单项的值发生变更时：
          (1) relationships 对象中每一个key所对应在表单内的值将会被清空;
          (2) relationships 对象中的key所对应的value不为空时，若该key对应的字段配置为接口请求数据，则将会把该表单项变更后的值当做参数，重新调用接口获取数据
        </li>
      </div>
      <sib-form
        :row-size="3"
        :form="form5"
        :item-info="itemInfo5"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>6、自动计算表单项的结果</h4>
        <li>为某个表单项配置 relationResults 可以自定义它的运算结果。</li>
        <li>relationResults 的值类型为Function或者String(可被eval解析的function)，参数为表单对象(form)，该配置需要return一个结果，用于重写该表单项的值。</li>
        <li>每次其他表单项的值变更时，都会触发运算结果配置函数</li>
      </div>
      <sib-form
        :row-size="3"
        :form="form6"
        :item-info="itemInfo6"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>7、带边框的表单</h4>
        <li>配置 border 属性即可</li>
        <li>如需禁用整个表单，配置 disabled 即可</li>
      </div>
      <sib-form
        border
        disabled
        :row-size="3"
        :form="form"
        :item-info="itemInfo.filter(({ label }) => label).slice(0, 12)"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>8、表单值展示</h4>
        <li>整个表单内全部使用 type 为 label 的表单元素即可</li>
      </div>
      <sib-form
        border
        disabled
        :label-width="120"
        :row-size="3"
        :form="form"
        :item-info="itemInfo.filter(({ code }) => form[code]).map(({ label, code, type }) => ({
          label,
          code: ['select', 'table', 'dropselect', 'tree'].includes(type) ? `${code}Name` : code,
          type: 'label'
        })).filter(({ label }) => label)"
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
    <config-table
      step="refs"
      :table-data="refData" />
    <el-backtop target=".master-page" />
  </div>
</template>

<script>
export default {
    name: 'TestForm',
    data() {
        return {
            itemInfo1: [
                {
                    label: '账号',
                    code: 'name',
                    type: 'text',
                    value: '默认内容',
                    maxlength: 4,
                    labelTips: '账号就是你的银行卡账号哦，嘿嘿嘿',
                    unit: '单位',
                },
                {
                    label: '密码',
                    code: 'pwd',
                    type: 'password',
                    maxlength: 10,
                },
            ],
            itemInfo2: [
                {
                    label: '账号',
                    code: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    label: '密码',
                    code: 'pwd',
                    type: 'password',
                    required: true,
                },
            ],
            rules: {
                name: [
                    {
                        min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change',
                    },
                ],
                pwd: [
                    {
                        min: 8, max: 10, message: '长度在 8 到 10 个字符', trigger: 'blur',
                    },
                ],
            },
            itemInfo: [
                {
                    label: '账号',
                    code: 'name',
                    type: 'text',
                    value: '默认内容',
                    maxlength: 4,
                    required: true,
                    unit: '单位',
                },
                {
                    label: '单选下拉框',
                    code: 'singleSelection',
                    type: 'select',
                    required: true,
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
                    unit: '单位',
                },
                {
                    label: '多选下拉框',
                    code: 'multipleSelection',
                    type: 'select',
                    multiple: true,
                    required: true,
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
                {
                    label: '时分',
                    code: 'time',
                    type: 'time',
                    required: true,
                },
                {
                    label: '时分区间',
                    code: 'timerange',
                    type: 'time',
                    isRange: true,
                    required: true,
                },
                {
                    label: '年份',
                    code: 'year',
                    type: 'year',
                },
                {
                    label: '日期',
                    code: 'date',
                    type: 'date',
                    required: true,
                },
                {
                    label: '多个日期',
                    code: 'dates',
                    type: 'dates',
                    required: true,
                },
                {
                    label: '弹窗选择器',
                    type: 'table',
                    code: 'tableCode',
                    showCode: 'tableName',
                    required: true,
                    tableConfig: {
                        multiple: true,
                        field: [
                            {
                                label: '姓名 (name)',
                                code: 'name',
                            },
                            {
                                label: '人员编码 (code)',
                                code: 'code',
                            },
                        ],
                        data: [],
                    },
                    requestConfig: {
                        url: '/table-data.json',
                        method: 'get',
                        params: {},
                    },
                    trans: [
                        {
                            from: 'name',
                            to: 'tableName',
                        },
                        {
                            from: 'code',
                            to: 'tableCode',
                        },
                    ],
                },
                {
                    label: '树选择器',
                    type: 'tree',
                    code: 'treeCode',
                    showCode: 'treeName',
                    showCheckbox: true,
                    required: true,
                    requestConfig: {
                        url: '/tree-data.json',
                        method: 'get',
                        params: {},
                    },
                    trans: [
                        {
                            from: 'name',
                            to: 'treeName',
                        },
                        {
                            from: 'code',
                            to: 'treeCode',
                        },
                    ],
                },
                {
                    label: '数值框',
                    code: 'number',
                    type: 'number',
                    min: 6,
                    required: true,
                },
                {
                    label: '连接输入框',
                    code: 'inputrange',
                    type: 'inputrange',
                    required: true,
                },
                {
                    label: '连接数值框',
                    code: 'numberrange',
                    type: 'numberrange',
                    required: true,
                },
                {
                    label: '级联选择',
                    type: 'cascader',
                    code: 'cascader',
                    props: {
                        label: 'name',
                        value: 'id',
                        emitPath: false,
                    },
                    dataType: 'number',
                    requestConfig: {
                        url: '/cascader-data.json',
                        method: 'get',
                        params: {},
                        // 请求完数据的回调，可以用来修改数据结构
                        callback: (res) => res.data.data,
                    },
                    required: true,
                },
                {
                    // label: 'drop单选下拉',
                    code: 'dropSelection',
                    type: 'dropselect',
                    required: true,
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
            ],
            form: {
                name: '张三',
                pwd: '123456',
                singleSelection: '2',
                singleSelectionName: '奔跑的提款机',
                multipleSelection: ['2', '3'],
                multipleSelectionName: '奔跑的提款机,菜鸟',
                time: '18:25',
                year: '2016',
                date: '2021-07-08',
                tableCode: '000,666',
                tableCodeName: '小策,奔跑的提款机',
                tableName: '小策,奔跑的提款机',
                treeCode: [30, 32],
                treeCodeName: '角色编辑,角色列表',
                treeName: '角色编辑,角色列表',
            },
            tableColumn: [
                {
                    label: 'type',
                    code: 'type',
                },
                {
                    label: '说明',
                    code: 'des',
                },
            ],
            tableData: [
                {
                    type: 'label',
                    des: '用于展示',
                },
                {
                    type: 'text',
                    des: '文本输入框',
                },
                {
                    type: 'password',
                    des: '密码输入框',
                },
                {
                    type: 'textarea',
                    des: '文本域输入框',
                },
                {
                    type: 'number',
                    des: '数值输入框',
                },
                {
                    type: 'inputrange',
                    des: '连接形式的文本框输入框',
                },
                {
                    type: 'numberrange',
                    des: '连接形式的数字框输入框',
                },
                {
                    type: 'dropselect',
                    des: '下拉菜单类型的下拉框',
                },
                {
                    type: 'select',
                    des: '下拉框',
                },
                {
                    type: 'check',
                    des: '复选框',
                },
                {
                    type: 'radio',
                    des: '单选框',
                },
                {
                    type: 'switch',
                    des: '滑块',
                },
                {
                    type: 'time',
                    des: '时分秒选择器',
                },
                {
                    type: 'week',
                    des: '周选择器(返回值为日期区间)',
                },
                {
                    type: 'year',
                    des: '年份选择器',
                },
                {
                    type: 'month',
                    des: '月份选择器',
                },
                {
                    type: 'date',
                    des: '日期选择器',
                },
                {
                    type: 'dates',
                    des: '多个日期选择器',
                },
                {
                    type: 'datetime',
                    des: '年月日时分秒选择器',
                },
                {
                    type: 'datetimerange',
                    des: '年月日时分秒区间选择器',
                },
                {
                    type: 'daterange',
                    des: '日期区间选择器',
                },
                {
                    type: 'monthrange',
                    des: '月份区间选择器',
                },
                {
                    type: 'upload',
                    des: '上传文件选择器',
                },
                {
                    type: 'tree',
                    des: '树弹窗选择器',
                },
                {
                    type: 'table',
                    des: '表格弹窗选择器',
                },
                {
                    type: 'slot',
                    des: '以插槽形式插入',
                },
            ],
            itemInfo5: [
                {
                    label: '状态',
                    placeholder: '请切换状态，关联字段将会清空',
                    code: 'status',
                    type: 'select',
                    options: [
                        {
                            key: 1,
                            value: '开始',
                        },
                        {
                            key: 2,
                            value: '进行中',
                        },
                        {
                            key: 5,
                            value: '已完成',
                        },
                    ],
                    relationships: {
                        name: 'myname',
                        age: 'myage',
                    },
                },
                {
                    label: '姓名',
                    code: 'name',
                    type: 'select',
                    options: [],
                    optionProps: {
                        key: 'id',
                        value: 'name',
                    },
                    required: true,
                    filterable: true,
                    requestConfig: {
                        url: '/table-data.json',
                        method: 'get',
                        params: {},
                        // 请求完数据的回调，可以用来修改数据结构
                        callback: (res) => res.data.data.records,
                    },
                },
                {
                    label: '年龄',
                    code: 'age',
                    type: 'select',
                    dataType: 'number',
                    options: [
                        {
                            key: 10,
                            value: '10岁',
                        },
                        {
                            key: 20,
                            value: '20岁',
                        },
                        {
                            key: 30,
                            value: '30岁',
                        },
                    ],
                    required: true,
                },

            ],
            form5: {
                name: '2',
                age: 20,
            },
            itemInfo6: [
                {
                    label: '数值1',
                    code: 'number1',
                    type: 'text',
                    valueType: 'number',
                },
                {
                    label: '数值2',
                    code: 'number2',
                    type: 'number',
                    showCalculator: true,
                },
                {
                    label: '结果1',
                    labelTips: '计算公式：数值1 * 数值2 ÷ 1.6 \nrelationResults 类型为 Function',
                    code: 'result1',
                    type: 'text',
                    precision: 5,
                    _tip: '下面的relationResults实际上是写的标准Function，该demo在处理展示代码的逻辑中存在问题，导致被加上了双引号',
                    relationResults: (form) => Number(form.number1) * Number(form.number2) / 1.6,
                },
                {
                    label: '数值3',
                    code: 'number3',
                    type: 'text',
                    valueType: 'number',
                },
                {
                    label: '数值4',
                    code: 'number4',
                    type: 'number',
                    showCalculator: true,
                },
                {
                    label: '结果2',
                    labelTips: '计算公式：(数值3 + 数值4 + 结果1) - 0.8 \nrelationResults 类型为 String(可被eval解析的function)',
                    code: 'result2',
                    type: 'label',
                    _tip: '下面的relationResults是一个字符串，它的内容是一个函数方法',
                    relationResults: '({ result1, number3, number4 }) => Number(number3) + Number(number4) + Number(result1) - 0.8',
                },
            ],
            form6: {
                number3: 2,
            },
            attributeData: [
                {
                    params: 'size',
                    des: '组件尺寸',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: "'small'",
                },
                {
                    params: 'rowSize',
                    des: '一行展示多少个表单元素',
                    type: 'Number',
                    values: '-',
                    defaultVal: '1',
                },
                {
                    params: 'inline',
                    des: '是否行内排列',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'border',
                    des: '是否需要边框',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'form',
                    des: '表单默认值',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'rules',
                    des: '表单校验规则',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'labelPosition',
                    des: 'label排列方向',
                    type: 'String',
                    values: 'left/top/right',
                    defaultVal: "'left'",
                },
                {
                    params: 'labelWidth',
                    des: 'label宽度',
                    type: 'Number',
                    values: '-',
                    defaultVal: '120',
                },
                {
                    params: 'isSubmit',
                    des: '是否需要提交按钮',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'isCancel',
                    des: '是否需要重置按钮',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'submitText',
                    des: '提交按钮文案',
                    type: 'String',
                    values: '',
                    defaultVal: "'提交'",
                },
                {
                    params: 'cancelText',
                    des: '重置按钮文案',
                    type: 'String',
                    values: '',
                    defaultVal: "'重置'",
                },
                {
                    params: 'disabled',
                    des: '是否禁用整个表单',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'enterable',
                    des: '是否支持敲回车提交',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'itemInfo',
                    des: '表单配置项，不同类型的表单项配置规则请查阅对应表单项配置说明',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'itemInfo[i].label',
                    des: '对应表单项的名称',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'itemInfo[i].code',
                    des: '对应表单项所绑定的code(表单元素修改后的值，会通过该code保存在form对象里，并在点击提交时返回该对象)，必传',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'itemInfo[i].type',
                    des: '对应表单项的类型，必传',
                    type: 'String',
                    values: '见上文表单元素配置所支持的type',
                    defaultVal: '-',
                },
                {
                    params: 'itemInfo[i].dataType',
                    des: '声明该表单项的值类型（用于表单校验及下拉框数据匹配）',
                    type: 'String',
                    values: "'string'、'number'、'array'",
                    defaultVal: '默认根据 表单数据对象(form) 或 该表单项配置的默认值(value) 来取该字段的值类型，取不到则将其视为 string 类型的值',
                },
                {
                    params: 'itemInfo[i].startCode',
                    des: '定义起始字段名称（type为 inputrange/numberrange/daterange/datetimerange/monthrange 类型的表单项生效）',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'itemInfo[i].endCode',
                    des: '定义结束字段名称（type为 inputrange/numberrange/daterange/datetimerange/monthrange 类型的表单项生效）',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'itemInfo[i].relationships',
                    des: '联动关系配置。该表单项的值变更时，其 relationships 所配置的字段key所对应的值将会清空，若value不为空，并且字段key对应的字段配置如果为接口请求的数据，将会把该表单项变更后的值当做参数，重新调用接口获取数据。',
                    type: 'String',
                    values: '{ key: value }',
                    defaultVal: '-',
                },
                {
                    params: 'itemInfo[i].relationResults',
                    des: '运算结果配置函数。其类型为Function或者String(可被eval解析的function)，参数为表单对象(form)，该配置需要return一个结果，用于重写该表单项的值。每次其他表单项的值变更时，都会触发运算结果配置函数',
                    type: 'Function、String(可被eval解析的function)',
                    values: '-',
                    defaultVal: '-',
                },
            ],
            eventData: [
                {
                    name: 'change',
                    des: '表单change事件',
                    params: 'form',
                },
                {
                    name: 'reset',
                    des: '表单重置事件',
                    params: '-',
                },
                {
                    name: 'submit',
                    des: '表单提交事件，submit(form, cb)，提交完成后，需要手动调用cb()来关闭提交按钮加载中状态',
                    params: 'form, cb',
                },
                {
                    name: 'form-item-change',
                    des: '表单元素change事件',
                    params: 'value, info',
                },
                {
                    name: 'picker-change',
                    des: 'table弹窗选择器change事件',
                    params: '{ rows, value }',
                },
            ],
            slotData: [
                {
                    name: 'info.code',
                    des: '表单内部的插槽，name动态为该列code',
                    params: '当前的插槽配置、当前的表单数据(info, form)',
                },
                {
                    name: 'more-operate',
                    des: '插入提交按钮后面，可用于添加其他按钮',
                    params: '当前的表单数据(currentForm)',
                },
            ],
            refData: [
                {
                    name: 'currentForm',
                    des: '当前的表单数据',
                    type: '1',
                },
                {
                    name: 'handlerResetForm()',
                    des: '清空表单数据',
                    type: '2',
                },
                {
                    name: 'resetFormItemWidth()',
                    des: '通过调用该方法可以动态调整表单宽度',
                    type: '2',
                },
                {
                    name: 'getValidateStatus()',
                    des: '通过调用该方法可以获取当前表单的值是否通过校验规则，返回Promise，通过.then获取状态值',
                    type: '2',
                },
            ],
        };
    },
    methods: {
        handlerSubmit(form, cb) {
            cb();
            console.log('表单数据：', form);
        },
    },
};
</script>

<style lang="scss">
.test-form {
    .sib-form {
        padding: 30px 15px;
    }
}
</style>
