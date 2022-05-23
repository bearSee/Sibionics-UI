<template>
  <div class="test-tree-picker">
    <h3>
      一、使用示例
    </h3>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1、弹窗树选择器基础用法</h4>
        <li>labelProp：树渲染时将从 labelProp 指定的字段去取对应值进行展示，默认为 name</li>
      </div>
      <p>当前选中：{{ value1 }}</p>
      <sib-item
        v-model="value1"
        :props="props1"
        @tree-picker-change="treePickerChange"
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
        @tree-picker-change="treePickerChange"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>3、从接口请求数据</h4>
        <li>配置 requestConfig，可实现通过后台接口获取数据，此时配置 data 无效</li>
      </div>
      <p>当前选中：{{ value3 }}</p>
      <sib-item
        v-model="value3"
        :props="props3"
        @tree-picker-change="treePickerChange"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>4、多选</h4>
        <li>配置 show-checkbox 为 true 即可实现多选</li>
      </div>
      <p>当前选中：{{ value4 }}</p>
      <sib-item
        v-model="value4"
        :props="props4"
        @tree-picker-change="treePickerChange"
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
        @tree-picker-change="treePickerChange"
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
        const treeData = [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1',
                }, {
                    id: 10,
                    label: '三级 1-1-2',
                }],
            }],
        }, {
            id: 2,
            label: '一级 2',
            disabled: true,
            children: [{
                id: 5,
                label: '二级 2-1',
            }, {
                id: 6,
                label: '二级 2-2',
            }],
        }, {
            id: 3,
            label: '一级 3',
            children: [{
                id: 7,
                label: '二级 3-1',
            }, {
                id: 8,
                label: '二级 3-2',
                children: [{
                    id: 11,
                    label: '三级 3-2-1',
                }, {
                    id: 12,
                    label: '三级 3-2-2',
                }, {
                    id: 13,
                    label: '三级 3-2-3',
                }],
            }],
        }];
        return {
            value1: [],
            props1: {
                type: 'tree',
                labelProp: 'label',
                data: treeData,
            },
            value2: [],
            props2: {
                type: 'tree',
                showCode: 'label',
                labelProp: 'label',
                data: treeData,
            },
            value3: [],
            props3: {
                type: 'tree',
                showCode: 'name',
                requestConfig: {
                    url: '/tree-data.json',
                    method: 'get',
                    params: {},
                },
            },
            value4: [],
            props4: {
                type: 'tree',
                showCode: 'name',
                showCheckbox: true,
                requestConfig: {
                    url: '/tree-data.json',
                    method: 'get',
                    params: {},
                },
            },
            formatValue: '角色编辑,角色列表',
            value5: [30, 32],
            props5: {
                type: 'tree',
                showCode: 'name',
                showCheckbox: true,
                requestConfig: {
                    url: '/tree-data.json',
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
                    des: '表单元素的类型(必传type=tree)',
                    type: 'String',
                    values: 'tree',
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
                    params: 'props.clearable',
                    des: '是否支持清空',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.data',
                    des: '树数据',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'props.leafOnly',
                    des: '勾选时，是否只是返回叶子节点的数据',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.checkedFormatter',
                    des: '勾选后点击提交，如果选中的数据包含不必要的节点，可以通过 checkedFormatter 来重新修改已选中的数据， 该方法需要 return 一个数组',
                    type: 'Function(checked, halfChecked)',
                    values: '-',
                    defaultVal: 'null',
                },
                {
                    params: 'props.height',
                    des: '树组件高度',
                    type: 'String',
                    values: '-',
                    defaultVal: "'100%'",
                },
                {
                    params: 'props.filter',
                    des: '是否启用筛选',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.filterMethod',
                    des: '自定义筛选规则',
                    type: 'Function',
                    values: '-',
                    defaultVal: 'null',
                },
                {
                    params: 'props.nodeKey',
                    des: '树节点的唯一键',
                    type: 'String',
                    values: '-',
                    defaultVal: "'id'",
                },
                {
                    params: 'props.labelProp',
                    des: '指定节点标签为节点对象的某个属性值',
                    type: '[String, Function]',
                    values: '-',
                    defaultVal: "'name'",
                },
                {
                    params: 'props.childrenProp',
                    des: '指定子树为节点对象的某个属性值',
                    type: 'String',
                    values: '-',
                    defaultVal: "'children'",
                },
                {
                    params: 'props.disabledProp',
                    des: '指定节点选择框是否禁用为节点对象的某个属性值',
                    type: '[String, Function]',
                    values: '-',
                    defaultVal: "'disabled'",
                },
                {
                    params: 'props.showCheckbox',
                    des: '节点是否可被选择',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.clickExpand',
                    des: '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.clickCheck',
                    des: '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.expandAll',
                    des: '是否默认展开所有节点',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.highlight',
                    des: '是否高亮当前选中节点',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.renderContent',
                    des: '树节点的内容区的渲染 Function',
                    type: 'Function',
                    values: '-',
                    defaultVal: 'null',
                },
                {
                    params: 'props.checkStrictly',
                    des: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.accordion',
                    des: '是否每次只打开一个同级树节点展开',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.renderAfterExpand',
                    des: '是否在第一次展开某个树节点后才渲染其子节点',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.label',
                    des: '弹窗标题',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.requestConfig',
                    des: '接口请求配置项(如果使用接口请求数据，则props.data无效)',
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
                    params: 'requestConfig.stringify',
                    des: '通过接口请求数据时是否使用表单提交请求参数',
                    type: 'Boolean',
                    values: 'true, false',
                    defaultVal: 'false',
                },
            ],
            eventData: [
                {
                    name: 'tree-picker-change',
                    des: '选中行之后提交',
                    params: 'rows, halfRows, realChecked, value',
                },
            ],
            slotData: [],
        };
    },
    methods: {
        treePickerChange({
            rows, halfRows, realChecked, value,
        }) {
            console.log('所有节点数据数据：', rows, '\n半选节点数据：', halfRows, '\n实际勾选的数据：', realChecked, '\n对应选中的值：', value);
        },
    },
};
</script>

<style lang="scss">
.test-tree-picker {
  .sib-item {
    width: 300px;
  }
}
</style>
