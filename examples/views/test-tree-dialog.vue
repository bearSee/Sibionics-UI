<template>
  <div class="test-tree-dialog">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :excess-template-string="excessTemplateString">
      <div slot="describe">
        <h4>1、{{ $t('树选择器(单选)') }}</h4>
        <li>{{ $t('labelProp：树渲染时将从 labelProp 指定的字段去取对应值进行展示，默认为 name') }}</li>
      </div>
      <div>
        <p>{{ $t('当前已选择') }}：{{ selected1 || '--' }}</p>
        <el-button
          type="primary"
          @click="visible1 = true">
          {{ $t('点击打开树选择器(单选)') }}
        </el-button>
      </div>
      <sib-tree-picker
        :title="$t('树选择器(单选)')"
        height="300px"
        label-prop="label"
        :visible.sync="visible1"
        :data="treeData"
        @selection-change="selectionChange($event, 'selected1')"
      />
    </example>
    <example :excess-template-string="excessTemplateString">
      <div slot="describe">
        <h4>2、{{ $t('树选择器(多选)') }}</h4>
      </div>
      <div>
        <p>{{ $t('当前已选择') }}：{{ selected2 || '--' }}</p>
        <el-button
          type="primary"
          @click="visible2 = true">
          {{ $t('点击打开树选择器(多选)') }}
        </el-button>
      </div>
      <sib-tree-picker
        :title="$t('树选择器(多选)')"
        height="300px"
        show-checkbox
        label-prop="label"
        :selected="selections2"
        :visible.sync="visible2"
        :data="treeData"
        @selection-change="selectionChange($event, 'selected2')"
      />
    </example>
    <example :excess-template-string="excessTemplateString">
      <div slot="describe">
        <h4>3、{{ $t('根据接口请求树数据') }}</h4>
      </div>
      <div>
        <p>{{ $t('当前已选择') }}：{{ selected3 || '--' }}</p>
        <el-button
          type="primary"
          @click="visible3 = true">
          {{ $t('点击打开树选择器(多选)') }}
        </el-button>
      </div>
      <sib-tree-picker
        :title="$t('根据接口请求树数据')"
        height="300px"
        show-checkbox
        :selected="selections3"
        :visible.sync="visible3"
        :request-config="requestConfig"
        @selection-change="selectionChange($event, 'selected3')"
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
        return {
            treeData: [{
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
            }],
            visible1: false,
            selected1: '',
            visible2: false,
            selected2: '三级 1-1-2,二级 2-2',
            selections2: [10, 6],
            visible3: false,
            selected3: '创建账号,修改密码',
            selections3: [24, 26],
            excessTemplateString: `<el-button type="primary" @click="visible = true">${this.$t('点击打开树选择器')}</el-button>`,
            requestConfig: {
                url: '/tree-data.json',
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
                    params: 'leafOnly',
                    des: '勾选时，是否只是返回叶子节点的数据',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'height',
                    des: '树组件高度',
                    type: 'String',
                    values: '-',
                    defaultVal: "'100%'",
                },
                {
                    params: 'filter',
                    des: '是否启用筛选',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'filterMethod',
                    des: '自定义筛选规则',
                    type: 'Function',
                    values: '-',
                    defaultVal: 'null',
                },
                {
                    params: 'nodeKey',
                    des: '树节点的唯一键',
                    type: 'String',
                    values: '-',
                    defaultVal: "'id'",
                },
                {
                    params: 'labelProp',
                    des: '指定节点标签为节点对象的某个属性值',
                    type: '[String, Function]',
                    values: '-',
                    defaultVal: "'name'",
                },
                {
                    params: 'childrenProp',
                    des: '指定子树为节点对象的某个属性值',
                    type: 'String',
                    values: '-',
                    defaultVal: "'children'",
                },
                {
                    params: 'disabledProp',
                    des: '指定节点选择框是否禁用为节点对象的某个属性值',
                    type: '[String, Function]',
                    values: '-',
                    defaultVal: "'disabled'",
                },
                {
                    params: 'isLeafProp',
                    des: '指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效',
                    type: '[String, Function]',
                    values: '-',
                    defaultVal: "'isLeaf'",
                },
                {
                    params: 'showCheckbox',
                    des: '节点是否可被选择',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'selected',
                    des: '已选择的数据',
                    type: '[String, Array]',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'clickExpand',
                    des: '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'clickCheck',
                    des: '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'expandAll',
                    des: '是否默认展开所有节点',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'highlight',
                    des: '是否高亮当前选中节点',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'renderContent',
                    des: '树节点的内容区的渲染 Function',
                    type: 'Function',
                    values: '-',
                    defaultVal: 'null',
                },
                {
                    params: 'checkStrictly',
                    des: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'accordion',
                    des: '是否每次只打开一个同级树节点展开',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'renderAfterExpand',
                    des: '是否在第一次展开某个树节点后才渲染其子节点',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'data',
                    des: '树数据',
                    type: 'Array',
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
                    params: 'requestConfig',
                    des: '接口请求配置项(如果使用接口请求数据，则传入的data无效)',
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
                    des: '点击确认触发的事件',
                    params: '(checked, halfChecked) 第一个参数表示选中的节点，第二个表示半选节点',
                },
            ],
            slotData: [],
        };
    },
    methods: {
        selectionChange(checked, key) {
            this[key] = checked.map(({ name, label }) => name || label).join();
            console.log('选中的节点数据：', checked);
        },
    },
};
</script>

<style lang="scss">
.test-tree-dialog {
}
</style>
