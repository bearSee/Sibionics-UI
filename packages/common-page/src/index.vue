<template>
  <div class="sib-common-page">
    <sib-table
      ref="sibTable"
      stripe
      v-if="operatePermissions.view || (mainTableConfig.tableData && mainTableConfig.tableData.length)"
      v-loading="isLoading"
      v-bind="mainTableConfig"
      :border="border"
      :index-style="mainTableConfig.indexStyle || ((operatePermissions.batchDelete || operatePermissions.batchDisable || operatePermissions.batchEnable) ? 'selection' : 'index')"
      :row-size="mainTableConfig.rowSize || 3"
      :request-config="mainTableRequestConfig">
      <template #search-operate>
        <slot name="search-operate" />
      </template>
      <template #content-body="{ selections, data }">
        <sib-throttle
          events="click"
          v-if="mainButtonConfig.add.show(data, selections) && operatePermissions.add"
          :time="1000">
          <el-button
            type="primary"
            icon="el-icon-plus"
            :size="mainButtonConfig.add.size"
            :disabled="mainButtonConfig.add.disabled(data, selections)"
            @click.native="handlerOperate('add', 'main', 'add')">
            {{ mainButtonConfig.add.name }}
          </el-button>
        </sib-throttle>
        <sib-throttle
          events="click"
          v-if="mainButtonConfig.export.show(data, selections) && operatePermissions.export"
          :time="1000">
          <el-button
            type="primary"
            :size="mainButtonConfig.export.size"
            :disabled="mainButtonConfig.export.disabled(data, selections)"
            @click.native="handlerExport('main')">
            {{ mainButtonConfig.export.name }}
          </el-button>
        </sib-throttle>
        <sib-item
          v-if="operatePermissions.import"
          :size="mainTableConfig.size"
          :props="importProps" />
        <sib-throttle
          events="click"
          v-if="mainButtonConfig.batchDelete.show(data, selections) && operatePermissions.batchDelete"
          :time="1000">
          <el-button
            type="primary"
            icon="el-icon-delete"
            :size="mainButtonConfig.batchDelete.size"
            :disabled="mainButtonConfig.batchDelete.disabled(data, selections)"
            @click.native="handlerBatchDeleteRows('main', selections)">
            {{ mainButtonConfig.batchDelete.name }}
          </el-button>
        </sib-throttle>
        <sib-throttle
          events="click"
          v-if="mainButtonConfig.batchEnable.show(data, selections) && operatePermissions.batchEnable"
          :time="1000">
          <el-button
            type="primary"
            :size="mainButtonConfig.batchEnable.size"
            :disabled="mainButtonConfig.batchEnable.disabled(data, selections)"
            @click.native="handlerBatchEnableRows('main', selections, 'Y')">
            {{ mainButtonConfig.batchEnable.name }}
          </el-button>
        </sib-throttle>
        <sib-throttle
          events="click"
          v-if="mainButtonConfig.batchDisable.show(data, selections) && operatePermissions.batchDisable"
          :time="1000">
          <el-button
            type="primary"
            :size="mainButtonConfig.batchDisable.size"
            :disabled="mainButtonConfig.batchDisable.disabled(data, selections)"
            @click.native="handlerBatchEnableRows('main', selections, 'N')">
            {{ mainButtonConfig.batchDisable.name }}
          </el-button>
        </sib-throttle>
        <slot
          name="content-body"
          :selections="selections" />
      </template>
      <template
        v-for="slot in mainTableConfig.tableColumn.filter(({ code, type }) => type === 'slot' && code !== 'operate')"
        #[slot.code]="{ row, column, config, index, realIndex }">
        <div
          class="slot-container"
          :key="slot.code">
          <template v-if="config.operateConfig">
            <el-button
              type="text"
              v-if="config.operateConfig.unPermission || operatePermissions.sub_view"
              :disabled="config.operateConfig.disabled && (typeof config.operateConfig.disabled === 'function' ? config.operateConfig.disabled(row, realIndex) : true)"
              @click.native="handlerOpenSubList(row, config)">
              <template v-if="config.formatter && typeof config.formatter === 'function'">
                {{ config.formatter(row, config, row[config.code]) }}
              </template>
              <template v-else>
                {{ row[config.code] }}
              </template>
            </el-button>
            <span v-else>
              <template v-if="config.formatter && typeof config.formatter === 'function'">
                {{ config.formatter(row, config, row[config.code]) }}
              </template>
              <template v-else>
                {{ row[config.code] }}
              </template>
            </span>
          </template>
          <slot
            v-else
            :name="slot.code"
            :row="row"
            :column="column"
            :config="config"
            :index="index"
            :realIndex="realIndex" />
        </div>
      </template>
      <template #operate="{ row, realIndex }">
        <slot
          name="operate"
          :row="row"
          :realIndex="realIndex" />
        <el-button
          type="text"
          v-if="subButtonConfig.add.show(row, realIndex) && operatePermissions.sub_add"
          :disabled="subButtonConfig.add.disabled(row, realIndex)"
          @click.native="handlerOperate('add', 'sub', 'sub_add', row)">
          {{ subButtonConfig.add.name }}
        </el-button>
        <el-button
          type="text"
          v-if="mainButtonConfig.sonAdd.show(row, realIndex) && operatePermissions.sonAdd"
          :disabled="mainButtonConfig.sonAdd.disabled(row, realIndex)"
          @click.native="handlerOperate('sonAdd', 'main', 'sonAdd', row)">
          {{ mainButtonConfig.sonAdd.name }}
        </el-button>
        <!-- 若已启用，按钮名应当为"禁用"，点击后变成禁用 -->
        <template v-if="String(row[(mainTableConfig.enableStatus || {}).code || 'status']) === String((mainTableConfig.enableStatus || {}).on || '1')">
          <el-button
            type="text"
            v-if="mainButtonConfig.disable.show(row, realIndex) && operatePermissions.disable"
            :disabled="mainButtonConfig.disable.disabled(row, realIndex)"
            @click.native="handlerEnableRow('main', row, 'N')">
            {{ mainButtonConfig.disable.name }}
          </el-button>
        </template>
        <!-- 若已禁用，按钮名应当为"启用"，点击后变成启用 -->
        <template v-else>
          <el-button
            type="text"
            v-if="mainButtonConfig.enable.show(row, realIndex) && operatePermissions.enable"
            :disabled="mainButtonConfig.enable.disabled(row, realIndex)"
            @click.native="handlerEnableRow('main', row, 'Y')">
            {{ mainButtonConfig.enable.name }}
          </el-button>
        </template>
        <el-button
          type="text"
          v-if="mainButtonConfig.edit.show(row, realIndex) && operatePermissions.edit"
          :disabled="mainButtonConfig.edit.disabled(row, realIndex)"
          @click.native="handlerOperate('edit', 'main', 'edit', row)">
          {{ mainButtonConfig.edit.name }}
        </el-button>
        <el-button
          type="text"
          v-if="mainButtonConfig.copy.show(row, realIndex) && operatePermissions.copy"
          :disabled="mainButtonConfig.copy.disabled(row, realIndex)"
          @click.native="handlerOperate('copy', 'main', 'copy', row)">
          {{ mainButtonConfig.copy.name }}
        </el-button>
        <el-button
          type="text"
          v-if="mainButtonConfig.delete.show(row, realIndex) && operatePermissions.delete"
          :disabled="mainButtonConfig.delete.disabled(row, realIndex)"
          @click.native="handlerDeleteRow('main', row)">
          {{ mainButtonConfig.delete.name }}
        </el-button>
        <span
          v-if="!(operatePermissions.sub_add
            || operatePermissions.sonAdd
            || operatePermissions.enable
            || operatePermissions.disable
            || operatePermissions.edit
            || operatePermissions.copy
            || operatePermissions.delete
            || ($scopedSlots || {}).operate)">-</span>
      </template>
      <template #expand="{ row, column, index, realIndex }">
        <slot
          name="expand"
          :row="row"
          :column="column"
          :index="index"
          :realIndex="realIndex"
        />
      </template>
    </sib-table>
    <el-empty
      v-else
      description="当前页面暂无权限" />
    <!-- 副列表弹窗 -->
    <el-dialog
      class="center"
      append-to-body
      lock-scroll
      v-dialogDrag
      v-if="subListVisible"
      :width="(subTableConfig.dialogConfig || {}).width || '1200px'"
      :title="
        (subTableConfig.dialogConfig || {}).title
          ? (typeof (subTableConfig.dialogConfig || {}).title === 'function'
            ? (subTableConfig.dialogConfig || {}).title(currentRow)
            : (subTableConfig.dialogConfig || {}).title)
          : ''"
      :visible.sync="subListVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <sib-table
        ref="dialogTable"
        border
        stripe
        v-bind="subTableConfig"
        :index-style="(operatePermissions.sub_batchDelete || operatePermissions.sub_batchDisable || operatePermissions.sub_batchEnable) ? 'selection' : 'index'"
        :row-size="subTableConfig.rowSize || 3"
        :request-config="subTableRequestConfig">
        <template #content-body="{ data, selections }">
          <sib-throttle
            events="click"
            v-if="subButtonConfig.export.show(data, selections) && operatePermissions.sub_export"
            :time="1000">
            <el-button
              type="primary"
              :size="subButtonConfig.export.size"
              :disabled="subButtonConfig.export.disabled(data, selections)"
              @click.native="handlerExport('sub')">
              {{ subButtonConfig.export.name }}
            </el-button>
          </sib-throttle>
          <sib-throttle
            events="click"
            v-if="subButtonConfig.batchDelete.show(data, selections) && operatePermissions.sub_batchDelete"
            :time="1000">
            <el-button
              type="primary"
              icon="el-icon-delete"
              :size="subButtonConfig.batchDelete.size"
              :disabled="subButtonConfig.batchDelete.disabled(data, selections)"
              @click.native="handlerBatchDeleteRows('sub', selections)">
              {{ subButtonConfig.batchDelete.name }}
            </el-button>
          </sib-throttle>
          <sib-throttle
            events="click"
            v-if="subButtonConfig.batchEnable.show(data, selections) && operatePermissions.sub_batchEnable"
            :time="1000">
            <el-button
              type="primary"
              :size="subButtonConfig.batchEnable.size"
              :disabled="subButtonConfig.batchEnable.disabled(data, selections)"
              @click.native="handlerBatchEnableRows('sub', selections, 'Y')">
              {{ subButtonConfig.batchEnable.name }}
            </el-button>
          </sib-throttle>
          <sib-throttle
            events="click"
            v-if="subButtonConfig.batchDisable.show(data, selections) && operatePermissions.sub_batchDisable"
            :time="1000">
            <el-button
              type="primary"
              :size="subButtonConfig.batchDisable.size"
              :disabled="subButtonConfig.batchDisable.disabled(data, selections)"
              @click.native="handlerBatchEnableRows('sub', selections, 'N')">
              {{ subButtonConfig.batchDisable.name }}
            </el-button>
          </sib-throttle>
          <slot
            name="sub-content-body"
            :selections="selections" />
        </template>
        <template
          v-for="slot in subTableConfig.tableColumn.filter(({ type }) => type === 'slot')"
          #[slot.code]="{ row, realIndex }">
          <div :key="slot.code">
            <slot
              :name="slot.code"
              :row="row"
              :realIndex="realIndex" />
          </div>
        </template>
        <template #operate="{ row, realIndex }">
          <slot
            name="sub-operate"
            :row="row"
            :realIndex="realIndex" />
          <template v-if="String(row[(subTableConfig.enableStatus || {}).code || 'status']) === ((subTableConfig.enableStatus || {}).on || '1')">
            <el-button
              type="text"
              v-if="subButtonConfig.disable.show(row, realIndex) && operatePermissions.sub_disable"
              :disabled="subButtonConfig.disable.disabled(row, realIndex)"
              @click.native="handlerEnableRow('sub', row, 'N')">
              {{ subButtonConfig.disable.name }}
            </el-button>
          </template>
          <template v-else>
            <el-button
              type="text"
              v-if="subButtonConfig.enable.show(row, realIndex) && operatePermissions.sub_enable"
              :disabled="subButtonConfig.enable.disabled(row, realIndex)"
              @click.native="handlerEnableRow('sub', row, 'Y')">
              {{ subButtonConfig.enable.name }}
            </el-button>
          </template>
          <el-button
            type="text"
            v-if="subButtonConfig.edit.show(row, realIndex) && operatePermissions.sub_edit"
            :disabled="subButtonConfig.edit.disabled(row, realIndex)"
            @click.native="handlerOperate('edit', 'sub', 'sub_edit', row)">
            {{ subButtonConfig.edit.name }}
          </el-button>
          <el-button
            type="text"
            v-if="subButtonConfig.copy.show(row, realIndex) && operatePermissions.sub_copy"
            :disabled="subButtonConfig.copy.disabled(row, realIndex)"
            @click.native="handlerOperate('copy', 'sub', 'sub_copy', row)">
            {{ subButtonConfig.copy.name }}
          </el-button>
          <el-button
            type="text"
            v-if="subButtonConfig.delete.show(row, realIndex) && operatePermissions.sub_delete"
            :disabled="subButtonConfig.delete.disabled(row, realIndex)"
            @click.native="handlerDeleteRow('sub', row)">
            {{ subButtonConfig.delete.name }}
          </el-button>
          <span
            v-if="!(operatePermissions.sub_enable
              || operatePermissions.sub_disable
              || operatePermissions.sub_edit
              || operatePermissions.sub_copy
              || operatePermissions.sub_delete
              || ($scopedSlots || {})['sub-operate'])">-</span>
        </template>
      </sib-table>
    </el-dialog>
    <!-- 新增、编辑、复制表单弹窗 -->
    <el-dialog
      class="center"
      append-to-body
      lock-scroll
      v-dialogDrag
      v-if="dialogConfig.visible"
      :width="dialogConfig.width || '500px'"
      :title="dialogConfig.title"
      :visible.sync="dialogConfig.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <sib-form
        ref="dialogForm"
        :submit-text="dialogConfig.submitText || '保存'"
        :cancel-text="dialogConfig.cancelText || '取消'"
        :label-width="dialogConfig.labelWidth || 0"
        :is-submit="dialogConfig.isSubmit !== false"
        :is-cancel="dialogConfig.isCancel !== false"
        :disabled="!!dialogConfig.disabled"
        :enterable="dialogConfig.enterable !== false"
        :row-size="dialogConfig.rowSize"
        :item-info="dialogConfig.itemInfo"
        :form="dialogConfig.form"
        :rules="dialogConfig.rules"
        @form-item-change="formItemChange"
        @submit="handlerSubmit"
        @reset="dialogConfig.visible = false">
        <template
          v-for="slot in dialogConfig.itemInfo.filter(({ type }) => type === 'slot')"
          #[slot.code]="{ form, info }">
          <div
            :key="slot.code"
            :class="slot.code">
            <slot
              :name="'form-' + slot.code"
              :form="form"
              :info="info" />
          </div>
        </template>
      </sib-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
    name: 'SibCommonPage',
    props: {
        // 页面权限字符前缀
        permissionPrefix: {
            type: String,
            default: 'unknow',
        },
        /**
         * 全局权限配置对象
         */
        permissions: {
            type: Object,
            default: () => ({
                // 查看列表
                view: {
                    url: '',
                    method: 'post',
                    params: {},
                    headers: {},
                },
                // 导出列表
                export: {},
                // 导入列表
                import: {},
                // 列表行新增
                add: {},
                // 列表行新增子级
                sonAdd: {},
                // 列表行编辑
                edit: {},
                // 列表行删除
                delete: {},
                // 列表行批量删除
                batchDelete: {},
                // 列表行复制
                copy: {},
                // 列表行启用
                enable: {},
                // 列表行禁用
                disable: {},
                // 列表行批量启用
                batchEnable: {},
                // 列表行批量禁用
                batchDisable: {},
                // 副列表查看
                sub_view: {},
                // 副列表导出列表
                sub_export: {},
                // 副列表行新增
                sub_add: {},
                // 副列表行编辑
                sub_edit: {},
                // 副列表行复制
                sub_copy: {},
                // 副列表行删除
                sub_delete: {},
                // 副列表行批量删除
                sub_batchDelete: {},
                // 副列表行启用
                sub_enable: {},
                // 副列表行禁用
                sub_disable: {},
                // 副列表行批量启用
                sub_batchEnable: {},
                // 副列表行批量禁用
                sub_batchDisable: {},
            }),
        },
        // 主列表查询配置
        mainTableConfig: {
            type: Object,
            default: () => ({
                // 查询框一行的展示表单元素的个数
                rowSize: 3,
                // 查询框表单配置
                searchInfo: [],
                // 列表的列配置项
                tableColumn: [
                    // {
                    //     label: '姓名',
                    //     code: 'name',
                    //     type: 'slot',
                    //     // operateConfig 是打开副列表弹窗的配置项；配置了此字段，则在点击每一行的“姓名”时，将打开副列表弹窗；
                    //     // 注意：该列设置为插槽类型（type='slot'）才生效
                    //     operateConfig: {
                    //         // 是否设置为非权限控制按钮（不考虑用户是否能操作的权限，固定展示该按钮则配置为true）
                    //         unPermission: false,
                    //         /**
                    //          * 是否禁用
                    //          * Boolean/Function(row, index)
                    //          * row: 当前行数据
                    //          * index: 当前行索引
                    //          */
                    //         disabled: (row, i) => i === 3,
                    //         /**
                    //          * 在主列表某一行点击打开查看副列表的弹窗后
                    //          * 请求副列表数据时，将该行的 "id" 赋值给 "rowId"
                    //          * params: { rowId: row.id } 将当做附加的请求参数去请求副列表的tableData
                    //          */
                    //         paramsKey: 'rowId',
                    //         paramsValueKey: 'id',
                    //         /**
                    //          * 点击指定的数据行内字段查看副列表的自定义方法 (row, config, requestConfig)，此场景适用于副列表不支持使用接口请求数据的情况或者需要重写接口请求配置时可使用
                    //          * 该方法可以 return 一个 requestConfig 的接口请求配置，那么副列表弹窗正常打开；如果没 return，则不会打开副列表弹窗
                    //          * row 点击时的行数据
                    //          * config 该列的原始配置
                    //          * requestConfig 请求接口配置的相关配置
                    //          */
                    //         customOperate: null,
                    //     },
                    // },
                ],
                // 请求接口的外部配置，一般用于设定默认参数和定义回调方法
                requestConfig: {
                    // params: {},
                    // callback: null,
                },
                // 按钮配置
                buttonConfig: {
                    // add: {
                    //     name: '新增行',
                    //     // Function/Boolean
                    //     // disabled(data, selections) data: 当前表格数据 selections: 当前选中的行数据
                    //     disabled: false,
                    // },
                    // sonAdd: {
                    //     name: '新增子级',
                    //     disabled: row => false,
                    // },
                    // edit: {
                    //     name: '编辑',
                    //     disabled: row => false,
                    // },
                    // copy: {
                    //     name: '复制',
                    //     disabled: row => false,
                    // },
                    // import: {
                    //     name: '列表导入',
                    //     disabled: false,
                    //     // 文件类型限制（默认excel表格的格式）
                    //     accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    //     // 导入参数
                    //     params: {},
                    //     // 是否展示导入文件列表
                    //     showFileList: false,
                    //     // 是否展示导入提示文案
                    //     showTips: false,
                    //     // 导入按钮名称，默认为 "列表导入"
                    //     btnText: '',
                    //     // 上传前的回调方法，不 return 或者 return false 则中止上传
                    //     beforeUpload: null,
                    //     // 导入成功回调，组件内部提供refreshTable方法来刷新主列表和副列表的数据（this.$refs.pageComponent.refreshTable()）
                    //     onSuccess: null,
                    // },
                    // export: {
                    //     name: '列表导出',
                    //     // Function/Boolean
                    //     // disabled(data, selections) data: 当前表格数据 selections: 当前选中的行数据
                    //     disabled: false,
                    // },
                    // delete: {
                    //     name: '删除',
                    //     disabled: row => false,
                    // },
                    // batchDelete: {
                    //     name: '批量删除',
                    //     // Function/Boolean
                    //     // disabled(data, selections) data: 当前表格数据 selections: 当前选中的行数据
                    //     disabled: false,
                    // },
                    // batchEnable: {
                    //     name: '批量启用',
                    //     // Function/Boolean
                    //     // disabled(data, selections) data: 当前表格数据 selections: 当前选中的行数据
                    //     disabled: false,
                    // },
                    // batchDisable: {
                    //     name: '批量禁用',
                    //     // Function/Boolean
                    //     // disabled(data, selections) data: 当前表格数据 selections: 当前选中的行数据
                    //     disabled: false,
                    // },
                    // enable: {
                    //     name: '启用',
                    //     disabled: row => false,
                    // },
                    // disable: {
                    //     name: '禁用',
                    //     disabled: row => false,
                    // },
                },
                // 启用禁用规则配置
                enableStatus: {
                    // 用于判断主列表的数据行是否已经被禁用的字段名
                    code: 'status',
                    // 数据行被启用时的值(row.status === '1'代表被启用)
                    on: '1',
                    // 数据行被禁用时的值(row.status === '2'代表被禁用)
                    off: '2',
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
            }),
        },
        // 主列表的新增、修改、复制弹窗表单配置
        mainDialogConfig: {
            type: Object,
            default: () => ({
                // 表单一行展示的表单元素的个数
                rowSize: 1,
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
                addItemInfo: [],
                // 编辑行数据时的表单配置
                editItemInfo: [],
                // 复制行数据时的表单配置
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
                 * 表单自动提交前的预处理方法；
                 * ①支持return新的form对象进行提交
                 * ②支持return false 中止提交
                 * ③return 的值不为以上两种情况，或不return，则使用原form对象提交
                 * beforeSubmit(obj)
                 * obj.form: 当前表单数据
                 * obj.type: 当前操作类型
                 * obj.currentRow: 当前行数据对象
                 */
                beforeSubmit: null,
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
                 * 表单提交的方法
                 * submitSuccess(form, type)
                 * obj.form: 当前表单数据
                 * obj.type: 当前操作类型
                 */
                submitSuccess: null,
            }),
        },
        // 副列表查询配置
        subTableConfig: {
            type: Object,
            default: () => ({
                // 查询框一行的展示表单元素的个数
                rowSize: 3,
                // 查询框表单配置
                searchInfo: [],
                // 列表的列配置项
                tableColumn: [],
                // 请求接口的外部配置，一般用于设定默认参数和定义回调方法
                requestConfig: {
                    // params: {},
                    // callback: null,
                },
                // 按钮配置 可配置属性与主列表按钮配置相同
                buttonConfig: {},
                // 启用禁用规则配置
                enableStatus: {
                    // 用于判断主列表的数据行是否已经被禁用的字段名
                    code: 'status',
                    // 数据行被启用时的值(row.status === '1'代表被启用)
                    on: '1',
                    // 数据行被禁用时的值(row.status === '2'代表被禁用)
                    off: '2',
                },
                // 副列表数据展示的弹窗配置
                dialogConfig: {
                    /**
                     * 弹窗标题
                     * String/Function(currentRow)
                     * currentRow => 当前行数据
                     */
                    title: '',
                    // title: (currentRow) => currentRow.name,
                    // 弹窗宽度，默认1200px
                    width: '',
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
            }),
        },
        // 副列表的新增、修改、复制弹窗表单配置
        subDialogConfig: {
            type: Object,
            default: () => ({
                // 表单一行展示的表单元素的个数
                rowSize: 1,
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
                addItemInfo: [],
                // 编辑行数据时的表单配置
                editItemInfo: [],
                // 复制行数据时的表单配置
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
                 * 表单自动提交前的预处理方法；
                 * ①支持return新的form对象进行提交
                 * ②支持return false 中止提交
                 * ③return 的值不为以上两种情况，或不return，则使用原form对象提交
                 * beforeSubmit(obj)
                 * obj.form: 当前表单数据
                 * obj.type: 当前操作类型
                 * obj.currentRow: 当前行数据对象
                 */
                beforeSubmit: null,
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
                 * 表单提交的方法
                 * submitSuccess(form, type)
                 * obj.form: 当前表单数据
                 * obj.type: 当前操作类型
                 */
                submitSuccess: null,
            }),
        },
        border: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            // 主列表加载中状态
            isLoading: false,
            // 主列表请求接口配置
            mainTableRequestConfig: {},
            // 副列表弹窗展示
            subListVisible: false,
            // 副列表请求接口配置
            subTableRequestConfig: {},
            // 列表新增、编辑、复制弹窗配置
            dialogConfig: {
                width: '',
                title: '',
                visible: false,
                itemInfo: {},
                form: {},
                rules: {},
            },
            // 存储当前行数据
            currentRow: {},
            // 列表导入配置
            importProps: {
                type: 'upload',
                accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                params: {},
                showFileList: false,
                showTips: false,
                btnText: ((this.mainTableConfig.buttonConfig || {}).import || {}).name || '列表导入',
                // disabled: ((this.mainTableConfig.buttonConfig || {}).import || {}).disabled,
                beforeUpload: (file) => {
                    const types = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
                    const bool = types.includes(file.type);
                    if (!bool) this.$message.warning('只支持导入excel表格文件');
                    return bool;
                },
                onSuccess: (res, file) => {
                    if (String(res.code) === '200') {
                        this.$message.success(res.message || '导入成功');
                        this.refreshTable();
                        return { name: file.name, data: res };
                    }
                    // 登录失效拦截 906: Token错误 907: Token过期 908: RefreshToken错误 909: RefreshToken过期
                    if (['401', '903', '906', '907', '908', '909', '999', '998', '901'].includes(String(res.code))) {
                        this.$message.error(res.message || 'token失效，请重新登录');
                        // 清除相关菜单权限
                        this.$store.commit('clearPermissions');
                        this.$router.push('/login');
                        const root = `${window.location.protocol}//${window.location.host}`;
                        window.location.replace(`${root}/#/login`);
                        return null;
                    }
                    this.$message.error(res.message || '导入失败');
                    return null;
                },
                ...((this.mainTableConfig.buttonConfig || {}).import || {}),
                name: ((this.mainTableConfig.buttonConfig || {}).import || {}).filename || 'file',
            },
        };
    },
    created() {
        this.mainTableRequestConfig = { ...this.getRequestConfig('view'), ...(this.mainTableConfig.requestConfig || {}) };
        const { url, params } = this.getRequestConfig('import');
        this.importProps = { ...this.importProps, action: `${this.$http.defaults.baseURL}${url[0] === '/' ? url.slice(1) : url}`, params };
    },
    computed: {
        // 按钮权限
        operatePermissions() {
            const op = (str) => this.permissions && (this.permissions[`${this.permissionPrefix}_${str}`] || this.permissions[str]);
            return {
                // 查看列表
                view: op('view'),
                // 导出列表
                export: op('export'),
                // 导入列表
                import: op('import'),
                // 列表行新增
                add: op('add'),
                // 列表行新增子级
                sonAdd: op('sonAdd'),
                // 列表行编辑
                edit: op('edit'),
                // 列表行删除
                delete: op('delete'),
                // 列表行批量删除
                batchDelete: op('batchDelete'),
                // 列表行复制
                copy: op('copy'),
                // 列表行启用
                enable: op('enable'),
                // 列表行禁用
                disable: op('disable'),
                // 列表行批量启用
                batchEnable: op('batchEnable'),
                // 列表行批量禁用
                batchDisable: op('batchDisable'),
                // 副列表查看
                sub_view: op('sub_view'),
                // 副列表导出列表
                sub_export: op('sub_export'),
                // 副列表行新增
                sub_add: op('sub_add'),
                // 副列表行编辑
                sub_edit: op('sub_edit'),
                // 副列表行复制
                sub_copy: op('sub_copy'),
                // 副列表行删除
                sub_delete: op('sub_delete'),
                // 副列表行批量删除
                sub_batchDelete: op('sub_batchDelete'),
                // 副列表行启用
                sub_enable: op('sub_enable'),
                // 副列表行禁用
                sub_disable: op('sub_disable'),
                // 副列表行批量启用
                sub_batchEnable: op('sub_batchEnable'),
                // 副列表行批量禁用
                sub_batchDisable: op('sub_batchDisable'),
            };
        },
        // 主列表按钮配置
        mainButtonConfig() {
            return this.getButtonConfig('main');
        },
        // 副列表按钮配置
        subButtonConfig() {
            return this.getButtonConfig('sub');
        },
    },
    methods: {
        getButtonConfig(type) {
            const tableConfig = ({ main: this.mainTableConfig, sub: this.subTableConfig })[type];
            const { buttonConfig = {} } = tableConfig;
            const defaultButtonNames = {
                add: '新增行',
                sonAdd: '新增子级',
                edit: '编辑',
                copy: '复制',
                export: '列表导出',
                delete: '删除',
                batchDelete: '批量删除',
                batchEnable: '批量启用',
                batchDisable: '批量禁用',
                enable: '启用',
                disable: '禁用',
            };
            const config = (tp) => ({
                name: (buttonConfig[tp] || {}).name || defaultButtonNames[tp],
                size: (buttonConfig[tp] || {}).size || tableConfig.size || 'small',
                disabled: (row, index) => (buttonConfig[tp] || {}).disabled && (typeof (buttonConfig[tp] || {}).disabled === 'function' ? (buttonConfig[tp] || {}).disabled(row, index) : true),
                // eslint-disable-next-line no-nested-ternary
                show: (row, index) => (('show' in (buttonConfig[tp] || {}))
                    ? ((typeof (buttonConfig[tp] || {}).show) === 'function' ? (buttonConfig[tp] || {}).show(row, index) : (buttonConfig[tp] || {}).show)
                    : true),
            });
            return {
                add: config('add'),
                sonAdd: config('sonAdd'),
                edit: config('edit'),
                copy: config('copy'),
                export: config('export'),
                delete: config('delete'),
                batchDelete: config('batchDelete'),
                batchEnable: config('batchEnable'),
                batchDisable: config('batchDisable'),
                enable: config('enable'),
                disable: config('disable'),
            };
        },
        // 打开副列表弹窗展示
        handlerOpenSubList(row, config) {
            this.currentRow = row;
            const detailRequestConfig = this.getRequestConfig('sub_view');
            const {
                paramsKey = 'id',
                paramsValueKey = 'id',
                customOperate,
            } = config.operateConfig || {};
            const subTableRequestConfig = {
                ...detailRequestConfig,
                params: {
                    ...detailRequestConfig.params,
                    [paramsKey]: row[paramsValueKey],
                },
                ...(this.subTableConfig.requestConfig || {}),
            };
            if (customOperate && typeof customOperate === 'function') {
                const customConfig = customOperate(row, config, subTableRequestConfig);
                if (customConfig) {
                    this.subTableRequestConfig = customConfig;
                    this.subListVisible = true;
                }
                return;
            }
            this.subTableRequestConfig = subTableRequestConfig;
            this.subListVisible = true;
        },
        // 单行删除
        handlerDeleteRow(source, row) {
            const { handlerDeleteRow, beforeDelete } = ({ sub: this.subTableConfig, main: this.mainTableConfig })[source];
            if (beforeDelete && typeof beforeDelete === 'function' && !beforeDelete([row])) return;
            const deletePermission = ({ sub: 'sub_delete', main: 'delete' })[source];
            const batchDeletePermission = ({ sub: 'sub_batchDelete', main: 'batchDelete' })[source];
            const requestConfig = this.getRequestConfig(deletePermission);
            const batchRequestConfig = this.getRequestConfig(batchDeletePermission);

            if (!requestConfig.url && !batchRequestConfig.url) {
                this.$message.warning('请确保删除操作接口配置正确');
                return;
            }

            // 外部传入的删除方法优先执行，参数：第一个参数为当前行数据，第二个为接口地址等配置，第三个参数为刷新列表的回调函数
            if (handlerDeleteRow && typeof handlerDeleteRow === 'function') {
                handlerDeleteRow(row, requestConfig.url ? requestConfig : batchRequestConfig, () => {
                    this.refreshTable();
                });
                return;
            }
            // 单行删除接口未配置时，自动调用批量删除接口
            if (!requestConfig.url) {
                this.handlerBatchDeleteRows(source, [row]);
                return;
            }
            this.deleteRow({ id: row.id }, deletePermission);
        },
        // 批量删除
        handlerBatchDeleteRows(source, rows) {
            if (!rows.length) {
                this.$message.warning('请至少勾选一条数据');
                return;
            }
            const { handlerBatchDeleteRows, beforeDelete } = ({ sub: this.subTableConfig, main: this.mainTableConfig })[source];
            if (beforeDelete && typeof beforeDelete === 'function' && !beforeDelete(rows)) return;
            const batchDeletePermission = ({ sub: 'sub_batchDelete', main: 'batchDelete' })[source];

            // 外部传入的删除方法优先执行，参数：第一个参数为选中的行数据，第二个为接口地址等配置，第三个参数为刷新列表的回调函数
            if (handlerBatchDeleteRows && typeof handlerBatchDeleteRows === 'function') {
                const batchRequestConfig = this.getRequestConfig(batchDeletePermission);
                handlerBatchDeleteRows(rows, batchRequestConfig, () => {
                    this.refreshTable();
                });
                return;
            }
            this.deleteRow({ ids: rows.map(({ id }) => id) }, batchDeletePermission);
        },
        // 行删除逻辑
        deleteRow(params, permission = 'delete') {
            this.$confirm('确定删除吗？', '温馨提示', {
                type: 'warning',
                confirmButtonText: '确定删除',
            }).then(() => {
                this.handlerRequest(permission, params).then(() => {
                    this.$message.success('删除成功');
                    this.refreshTable();
                });
            });
        },
        // 单行启用禁用
        handlerEnableRow(source, row, enable) {
            const { handlerEnableRow } = ({ sub: this.subTableConfig, main: this.mainTableConfig })[source];
            const enabelPermission = ({ sub: { Y: 'sub_enable', N: 'sub_disable' }, main: { Y: 'enable', N: 'disable' } })[source][enable];
            const batchEnabelPermission = ({ sub: { Y: 'sub_batchEnable', N: 'sub_batchDisable' }, main: { Y: 'batchEnable', N: 'batchDisable' } })[source][enable];

            const requestConfig = this.getRequestConfig(enabelPermission);
            const batchRequestConfig = this.getRequestConfig(batchEnabelPermission);

            if (!requestConfig.url && !batchRequestConfig.url) {
                this.$message.warning('请确保启用禁用操作接口配置正确');
                return;
            }

            // 外部传入的方法优先执行，参数：第一个参数为当前行数据，第二个为接口地址等配置，第三个参数为刷新列表的回调函数
            if (handlerEnableRow && typeof handlerEnableRow === 'function') {
                handlerEnableRow(row, requestConfig.url ? requestConfig : batchRequestConfig, () => {
                    this.refreshTable();
                });
                return;
            }
            // 单行启用禁用接口未配置时，自动调用批量启用禁用接口
            if (!requestConfig.url) {
                this.handlerBatchEnableRows(source, [row], enable);
                return;
            }
            this.enableRow({ id: row.id }, enabelPermission);
        },
        // 批量启用/禁用
        handlerBatchEnableRows(source, rows, enable) {
            if (!rows.length) {
                this.$message.warning('请至少勾选一条数据');
                return;
            }
            const enabelPermission = ({ sub: { Y: 'sub_batchEnable', N: 'sub_batchDisable' }, main: { Y: 'batchEnable', N: 'batchDisable' } })[source][enable];
            const { handlerBatchEnableRows } = ({ sub: this.subTableConfig, main: this.mainTableConfig })[source];

            // 外部传入的方法优先执行，参数：第一个参数为选中的行数据，第二个为接口地址等配置，第三个参数为刷新列表的回调函数
            if (handlerBatchEnableRows && typeof handlerBatchEnableRows === 'function') {
                const batchRequestConfig = this.getRequestConfig(enabelPermission);
                handlerBatchEnableRows(rows, batchRequestConfig, () => {
                    this.refreshTable();
                });
                return;
            }
            this.enableRow({ ids: rows.map(({ id }) => id) }, enabelPermission);
        },
        // 行启用禁用逻辑
        enableRow(params, permission = 'enable') {
            this.isLoading = true;
            this.handlerRequest(permission, params).then(() => {
                this.$message.success('操作成功');
                this.refreshTable();
            }).finally(() => {
                this.isLoading = false;
            });
        },
        /**
         * 打开新增/编辑/复制弹窗
         *
         * type 操作类型（add/edit/copy）
         * source 触发来源（main 主列表 sub 副列表）
         * row 触发操作时所在的行数据（add时，行数据为空）
         *
         */
        handlerOperate(type = 'add', source = 'main', permission, row) {
            const currentRow = JSON.parse(JSON.stringify(row || {}));
            this.currentRow = currentRow;
            const {
                width,
                submitText,
                cancelText,
                rowSize,
                addItemInfo = [],
                editItemInfo = [],
                copyItemInfo = [],
                getItemInfo,
                form = {},
                rules = {},
                getSpecialConfig,
            } = ({ sub: this.subDialogConfig, main: this.mainDialogConfig })[source];
            const mainTableData = (this.$refs.sibTable || {}).totalTableData || [];
            const subTableData = (this.$refs.dialogTable || {}).totalTableData || [];
            const dialogItemInfo = getItemInfo && getItemInfo(type, {
                currentRow,
                mainTableData,
                subTableData,
            });
            const config = ({
                add: {
                    title: '新增',
                    itemInfo: dialogItemInfo || (addItemInfo.length && addItemInfo) || [],
                    form,
                },
                edit: {
                    title: '编辑',
                    itemInfo: dialogItemInfo || (editItemInfo.length && editItemInfo) || (addItemInfo.length && addItemInfo) || [],
                    form: { ...form, ...currentRow },
                },
                copy: {
                    title: '复制',
                    itemInfo: dialogItemInfo || (copyItemInfo.length && copyItemInfo) || (addItemInfo.length && addItemInfo) || [],
                    form: { ...form, ...currentRow, id: '' },
                },
                sonAdd: {
                    title: ((this.mainTableConfig.buttonConfig || {}).sonAdd || {}).name || '新增子级',
                    itemInfo: dialogItemInfo || (addItemInfo.length && addItemInfo) || [],
                    form: { ...form, parentId: currentRow.id },
                },
            })[type];

            const dialogConfig = {
                ...this.dialogConfig,
                width,
                submitText,
                cancelText,
                rowSize,
                type,
                source,
                permission,
                visible: true,
                rules,
                ...config,
            };
            const specialConfig = getSpecialConfig && getSpecialConfig(type, {
                dialogConfig,
                currentRow,
                mainTableData,
                subTableData,
            });
            if (specialConfig) {
                this.dialogConfig = { ...dialogConfig, ...specialConfig };
                return;
            }
            this.dialogConfig = dialogConfig;
        },
        // 新增、编辑、复制提交
        handlerSubmit(form, cb) {
            const { type, source, permission } = this.dialogConfig;
            const { beforeSubmit, handlerSubmit, submitSuccess } = ({ sub: this.subDialogConfig, main: this.mainDialogConfig })[source];

            // 外部传入的方法优先执行，参数：第一个参数为包含表单数据、操作类型、请求接口配置以及当前行数据的对象，第二个为刷新列表、关闭弹窗的回调函数
            if (handlerSubmit && typeof handlerSubmit === 'function') {
                const requestConfig = this.getRequestConfig(permission);
                handlerSubmit({
                    form,
                    type,
                    requestConfig,
                    currentRow: this.currentRow,
                }, () => {
                    this.dialogConfig.visible = false;
                    this.refreshTable();
                    cb();
                });
                return;
            }
            // 外部传入的对form进行预处理的方法,参数为包含表单数据、操作类型以及当前行数据的对象
            if (beforeSubmit && typeof beforeSubmit === 'function') {
                const data = beforeSubmit({ form, type, currentRow: this.currentRow });
                if (data === false) {
                    cb();
                    return;
                }
                if (Object.prototype.toString.call(data) === '[object Object]') form = data;
            }

            this.handlerRequest(permission, form).then(() => {
                this.$message.success('保存成功');
                this.dialogConfig.visible = false;
                this.refreshTable();
                if (submitSuccess && typeof submitSuccess === 'function') submitSuccess(form);
            }).catch((err) => {
                const code = err && err.data && err.data.code;
                if (['998', '901'].includes(String(code))) this.handlerSubmit(form, cb);
            }).finally(cb);
        },
        // 导出列表
        handlerExport(source) {
            const { permission, refNam } = ({ main: { permission: 'export', refNam: 'sibTable' }, sub: { permission: 'sub_export', refNam: 'dialogTable' } })[source];
            const { searchParams = {} } = this.$refs[refNam] || {};
            this.handlerRequest(permission, searchParams, {
                responseType: 'blob',
                timeout: 500 * 1000,
            }).then((res) => {
                window.SIB.download(res);
                this.$message.success('导出成功');
            });
        },
        // 新增、编辑、复制弹窗内的表单值被用户手动修改后触发的事件
        formItemChange(value, info) {
            this.$emit('dialog-form-change', {
                // 触发值变更的表单元素配置
                info,
                // 变更后的值
                value,
                // 当前弹窗配置（支持修改，一般用于表单项某个值变更后，重新修改itemInfo的情况）
                dialogConfig: this.dialogConfig,
                // 重新布局表单的方法
                resetFormItemWidth: (this.$refs.dialogForm || {}).resetFormItemWidth,
            });
        },
        // 动态获取接口的相关配置 外部可通过refs调用
        getRequestConfig(permission) {
            const {
                url = '', method, params, headers, callback, requestConfig,
            } = this.operatePermissions[permission] || this.operatePermissions[`${this.permissionPrefix}_${permission}`] || {};
            let config = {};
            if (requestConfig) {
                if (typeof requestConfig === 'string') {
                    try {
                        config = JSON.parseAll(requestConfig);
                    } catch (error) {
                        console.error('请求配置解析有误：', error);
                    }
                } else if (Object.prototype.toString.call(requestConfig) === '[object Object]') {
                    config = requestConfig;
                }
            }
            return {
                url,
                method: method || config.method || 'post',
                params: { ...(params || {}), ...(config.params || {}) },
                headers: { ...(headers || {}), ...(config.headers || {}) },
                callback: callback || config.callback || null,
            };
        },
        // 动态请求接口提交
        handlerRequest(permission, param = {}, header = {}) {
            return new Promise((resolve, reject) => {
                const {
                    url, method, params, headers,
                } = this.getRequestConfig(permission);
                const requestParams = { ...params, ...param };
                const requestUrl = method === 'post' ? url : `${url}?${this.$qs.stringify(requestParams)}`;
                this.$http[method](requestUrl, requestParams, { ...headers, ...header }).then(resolve).catch(reject);
            });
        },
        refreshTable() {
            if (this.$refs.sibTable) this.$refs.sibTable.getTableData();
            if (this.$refs.dialogTable) this.$refs.dialogTable.getTableData();
        },
    },
};
</script>
