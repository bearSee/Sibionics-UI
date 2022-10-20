<template>
  <div class="patient-list">
    <el-breadcrumb class="info-detail-breadcrumb">
      <el-breadcrumb-item
        v-for="bread in breadcrumb"
        :key="bread">
        {{ bread }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <sib-common-page
      ref="pageComponent"
      :permission-prefix="permissionPrefix"
      :permissions="permissions"
      :main-table-config="mainTableConfig"
      :main-dialog-config="mainDialogConfig">
      <template #operate="{ row }">
        <el-button
          type="text"
          @click.native="handlerUpdateStatus(row)">
          更新状态
        </el-button>
      </template>
      <template #code="{ row }">
        <el-button
          type="text"
          @click.native="handlerSkipDetail(row)">
          {{ row.code }}
        </el-button>
      </template>
    </sib-common-page>
    <el-dialog
      class="center"
      width="500px"
      title="更新状态"
      append-to-body
      lock-scroll
      v-dialogDrag
      v-if="updateStatusVisible"
      :visible.sync="updateStatusVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <sib-form
        submit-text="确定"
        cancel-text="取消"
        :item-info="statusItemInfo"
        :form="statusForm"
        @submit="handlerSubmitStatus"
        @reset="updateStatusVisible = false" />
    </el-dialog>
  </div>
</template>

<script>

export default {
    name: 'PatientList',
    data() {
        return {
            permissionPrefix: 'patient_list',
            permissions: {
                patient_list_view: {
                    id: 63,
                    name: '查看患者列表',
                    permission: 'patient_list_view',
                    url: `${window.testProtocol}/siit-profile-service/patientBaseInfo/findPage`,
                    status: 1,
                    parentId: 62,
                    requestConfig: {},
                    isMenu: 2,
                    children: null,
                    sort: 1,
                    createTime: '2022-05-16 14:25:54',
                },
            },
            // 主列表查询配置
            mainTableConfig: {
                searchInfo: [
                    {
                        label: '患者编号',
                        code: 'code',
                        type: 'text',
                        maxlength: 50,
                    },
                    {
                        label: '患者姓名',
                        code: 'name',
                        type: 'text',
                        maxlength: 30,
                    },
                    {
                        label: '患者状态',
                        code: 'status',
                        type: 'select',
                        dataType: 'number',
                        options: [
                            {
                                key: 1,
                                value: '进行中',
                            },
                            {
                                key: 2,
                                value: '未开始',
                            },
                            {
                                key: 3,
                                value: '已结束',
                            },
                        ],
                    },
                    {
                        label: '所属机构',
                        code: 'orgId',
                        type: 'cascader',
                        options: [],
                        props: {
                            emitPath: false,
                            checkStrictly: true,
                            label: 'name',
                            value: 'id',
                        },
                        dataType: 'number',
                        requestConfig: {
                            url: `${window.testProtocol}/siit-user-service/organization/currentOrgTree`,
                            method: 'get',
                            params: {},
                            callback: (res) => (res.data || {}).data || [],
                        },
                    },
                ],
                // 列表的列配置项
                tableColumn: [
                    {
                        label: '患者编号',
                        code: 'code',
                        type: 'slot',
                    },
                    {
                        label: '姓名',
                        code: 'name',
                    },
                    {
                        label: '性别',
                        code: 'gender',
                        formatter: ({ gender }) => ({ 1: '男', 2: '女' })[gender],
                    },
                    {
                        label: '年龄',
                        code: 'age',
                    },
                    {
                        label: '患者状态',
                        code: 'status',
                        formatter: ({ status }) => ({ 1: '进行中', 2: '未开始', 3: '已结束' })[status],
                    },
                    {
                        label: '所属机构',
                        code: 'orgName',
                    },
                    {
                        label: '创建人',
                        code: 'createUser',
                    },
                    {
                        label: '创建时间',
                        code: 'createTime',
                        // sortable: true,
                        width: 150,
                    },
                    {
                        label: '操作',
                        code: 'operate',
                        type: 'slot',
                        width: 150,
                        showOverflowTooltip: false,
                    },
                ],
                buttonConfig: {
                    // 主列表头部的新增行按钮名称
                    add: {
                        name: '新增患者',
                    },
                },
                rowSize: 4,
            },
            // 主列表的新增、修改、复制弹窗表单配置
            mainDialogConfig: {
                getItemInfo: () => ([
                    {
                        label: '患者姓名',
                        code: 'name',
                        type: 'text',
                        maxlength: 30,
                        required: true,
                    },
                    {
                        label: '患者编号',
                        code: 'code',
                        type: 'text',
                        valueType: 'letter-number',
                        maxlength: 30,
                        required: true,
                    },
                    {
                        label: '性别',
                        code: 'gender',
                        type: 'select',
                        dataType: 'number',
                        required: true,
                        options: [
                            {
                                key: 1,
                                value: '男',
                            },
                            {
                                key: 2,
                                value: '女',
                            },
                        ],
                    },
                    {
                        label: '年龄',
                        code: 'age',
                        type: 'text',
                        dataType: 'number',
                        valueType: 'number',
                        maxlength: 6,
                        min: 0,
                        required: true,
                    },
                ]),
            },
            updateStatusVisible: false,
            statusItemInfo: [
                {
                    label: '患者状态',
                    code: 'status',
                    type: 'select',
                    dataType: 'number',
                    options: [
                        {
                            key: 1,
                            value: '进行中',
                        },
                        {
                            key: 2,
                            value: '未开始',
                        },
                        {
                            key: 3,
                            value: '已结束',
                        },
                    ],
                },
            ],
            statusForm: {},
            detailData: {},
        };
    },
    computed: {
        // 面包屑配置
        breadcrumb() {
            return [(this.permissions[`${this.permissionPrefix}`] || {}).name || '患者列表'];
        },
    },
    methods: {
        handlerUpdateStatus(row) {
            this.statusForm = JSON.parse(JSON.stringify(row || {}));
            this.updateStatusVisible = true;
        },
    },
};
</script>

<style lang="scss">
</style>
