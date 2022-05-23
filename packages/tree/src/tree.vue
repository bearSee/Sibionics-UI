<template>
  <div
    class="sib-tree"
    :style="{ height }">
    <div class="tree-header">
      <slot name="filter-box" />
      <el-input
        :placeholder="placeholder"
        v-if="filterable"
        v-model.trim="filterText"
        clearable />
    </div>
    <div
      class="tree-container"
      :style="{ height: filterable ? 'calc(100% - 50px)' : '100%' }">
      <el-scrollbar>
        <el-tree
          ref="tree"
          class="filter-tree"
          v-loading="isLoading"
          :data="treeData"
          :indent="12"
          :show-checkbox="showCheckbox"
          :node-key="nodeKey"
          :props="defaultProps"
          :lazy="lazy"
          :load="load"
          :check-on-click-node="clickCheck"
          :expand-on-click-node="clickExpand"
          :default-expand-all="expandAll"
          :filter-node-method="filterNode"
          :highlight-current="highlight"
          :render-content="renderContent"
          :check-strictly="checkStrictly"
          :render-after-expand="renderAfterExpand"
          :accordion="accordion"
          @node-click="nodeClick" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>

export default {
    name: 'SibTree',
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        requestConfig: {
            type: Object,
            default: () => ({}),
        },
        height: {
            type: String,
            default: '100%',
        },
        placeholder: {
            type: String,
            default: '输入关键字进行过滤',
        },
        // 是否启用筛选
        filterable: {
            type: Boolean,
            default: false,
        },
        // 自定义筛选规则
        filterMethod: {
            type: Function,
            default: null,
        },
        // 树节点唯一键
        nodeKey: {
            type: String,
            default: 'id',
        },
        // 展示的字段名
        labelProp: {
            type: [String, Function],
            default: 'name',
        },
        // 子集字段名
        childrenProp: {
            type: String,
            default: 'children',
        },
        disabledProp: {
            type: [String, Function],
            default: 'disabled',
        },
        isLeafProp: {
            type: [String, Function],
            default: 'isLeaf',
        },
        showCheckbox: {
            type: Boolean,
            default: false,
        },
        lazy: {
            type: Boolean,
            default: false,
        },
        load: {
            type: Function,
            default: null,
        },
        // 已选中数据
        selected: {
            type: [String, Array],
            default: '',
        },
        clickExpand: {
            type: Boolean,
            default: true,
        },
        clickCheck: {
            type: Boolean,
            default: false,
        },
        expandAll: {
            type: Boolean,
            default: true,
        },
        highlight: {
            type: Boolean,
            default: false,
        },
        renderContent: {
            type: Function,
            default: null,
        },
        checkStrictly: {
            type: Boolean,
            default: false,
        },
        accordion: {
            type: Boolean,
            default: false,
        },
        renderAfterExpand: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        let selection = [];
        if (this.selected) {
            const valueType = Object.prototype.toString.call(this.selected);
            if (valueType === '[object Array]') selection = this.selected;
            if (valueType === '[object String]') selection = this.selected.split(',');
        }
        return {
            isLoading: false,
            filterText: '',
            treeData: [],
            selection,
            defaultProps: {
                children: this.childrenProp,
                label: this.labelProp,
                disabled: this.disabledProp,
                isLeaf: this.isLeafProp,
            },
        };
    },
    computed: {
        refTree() {
            return this.$refs.tree;
        },
    },
    watch: {
        data: {
            deep: true,
            handler() {
                this.getTreeData();
            },
        },
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    methods: {
        filterNode(value, data) {
            // 当过滤字段为空时不做任何处理
            if (!value) return true;
            const customFilter = this.filterMethod && typeof this.filterMethod === 'function';
            return customFilter ? this.filterMethod(value, data) : data[this.labelProp].indexOf(value) !== -1;
        },
        nodeClick(data, node) {
            this.$emit('node-click', data, node);
        },
        getCheckedNodes(leafOnly, includeHalfChecked) {
            return this.$refs.tree.getCheckedNodes(leafOnly, includeHalfChecked);
        },
        getHalfCheckedNodes() {
            return this.$refs.tree.getHalfCheckedNodes();
        },
        setCheckedNodes(array) {
            this.$refs.tree.setCheckedNodes(array);
        },
        setCheckedKeys(array) {
            this.$refs.tree.setCheckedKeys(array);
        },
        getNode(node) {
            return this.$refs.tree.getNode(node);
        },
        getCurrentNode() {
            return this.$refs.tree.getCurrentNode();
        },
        setCurrentNode(node) {
            this.$refs.tree.setCurrentNode(node);
        },
        setCurrentKey(key) {
            this.$refs.tree.setCurrentKey(key);
        },
        remove(node) {
            this.$refs.tree.remove(node);
        },
        // 获取树数据
        getTreeData() {
            const {
                url, method, params, callback, stringify,
            } = this.requestConfig;

            if (!url) {
                this.treeData = this.data || [];
                this.$nextTick(() => {
                    if (this.selection.length) this.setCheckedKeys(this.selection);
                });
                return;
            }
            this.isLoading = true;
            const requestUrl = method === 'post' ? url : `${url}?${this.$qs.stringify(params)}`;
            this.$http[method || 'get'](requestUrl, stringify ? this.$qs.stringify(params) : params).then((res) => {
                const data = res && res.data && res.data.data || {};
                if (callback && typeof callback === 'function') {
                    this.treeData = callback(data) || data || [];
                } else {
                    this.treeData = data || [];
                }
                this.$nextTick(() => {
                    if (this.selection.length) this.setCheckedKeys(this.selection);
                });
            }).finally(() => {
                this.isLoading = false;
            });
        },
    },
    created() {
        this.getTreeData();
    },
};
</script>
