<template>
  <div class="sib-table">
    <!-- 表单查询部分 -->
    <div
      class="search-body"
      v-if="searchInfo.length">
      <el-form
        ref="form"
        inline
        :size="size"
        :model="searchForm"
        :rules="rules"
        :label-width="labelWidth ? `${labelWidth}px` : 'auto'"
        :label-position="labelPosition">
        <transition
          name="search-info-transition"
          enter-active-class="animated fadeIn"
          v-for="(info, index) of searchInfo"
          :key="info.code">
          <el-form-item
            ref="formItems"
            :style="`width:${info.itemWidth || (100 / rowSize).toFixed(2)}%;`"
            v-if="info.show !== false"
            v-show="expend || expendAll ? index < searchInfo.length : index < (defaultSize > rowSize - 1 ? rowSize - 1 : (defaultSize > 0 ? defaultSize : rowSize - 1))"
            :class="info.code + '-search-temp search-form__temp'"
            :label="$t(info.label)"
            :prop="info.code">
            <sib-item
              v-model="searchForm[info.code]"
              :ref="`item-${info.code}`"
              :size="size"
              :props="info"
              :format-value="searchForm[info.showCode]"
              @table-picker-change="handlerPickerChange($event, info)"
              @tree-picker-change="handlerPickerChange($event, info)"
              @select-change="handlerSelectChange($event, info)"
              @item-change="handlerChangeItem($event, info)"
              @enter="handlerSearch" />
          </el-form-item>
        </transition>

        <!-- 隐藏域input解决浏览器默认提交bug -->
        <input
          type="text"
          v-show="false"
          v-if="searchInfo.length === 1">

        <!-- 查询、重置按钮 支持插槽传入更多按钮 -->
        <el-form-item
          v-if="!hideSearchButton"
          class="button-list"
          :style="buttonListStyle">
          <sib-throttle
            :time="1000"
            events="click">
            <el-button
              type="primary"
              :size="size"
              :loading="isLoading"
              @click.native="handlerSearch"
              icon="el-icon-search">
              {{ $t('查询') }}
            </el-button>
          </sib-throttle>
          <sib-throttle
            :time="1000"
            events="click">
            <el-button
              v-if="isCancel"
              :size="size"
              @click.native="handlerResetForm"
              icon="el-icon-refresh">
              {{ $t('重置') }}
            </el-button>
          </sib-throttle>
          <template>
            <slot name="search-operate" />
          </template>
        </el-form-item>
      </el-form>
      <div
        class="show-more"
        v-if="!expendAll && searchInfo.length >= rowSize">
        <span v-if="expend">
          <span
            class="search_text"
            @click="expend = !expend">
            {{ $t('收起') }}{{ expendText || '' }}
            <i class="icon el-icon-arrow-up" />
          </span>
        </span>
        <span v-else>
          <span
            class="search_text"
            @click="expend = !expend">
            {{ $t('展开') }}{{ expendText || '' }}
            <i class="icon el-icon-arrow-down" />
          </span>
        </span>
      </div>
    </div>

    <!-- 表格顶部按钮部分 -->
    <div
      class="content-body">
      <slot
        name="content-body"
        :data="currentTableData"
        :selections="realSelections" />
    </div>

    <!-- 表格部分 -->
    <div
      class="table-body"
      :style="`max-height:${tableHeight};`">
      <el-table
        ref="table"
        v-loading="isLoading"
        :data="currentTableData"
        :size="size"
        :height="height"
        :border="border"
        :stripe="stripe"
        :highlight-current-row="highlightCurrentRow"
        :row-class-name="rowClassName"
        :cell-class-name="cellClassName"
        :header-row-class-name="headerRowClassName"
        :header-cell-class-name="headerCellClassName"
        :empty-text="emptyText"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :indent="indent"
        :lazy="lazy"
        :load="load"
        :tree-props="treeProps"
        :row-key="rowKey"
        @row-click="handlerRowClick"
        @row-dblclick="handlerRowdblclick"
        @select="handlerSelect"
        @select-all="handlerSelectAll"
        @sort-change="handlerSortChange"
        @expand-change="handlerExpand">
        <el-table-column
          v-if="indexStyle === 'expand'"
          type="expand">
          <slot
            slot-scope="scope"
            name="expand"
            :row="scope.row"
            :column="scope.column"
            :index="scope.$index"
            :realIndex="scope.$index + ((pageIndex - 1) * currentPageSize)"
          />
        </el-table-column>
        <el-table-column
          v-else-if="indexStyle !== 'none'"
          :type="indexStyle"
          :label="$t('序号')"
          :width="indexWidth" />
        <template v-for="column in tableColumn">
          <el-table-column
            resizable
            reserve-selection
            :class-name="`${column.className || ''} ${column.code}-temp sib-table__temp`"
            :label-class-name="column.labelClassName"
            :align="align"
            :row-key="rowKey"
            :key="column.code"
            :prop="column.code"
            :label="$t(column.label)"
            :width="column.width"
            :min-width="column.minWidth"
            :fixed="column.fixed"
            :header-align="column.headerAlign"
            :show-overflow-tooltip="column.showOverflowTooltip !== false"
            :sortable="column.sortable === true && requestConfig.url ? 'custom' : column.sortable"
            :selectable="column.selectable">
            <!-- 表头slot -->
            <template
              slot="header"
              slot-scope="scope">
              <slot
                v-if="$scopedSlots[column.headerSlotcode]"
                :name="column.headerSlotcode"
                :column="scope.column"
                :config="column"
                :index="scope.$index" />
              <span v-else>{{ column.label }}</span>
            </template>
            <!-- 单元格slot -->
            <slot
              slot-scope="scope"
              v-if="$scopedSlots[column.code] && column.type === 'slot'"
              :name="column.code"
              :row="scope.row"
              :column="scope.column"
              :config="column"
              :index="scope.$index"
              :realIndex="scope.$index + ((pageIndex - 1) * currentPageSize)"
            />
            <template
              slot-scope="scope"
              v-else>
              <template v-if="column.formatter && typeof column.formatter === 'function'">
                {{ column.formatter(scope.row, scope.column, scope.row[column.code]) || '-' }}
              </template>
              <template v-else>
                {{ scope.row[column.code] === 0 ? 0 : scope.row[column.code] || '-' }}
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <!-- 分页器部分 -->

    <div class="pagination-body">
      <div class="select-tip-box">
        <template v-if="indexStyle === 'selection'">
          <span>{{ $t('当前已勾选') }} {{ realSelections.length }} {{ $t('条数据') }}</span>
          <el-button
            type="text"
            @click.native="clearSelection">
            {{ $t('清空') }}
          </el-button>
        </template>
      </div>
      <el-pagination
        v-if="isPagination && !hidePagination"
        background
        :layout="layout"
        :current-page="pageIndex"
        :page-size="currentPageSize"
        :page-sizes="pageSizes"
        :total="currentTotalSize"
        @size-change="handlerSizeChange"
        @current-change="handlerPageChange" />
    </div>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';

export default {
    name: 'SibTable',
    mixins: [formItemMixin],
    props: {
        /**
         * -----公共配置参数-----
         */
        // 组件尺寸
        size: {
            type: String,
            default: 'small',
        },
        /**
         * -----搜索表单相关配置参数-----
         */
        searchInfo: {
            type: Array,
            default: () => ([]),
        },
        // 是否支持敲回车查询
        enterable: {
            type: Boolean,
            default: true,
        },
        // 未展开状态一行默认展示多少个
        defaultSize: {
            type: Number,
            default: 0,
        },
        // 一行展示多少个
        rowSize: {
            type: Number,
            default: 4,
        },
        // 是否需要重置按钮
        isCancel: {
            type: Boolean,
            default: true,
        },
        // 表单域标签的位置
        labelPosition: {
            type: String,
            default: 'left',
        },
        // 表单验证规则
        rules: {
            type: Object,
            default: () => ({}),
        },
        // 表单域标签的宽度
        labelWidth: {
            type: Number,
            default: 0,
        },
        // 收起/展开按钮文案
        expendText: {
            type: String,
            default: '',
        },
        // 是否展示全部表单
        expendAll: {
            type: Boolean,
            default: false,
        },
        // 是否隐藏搜索、重置按钮
        hideSearchButton: {
            type: Boolean,
            default: false,
        },
        /**
         * -----表格相关配置参数-----
         */
        // selection/index/expand/none => 首列为:多选框/索引列/展开的按钮列/不显示该列
        indexStyle: {
            type: String,
            default: 'index',
        },
        // 序号、勾选框列的宽度
        indexWidth: {
            type: [String, Number],
            default: '',
        },
        height: {
            type: [String, Number],
            default: '100%',
        },
        border: {
            type: Boolean,
            default: false,
        },
        stripe: {
            type: Boolean,
            default: false,
        },
        // 是否要高亮当前选中的行
        highlightCurrentRow: {
            type: Boolean,
            default: false,
        },
        // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className
        // Function({row, rowIndex})/String
        rowClassName: {
            type: [String, Function],
            default: '',
        },
        // 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className
        // Function({row, column, rowIndex, columnIndex})/String
        cellClassName: {
            type: [String, Function],
            default: '',
        },
        // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className
        // Function({row, rowIndex})/String
        headerRowClassName: {
            type: [String, Function],
            default: '',
        },
        // 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className
        // Function({row, column, rowIndex, columnIndex})/String
        headerCellClassName: {
            type: [String, Function],
            default: '',
        },
        // 空数据时显示的文本内容
        emptyText: {
            type: String,
            default: '',
        },
        // 是否在表尾显示合计行
        showSummary: {
            type: Boolean,
            default: false,
        },
        // 合计行第一列的文本
        sumText: {
            type: String,
            default: '',
        },
        // 自定义的合计计算方法
        // Function({ columns, data })
        summaryMethod: {
            type: Function,
            default: null,
        },
        // 合并行或列的计算方法
        // Function({ row, column, rowIndex, columnIndex })
        spanMethod: {
            type: Function,
            default: null,
        },
        // 展示树形数据时，树节点的缩进
        indent: {
            type: Number,
            default: 16,
        },
        // 是否懒加载子节点数据
        lazy: {
            type: Boolean,
            default: false,
        },
        // 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
        // Function(row, treeNode, resolve)
        load: {
            type: Function,
            default: null,
        },
        // 渲染嵌套数据的配置选项
        // { hasChildren: 'hasChildren', children: 'children' }
        treeProps: {
            type: Object,
            default: () => ({}),
        },
        // 对齐方式
        align: {
            type: String,
            default: 'left',
        },
        // 表头配置
        tableColumn: {
            type: Array,
            default: () => ([]),
        },
        // 表格数据
        tableData: {
            type: Array,
            default: () => ([]),
        },
        // 如果通过接口请求列表数据，autoSearch 可控制初始渲染表格时是否去请求数据
        autoSearch: {
            type: Boolean,
            default: true,
        },
        /**
         * 如果传入请求配置，则根据配置去请求后台数据
         * requestConfig: {
         *    url: '',
         *    method: 'get',
         *    params: {},
         *    // 请求完数据的回调，可以用来修改数据结构
         *    callback: (res) => res.data,
         * }
         */
        requestConfig: {
            type: Object,
            default: () => ({}),
        },
        // 行数据的 Key，用来优化 Table 的渲染
        rowKey: {
            type: String,
            default: 'id',
        },
        // 初始选中的行，indexStyle不为selection时无效
        selected: {
            type: [String, Array],
            default: '',
        },
        /**
         * -----分页组件相关配置参数-----
         */
        // 是否需要分页
        isPagination: {
            type: Boolean,
            default: true,
        },
        // 分页配置
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper',
        },
        // 每页显示条目个数
        pageSize: {
            type: Number,
            default: 10,
        },
        // 每页显示个数选择器的选项设置
        pageSizes: {
            type: Array,
            default: () => ([10, 20, 50, 100]),
        },
        pageParamKeys: {
            type: Object,
            default: () => ({
                orderByClause: 'orderByClause',
                orderBy: 'orderBy',
                pageIndex: 'pageIndex',
                pageSize: 'pageSize',
            }),
        },
    },
    data() {
        let selection = [];
        if (this.selected) {
            const valueType = Object.prototype.toString.call(this.selected);
            if (valueType === '[object Array]') selection = this.selected;
            if (valueType === '[object String]') selection = this.selected.split(',');
            selection = selection.map((item) => {
                if (Object.prototype.toString.call(item) === '[object Object]') return item;
                return { [this.rowKey]: item };
            });
        }

        return {
            hidePagination: false,
            searchForm: {},
            expend: false,
            pageIndex: 1,
            currentPageSize: this.pageSize,
            currentTotalSize: 0,
            totalTableData: this.tableData,
            currentTableData: this.isPagination ? this.tableData.slice(0, this.pageSize) : this.tableData,
            realSelections: selection,
            // 排序字段
            orderByClause: (this.requestConfig.params || {})[this.pageParamKeys.orderByClause || 'orderByClause'] || '',
            // 排序方式
            orderBy: (this.requestConfig.params || {})[this.pageParamKeys.orderBy || 'orderBy'] || '',
            isLoading: false,
            tableHeight: 'auto',
        };
    },
    watch: {
        expend() {
            this.$nextTick(() => {
                this.resetTableHeight();
                this.resetFormItemWidth();
            });
        },
        tableData: {
            deep: true,
            handler(oldVal, newVal) {
                if (this.requestConfig.url) return;
                this.setCommonTableData(oldVal.length === newVal.length);
            },
        },
        requestConfig: {
            deep: true,
            handler(value) {
                if (value.url) this.handlerSearch();
            },
        },
    },
    computed: {
        searchParams() {
            const {
                searchForm, currentPageSize, pageIndex, orderByClause, orderBy,
            } = this;
            const params = {
                [this.pageParamKeys.orderByClause || 'orderByClause']: orderByClause,
                [this.pageParamKeys.orderBy || 'orderBy']: orderBy,
                [this.pageParamKeys.pageIndex || 'pageIndex']: pageIndex,
                [this.pageParamKeys.pageSize || 'pageSize']: currentPageSize,
            };
            Object.keys(searchForm).forEach((key) => {
                if (key in searchForm) params[key] = searchForm[key];
            });
            return params;
        },
        buttonListStyle() {
            const percentNumber = this.searchInfo.length % this.rowSize;
            const percent = (100 / this.rowSize * (this.rowSize - percentNumber)).toFixed(2);
            if ((this.searchInfo.length < this.rowSize - 1) || this.expendAll || this.expend) {
                return `width:${percent}%;text-align: ${!percentNumber ? 'right' : 'left'};`;
            }
            // eslint-disable-next-line no-nested-ternary
            const baseNum = this.defaultSize > this.rowSize - 1 ? 1 : (this.defaultSize > 0 ? this.rowSize - this.defaultSize : 1);
            const defaultPercent = (100 / this.rowSize * baseNum);
            return `width:${defaultPercent.toFixed(2)}%;text-align: ${defaultPercent === 100 ? 'right' : 'left'};`;
        },
    },
    methods: {
        // 点击查询按钮
        handlerSearch() {
            if (this.hideSearchButton) return;
            let valiFlag = true;
            if (this.rules && Object.keys(this.rules).length) {
                this.$refs.form.validate((valid) => {
                    valiFlag = valid;
                });
            }
            if (valiFlag) {
                this.$emit('before-search', { ...(this.requestConfig.params || {}), ...this.searchParams });
                if (this.requestConfig.url) {
                    this.pageIndex = 1;
                    this.getTableData();
                    return;
                }
                const effectiveKeys = this.searchInfo.map((info) => info.code).filter((key) => this.searchParams[key] || this.searchParams[key] === 0);
                if (!effectiveKeys.length) {
                    this.hidePagination = false;
                    this.currentTableData = this.tableData.slice(0, this.pageSize);
                    return;
                }
                this.hidePagination = true;
                const data = this.tableData.filter((item) => effectiveKeys.every((key) => key in item && (String(item[key]).includes(this.searchParams[key])) || item[key] === this.searchParams[key]));
                this.currentTableData = data;
            }
        },
        // 初始化查询表单数据
        handlerResetForm() {
            const form = {};
            this.searchInfo.forEach((info) => {
                form[info.code] = info.value === 0 ? 0 : (info.value || '');
            });
            this.searchForm = form;
            this.$nextTick(() => {
                if (this.$refs.form) this.$refs.form.clearValidate();
            });
            this.$emit('reset');
        },
        // 获取表格数据
        getTableData(saveSelection) {
            this.$emit('search', { ...(this.requestConfig.params || {}), ...this.searchParams });
            const {
                url, method, params, callback, totalCallback, stringify,
            } = this.requestConfig;

            if (!url) {
                this.setCommonTableData(true);
                this.$nextTick(() => {
                    this.handlerInitSelection();
                });
                return;
            }
            if (!saveSelection) this.clearSelection();
            this.isLoading = true;
            const requestParams = stringify ? this.$qs.stringify({ ...params, ...this.searchParams }) : { ...params, ...this.searchParams };
            const requestUrl = method === 'post' ? url : `${url}?${this.$qs.stringify(requestParams)}`;
            this.$http[method || 'get'](requestUrl, requestParams).then((res) => {
                const data = res && res.data && res.data.data || {};

                let totalData = data.records || [];
                if (callback && typeof callback === 'function') {
                    totalData = callback(res) || data.records || [];
                }
                // 删除行重新获取表格数据时，如果页码>1且请求不到数据，则将页码切换为1，重新获取数据
                if (!totalData.length && this.pageIndex > 1) {
                    this.pageIndex = 1;
                    this.getTableData(saveSelection);
                    return;
                }
                this.totalTableData = totalData;

                let total = data.totalCount || data.total || totalData.length || 0;
                if (totalCallback && typeof totalCallback === 'function') {
                    total = totalCallback(res) || total;
                }
                this.currentTotalSize = total;

                const start = this.currentPageSize * (this.pageIndex - 1);
                const end = start + this.currentPageSize;
                if (this.totalTableData.length > this.currentPageSize && this.isPagination) {
                    this.currentTableData = this.totalTableData.slice(start, end);
                } else {
                    this.currentTableData = this.totalTableData;
                }

                this.$emit('finish-search', this.currentTableData, this.totalTableData);
                this.$nextTick(() => {
                    if (saveSelection) this.handlerInitSelection();
                    this.resetTableHeight();
                });
            }).catch(() => {
                this.currentTotalSize = 0;
                this.totalTableData = [];
                this.currentTableData = [];
            }).finally(() => {
                this.isLoading = false;
            });
        },
        // 排序
        handlerSortChange({ prop, order }) {
            const field = this.tableColumn.find(({ code }) => code === prop);
            if (field.sortable !== true || !this.requestConfig.url) return;
            this.orderByClause = prop;
            this.orderBy = ({ ascending: 'asc', descending: 'desc', ...(field.sortFields || {}) })[order] || '';
            this.getTableData();
        },
        // 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）
        handlerExpand(row, expandedRows) {
            this.$emit('expand-change', row, expandedRows);
        },
        setCommonTableData(savePage) {
            if (this.isPagination) {
                const start = savePage ? this.currentPageSize * (this.pageIndex - 1) : 0;
                const end = savePage ? start + this.currentPageSize : this.pageSize;
                this.currentTableData = this.tableData.slice(start, end);
            } else {
                this.currentTableData = this.tableData;
            }
            this.currentTotalSize = this.tableData.length;
            this.$nextTick(() => {
                this.resetTableHeight();
            });
        },
        // 初始化选中行
        handlerInitSelection() {
            if (this.indexStyle !== 'selection') return;
            const rows = this.currentTableData.filter((row) => this.realSelections.map((item) => item[this.rowKey]).includes(row[this.rowKey]));
            rows.forEach((row) => this.toggleRowSelection(row, true));
        },
        // 当某一行被点击时会触发该事件
        handlerRowClick(row, column, event) {
            this.$emit('row-click', row, column, event);
            if (this.indexStyle !== 'selection') {
                this.realSelections = [row];
                this.$emit('selection-change', this.realSelections);
            }
        },
        // 当某一行被双击时会触发该事件
        handlerRowdblclick(row, column, event) {
            this.$emit('row-dblclick', row, column, event);
            if (this.indexStyle !== 'selection') {
                this.realSelections = [row];
                this.$emit('selection-change', this.realSelections);
            }
        },
        // 当用户手动勾选数据行的 Checkbox 时触发的事件
        handlerSelect(selection, row) {
            if (selection.includes(row)) {
                this.realSelections.push(row);
            } else {
                const index = this.realSelections.findIndex((item) => item[this.rowKey] === row[this.rowKey]);
                if (index > -1) this.realSelections.splice(index, 1);
            }
            this.$emit('select', this.realSelections, row);
            this.$emit('selection-change', this.realSelections);
        },
        // 当用户手动勾选全选 Checkbox 时触发的事件
        handlerSelectAll(selection) {
            const otherSelections = this.realSelections.filter((row) => !this.currentTableData.map((item) => item[this.rowKey]).includes(row[this.rowKey]));
            if (selection.length) {
                this.realSelections = otherSelections.concat(selection);
            } else {
                this.realSelections = otherSelections;
            }
            this.$emit('select-all', this.realSelections);
            this.$emit('selection-change', this.realSelections);
        },
        // 用于多选表格，清空选中
        clearSelection() {
            this.realSelections = [];
            this.$refs.table.clearSelection();
            this.$emit('select-all', []);
            this.$emit('selection-change', []);
        },
        // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
        toggleRowSelection(row, selected) {
            this.$refs.table.toggleRowSelection(row, selected);
        },
        // 用于多选表格，切换所有行的选中状态
        toggleAllSelection() {
            this.$refs.table.toggleAllSelection();
        },
        // 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
        toggleRowExpansion(row, expanded) {
            this.$refs.table.toggleRowExpansion(row, expanded);
        },
        // 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态
        setCurrentRow(row) {
            if (this.indexStyle === 'selection') return;
            this.$refs.table.setCurrentRow(row);
            this.realSelections = row ? [row] : [];
            this.$emit('selection-change', this.realSelections);
        },
        // 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
        doLayout() {
            this.$refs.table.doLayout();
        },
        // 用于清空排序条件，数据会恢复成未排序的状态
        clearSort() {
            this.$refs.table.clearSort();
        },
        handlerSizeChange(size) {
            this.currentPageSize = size;
            this.pageIndex = 1;
            this.getTableData(true);
        },
        handlerPageChange(page) {
            this.pageIndex = page;
            this.getTableData(true);
        },
        // 重新给table的高度布局
        resetTableHeight() {
            if (!this.$el) {
                this.tableHeight = 'auto';
                return;
            }
            const getHeight = (className) => {
                const dom = this.$el.querySelector(className);
                if (!dom) return '';
                const selfHeight = dom.offsetHeight || 0;
                const marginTop = +window.getComputedStyle(dom).marginTop.replace(/px/ig, '');
                const marginBottom = +window.getComputedStyle(dom).marginBottom.replace(/px/ig, '');
                return `${selfHeight + marginTop + marginBottom}px`;
            };
            setTimeout(() => {
                this.tableHeight = `calc(100% - ${getHeight('.search-body')} - ${getHeight('.content-body')} - ${getHeight('.pagination-body')})`;
                const tableBody = this.$el.querySelector('.el-table__body-wrapper');
                if (!tableBody) return;
                tableBody.style.height = `calc(100% - ${getHeight('.el-table__header-wrapper')})`;
            }, 30);
        },
        // 动态调整表单宽度
        resetFormItemWidth() {
            if (this.labelPosition === 'top') return;
            setTimeout(() => {
                const formItems = this.$refs.formItems || [];
                formItems.forEach((formItem) => {
                    try {
                        const label = formItem.$el.querySelector('.el-form-item__label-wrap');
                        const dom = formItem.$el.querySelector('.el-form-item__content');
                        const labelWidth = +window.getComputedStyle(label).width.replace(/px/ig, '');
                        const labelMargin = +window.getComputedStyle(label).marginLeft.replace(/px/ig, '');
                        dom.style.width = `calc(100% - ${labelWidth + labelMargin}px)`;
                    } catch (error) {
                        // eslint-disable-next-line no-console
                        console.error(error);
                    }
                });
            }, 30);
        },
    },
    mounted() {
        this.handlerResetForm();
        if (this.autoSearch) this.getTableData(true);
        this.$nextTick(() => {
            this.resetFormItemWidth();
        });
        if (this.indexStyle === 'selection') this.$emit('selection-change', this.realSelections);
    },
};
</script>
