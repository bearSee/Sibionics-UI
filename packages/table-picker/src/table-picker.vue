<template>
  <el-dialog
    class="sib-table-picker center"
    append-to-body
    v-dialogDrag
    :title="$t(title)"
    :width="width"
    :visible.sync="visible"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <template v-if="(tableConfig.field || []).length">
      <sib-table
        :class="isMultiple ? 'muti-select-table' : 'single-select-table'"
        :index-style="isMultiple ? 'selection' : 'index'"
        :request-config="requestConfig"
        :page-param-keys="tableConfig.pageParamKeys"
        :search-info="tableConfig.query"
        :table-column="tableConfig.field || []"
        :table-data="tableConfig.data"
        :row-size="tableConfig.rowSize || 2"
        :row-key="tableConfig.rowKey || 'id'"
        :label-width="100"
        :lable-position="tableConfig.lablePosition"
        :is-pagination="tableConfig.isPagination !== false"
        :page-size="tableConfig.pageSize || 5"
        :page-sizes="tableConfig.pageSizes || [5, 10]"
        :selected="selected"
        @selection-change="handlerSelectChange" />
    </template>
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
    name: 'SibTablePicker',
    props: {
        visible: {
            type: Boolean,
            required: true,
            default: false,
        },
        tableConfig: {
            type: Object,
            default: () => ({}),
        },
        requestConfig: {
            type: Object,
            default: () => ({}),
        },
        title: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '',
        },
        selected: {
            type: [String, Array],
            default: '',
        },
    },
    data() {
        return {
            selection: [],
        };
    },
    computed: {
        isMultiple() {
            return this.tableConfig.multiple;
        },
    },
    methods: {
        handlerSelectChange(rows) {
            this.selection = rows;
            if (!this.isMultiple && rows.length) this.handleSubmit();
        },
        handleSubmit() {
            // if (!this.selection.length) {
            //     this.$message.warning(`${this.$t('请选择')}${this.title}`);
            //     return;
            // }
            this.$emit('selection-change', this.selection);
        },
        handleClose() {
            this.$emit('update:visible', false);
            this.$emit('cancel');
        },
    },
};
</script>
