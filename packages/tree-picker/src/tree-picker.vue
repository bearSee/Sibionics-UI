<template>
  <el-dialog
    class="sib-tree-picker center"
    v-dialogDrag
    :width="width || '35%'"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    append-to-body>
    <sib-tree
      ref="sibTree"
      v-bind="$attrs"
      :data="data"
      :request-config="requestConfig"
      :height="height"
      :filter="filter"
      :node-key="nodeKey"
      :label-prop="labelProp"
      :show-checkbox="showCheckbox"
      :selected="selected"
      :click-expand="showCheckbox"
    />
    <span
      slot="footer"
      class="dialog-footer">
      <sib-throttle
        :time="1000"
        events="click">
        <el-button
          type="primary"
          @click="handleSubmit">
          {{ $t('确认') }}
        </el-button>
      </sib-throttle>
      <el-button @click="handleClose">{{ $t('取消') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
    name: 'SibTreePicker',
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        leafOnly: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Array,
            default: () => [],
        },
        requestConfig: {
            type: Object,
            default: () => ({}),
        },
        width: {
            type: String,
            default: '',
        },
        height: {
            type: String,
            default: '100%',
        },
        // 是否启用筛选
        filter: {
            type: Boolean,
            default: false,
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
        showCheckbox: {
            type: Boolean,
            default: false,
        },
        // 已选中数据
        selected: {
            type: [String, Array],
            default: '',
        },
    },
    data() {
        return {};
    },
    methods: {
        handleSubmit() {
            if (this.showCheckbox) {
                const checked = this.$refs.sibTree.getCheckedNodes(this.leafOnly);
                const halfChecked = this.$refs.sibTree.getHalfCheckedNodes();
                this.$emit('selection-change', checked, halfChecked);
            } else {
                const noeObj = this.$refs.sibTree.getCurrentNode();
                this.$emit('selection-change', [noeObj], []);
            }
            // this.handleClose();
        },
        handleClose() {
            this.$emit('update:visible', false);
            this.$emit('cancel');
        },
    },
};
</script>
