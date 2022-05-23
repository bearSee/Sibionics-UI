<template>
  <div class="test-tree">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example>
      <div slot="describe">
        <h4>1、{{ $t('普通树') }}</h4>
      </div>
      <sib-tree
        node-key="id"
        label-prop="label"
        disabled-prop="disabled"
        children-prop="children"
        :data="treeData"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>2、{{ $t('带筛选功能') }}</h4>
        <li>filterable: {{ $t('是否开启前端筛选功能') }}</li>
        <li>show-checkbox: {{ $t('是否支持勾选') }}</li>
        <li>selected: {{ $t('默认选中；可以是 Array，也可以是根据逗号拼接的字符串') }}</li>
        <li>{{ $t('获取勾选的数据可以通过ref调用 sib-tree 内部提供的方法来获取，详情请参照下方 Refs 介绍') }}</li>
      </div>
      <sib-tree
        node-key="id"
        label-prop="label"
        disabled-prop="disabled"
        children-prop="children"
        filterable
        show-checkbox
        :data="treeData"
        :selected="selected"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>3、{{ $t('通过接口请求') }}</h4>
      </div>
      <sib-tree
        node-key="id"
        label-prop="name"
        disabled-prop="disabled"
        children-prop="children"
        :request-config="requestConfig"
      />
    </example>
    <example>
      <div slot="describe">
        <h4>4、render-content</h4>
      </div>
      <sib-tree
        node-key="id"
        label-prop="name"
        disabled-prop="disabled"
        children-prop="children"
        :request-config="requestConfig"
        :render-content="renderContent"
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
            selected: [10],
            requestConfig: {
                url: '/tree-data.json',
                method: 'get',
                params: {},
            },
            attributeData: [
                {
                    params: 'data',
                    des: '树数据',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: 'height',
                    des: '树组件高度',
                    type: 'String',
                    values: '-',
                    defaultVal: "'100%'",
                },
                {
                    params: 'filterable',
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
                    des: '指定树节点的展示值所对应的字段编码',
                    type: '[String, Function]',
                    values: '-',
                    defaultVal: "'name'",
                },
                {
                    params: 'childrenProp',
                    des: '指定选取的子树数据对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'children'",
                },
                {
                    params: 'disabledProp',
                    des: '指定节点选择框禁用状态对应的字段编码',
                    type: '[String, Function]',
                    values: '-',
                    defaultVal: "'disabled'",
                },
                {
                    params: 'isLeafProp',
                    des: '指定节点是否为叶子节点（最底层无children的节点），仅在指定了 lazy 属性的情况下生效',
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
                    name: 'node-click',
                    des: '节点被点击时的回调',
                    params: '共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身',
                },
            ],
            slotData: [],
            refData: [
                {
                    name: 'getCheckedNodes',
                    des: '若节点可被选择，则返回目前被选中的节点所组成的数组；该方法接收两个 boolean 类型的参数(leafOnly, includeHalfChecked) ，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false',
                    type: '2',
                },
                {
                    name: 'getHalfCheckedNodes',
                    des: '若节点可被选择，则返回目前半选中的节点所组成的数组',
                    type: '2',
                },
                {
                    name: 'setCheckedNodes',
                    des: '设置目前勾选的节点，使用此方法必须设置 node-key 属性，该方法接收勾选节点数据的数组作为参数',
                    type: '2',
                },
                {
                    name: 'setCheckedKeys',
                    des: '通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性； 该方法接收两个参数(keys, leafOnly)，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false',
                    type: '2',
                },
                {
                    name: 'getNode',
                    des: '根据 data 或者 key 拿到 Tree 组件中的 node，该方法接收一个参数(data)，表示需要获取的节点所对应的 key 或者 data',
                    type: '2',
                },
                {
                    name: 'getCurrentNode',
                    des: '获取当前被选中节点的 data，若没有节点被选中则返回 null',
                    type: '2',
                },
                {
                    name: 'setCurrentNode',
                    des: '通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性，该方法接收一个参数(node)，表示待选节点对象',
                    type: '2',
                },
                {
                    name: 'setCurrentKey',
                    des: '通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性，该方法接收一个参数(key)，表示待选节点的 key，若为 null 则取消当前高亮的节点',
                    type: '2',
                },
                {
                    name: 'remove',
                    des: '删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性，该方法接收一个参数(data)，表示需要删除的节点所对应的 key 或者 data',
                    type: '2',
                },
                {
                    name: 'getTreeData',
                    des: '刷新树',
                    type: '2',
                },
            ],
        };
    },
    methods: {
        renderContent(h, { node, data }) {
            return (
            <span class="custom-tree-node">
                <span>{node.label}</span>
                <span class="node-operate" style="margin-left: 30px;">
                    { node.level === 1 ? <el-button size="mini" type="text" icon="el-icon-plus" on-click={ () => this.handlerAddSubNode(node, data) }>新增子节点</el-button> : '' }
                    <el-button size="mini" type="text" on-click={ () => this.handlerEditNode(node, data) }>编辑</el-button>
                    <el-button size="mini" type="text" on-click={ () => this.handlerDeleteNode(node, data) }>删除</el-button>
                </span>
            </span>);
        },
        handlerAddSubNode(node, data) {
            console.log(node, data);
        },
        handlerEditNode(node, data) {
            console.log(node, data);
        },
        handlerDeleteNode(node, data) {
            console.log(node, data);
        },
        selectionChange(rows) {
            console.log('选中的行数据：', rows);
        },
    },
};
</script>

<style lang="scss">
.test-tree {
  .example {
    .sib-tree {
      height: 300px;
    }
  }
      .custom-tree-node {
          display: flex;
          .node-operate {
              margin-left: 30px;
          }
      }
}
</style>
