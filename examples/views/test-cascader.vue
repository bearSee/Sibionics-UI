<template>
  <div class="test-cascader">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1、普通级联选择器</h4>
      </div>
      <p>{{ $t('当前已选择') }}：{{ value1 || '--' }}</p>
      <sib-item
        v-model="value1"
        :props="props1" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>2、只返回选中节点的值</h4>
        <li>配置 props.emitPath = false</li>
        <li>emitPath 控制在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值</li>
      </div>
      <p>{{ $t('当前已选择') }}：{{ value2 || '--' }}</p>
      <sib-item
        v-model="value2"
        :props="props2" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>3、可选择任意级节点</h4>
        <li>配置 props.checkStrictly = true 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的</li>
      </div>
      <p>{{ $t('当前已选择') }}：{{ value3 || '--' }}</p>
      <sib-item
        v-model="value3"
        :props="props3" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>4、多选</h4>
        <li>配置 props.multiple: true </li>
      </div>
      <p>{{ $t('当前已选择') }}：{{ value4 || '--' }}</p>
      <sib-item
        v-model="value4"
        :props="props4" />
    </example>
    <example
      :ignore-keys="['input']"
      :template-string="templateString">
      <div slot="describe">
        <h4>5、当选中某一级时，动态加载该级下的选项</h4>
        <li>
          通过lazy开启动态加载，并通过lazyload来设置加载数据源的方法。lazyload方法有两个参数，第一个参数node为当前点击的节点，
          第二个resolve为数据加载完成的回调(必须调用)。为了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位
          (默认字段为leaf，可通过props.leaf修改)，否则会简单的以有无子节点来判断是否为叶子节点。
        </li>
      </div>
      <p>{{ $t('当前已选择') }}：{{ value5 || '--' }}</p>
      <sib-item
        v-model="value5"
        :props="props5" />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>6、通过接口请求数据</h4>
        <li>配置 requestConfig: { url: ' ', method: ' ', params: { }, callback: () => {} } </li>
      </div>
      <p>{{ $t('当前已选择') }}：{{ value6 || '--' }}</p>
      <sib-item
        v-model="value6"
        :props="props6" />
    </example>
    <config-table
      step="attributes"
      :table-data="attributeData" />
    <config-table
      step="events"
      :table-data="eventData" />
    <config-table
      step="refs"
      :table-data="refData" />
    <el-backtop target=".master-page" />
  </div>
</template>

<script>

export default {
    name: 'TestCascader',
    data() {
        const defaultOptions = [
            {
                value: 'zhinan',
                label: '指南',
                children: [
                    {
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [
                            {
                                value: 'yizhi',
                                label: '一致',
                            },
                            {
                                value: 'kekong',
                                label: '可控',
                            },
                        ],
                    },
                    {
                        value: 'daohang',
                        label: '导航',
                        children: [
                            {
                                value: 'cexiangdaohang',
                                label: '侧向导航',
                            },
                            {
                                value: 'dingbudaohang',
                                label: '顶部导航',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'zujian',
                label: '组件',
                children: [
                    {
                        value: 'basic',
                        label: 'Basic',
                        children: [
                            {
                                value: 'layout',
                                label: 'Layout 布局',
                            },
                            {
                                value: 'color',
                                label: 'Color 色彩',
                            },
                        ],
                    },
                ],
            },
        ];
        let id = 0;
        return {
            value1: [],
            props1: {
                type: 'cascader',
                options: defaultOptions,
            },
            value2: 'yizhi',
            props2: {
                type: 'cascader',
                options: defaultOptions,
                props: {
                    emitPath: false,
                },
            },
            value3: '',
            props3: {
                type: 'cascader',
                options: defaultOptions,
                props: {
                    emitPath: false,
                    checkStrictly: true,
                },
            },
            value4: '',
            props4: {
                type: 'cascader',
                options: defaultOptions,
                props: {
                    multiple: true,
                },
            },
            value5: '',
            props5: {
                type: 'cascader',
                props: {
                    lazy: true,
                    lazyLoad(node, resolve) {
                        console.log('node', node);
                        const { level } = node;
                        setTimeout(() => {
                            const nodes = Array.from({ length: level + 1 }).map(() => ({
                                // eslint-disable-next-line no-plusplus
                                value: ++id,
                                label: `选项${id}`,
                                leaf: level >= 2,
                            }));
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(nodes);
                        }, 1000);
                    },
                },
            },
            value6: [],
            props6: {
                type: 'cascader',
                props: {
                    label: 'name',
                    value: 'id',
                },
                requestConfig: {
                    url: '/cascader-data.json',
                    method: 'get',
                    params: {},
                    // 请求完数据的回调，可以用来修改数据结构
                    callback: (res) => res.data.data,
                },
            },
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'Array（单选且props.props.emitPath = false时，类型为String）',
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
                    des: '表单元素的类型(必传type=cascader)',
                    type: 'String',
                    values: 'cascader',
                    defaultVal: '-',
                },
                {
                    params: 'props.value',
                    des: '若绑定值为空，将获取该值作为初始值',
                    type: 'Array（单选且props.props.emitPath = false时，类型为String）',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.size',
                    des: '尺寸大小',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: 'small',
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
                    des: '输入框占位提示',
                    type: 'String',
                    values: '',
                    defaultVal: '请选择',
                },
                {
                    params: 'props.clearable',
                    des: '是否展示清空图标',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.showAllLevels',
                    des: '输入框中是否显示选中值的完整路径',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.collapseTags',
                    des: '多选模式下是否折叠Tag',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.separator',
                    des: '选项分隔符',
                    type: 'String',
                    values: '-',
                    defaultVal: "斜杠' / '",
                },
                {
                    params: 'props.popperClass',
                    des: '自定义浮层类名',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.filterable',
                    des: '是否可搜索',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.beforeFilter',
                    des: '筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选',
                    type: 'function(value)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.filterMethod',
                    des: '自定义搜索逻辑，第一个参数是节点node，第二个参数是搜索关键词keyword，通过返回布尔值表示是否命中',
                    type: 'function(node, keyword)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.debounce',
                    des: '搜索关键词输入的去抖延迟，毫秒',
                    type: 'Number',
                    values: '-',
                    defaultVal: '300',
                },
                {
                    params: 'props.options',
                    des: '下拉选项配置',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[]',
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
                    des: '接口请求配置项(如果使用接口请求下拉数据，则 options 无效)',
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
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'props.props',
                    des: '配置选项',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'props.props.expandTrigger',
                    des: '次级菜单的展开方式',
                    type: 'String',
                    values: 'click / hover',
                    defaultVal: "'click'",
                },
                {
                    params: 'props.props.multiple',
                    des: '是否多选',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.props.checkStrictly',
                    des: '在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.props.lazy',
                    des: '是否动态加载子节点，需与 lazyLoad 方法结合使用',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.props.lazyLoad',
                    des: '加载动态数据的方法，仅在 lazy 为 true 时有效',
                    type: 'function(node, resolve)，node为当前点击的节点，resolve为数据加载完成的回调(必须调用)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.props.label',
                    des: '指定下拉选项配置的展示值所对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'label'",
                },
                {
                    params: 'props.props.value',
                    des: '指定下拉选项配置的主键所对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'value'",
                },
                {
                    params: 'props.props.children',
                    des: '指定选取的子选项数据对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'children'",
                },
                {
                    params: 'props.props.disabled',
                    des: '指定下拉选项禁用状态对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'disabled'",
                },
                {
                    params: 'props.props.leaf',
                    des: '指定叶子节点（最底层无children的节点）的标志位对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'leaf'",
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
                    params: 'value, formatValue',
                },
            ],
            refData: [
                {
                    name: 'getCheckedNodes(leafOnly)',
                    des: '获取选中的节点；参数 leafOnly: 是否只是叶子节点，默认值为 false',
                    type: 2,
                },
            ],
            templateString: `
<template>
    <div class="example-box">
        <!-- 组件使用演示 -->
        <sib-item :props="props" v-model="value" />
    </div>
</template>

<script>

export default {
    name: 'exampleBox',
    data() {
        let id = 0;
        return {
            value: [],
            props: {
                type: 'cascader',
                props: {
                    lazy: true,
                    lazyLoad(node, resolve) {
                        console.log('node', node);
                        const { level } = node;
                        setTimeout(() => {
                            const nodes = Array.from({ length: level + 1 }).map(() => ({
                                // eslint-disable-next-line no-plusplus
                                value: ++id,
                                label: \`选项\${id}\`,
                                leaf: level >= 2,
                            }));
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(nodes);
                        }, 1000);
                    },
                },
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
.test-cascader {
  .sib-item {
    width: 300px;
  }
}
</style>
