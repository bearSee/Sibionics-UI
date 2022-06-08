<template>
  <div class="local-table">
    <sib-table
      ref="sibTable"
      row-key="id"
      border
      stripe
      v-loading="isLoading"
      :auto-search="false"
      :row-size="3"
      :search-info="searchInfo"
      :table-column="tableColumn"
      :request-config="requestConfig">
      <template>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click.native="handlerAdd">
          新增用户
        </el-button>
      </template>
    </sib-table>
    <!-- 新增、修改弹窗 -->
    <el-dialog
      class="center"
      width="450px"
      append-to-body
      lock-scroll
      v-dialogDrag
      v-if="dialogConfig.visible"
      :title="dialogConfig.title"
      :visible.sync="dialogConfig.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <sib-form
        submit-text="保存"
        cancel-text="取消"
        :item-info="dialogConfig.itemInfo"
        :form="dialogConfig.form"
        :rules="dialogConfig.rules"
        @submit="handlerSubmit"
        @reset="dialogConfig.visible = false"
      />
    </el-dialog>
  </div>
</template>

<script>

export default {
    name: 'LocalTable',
    data() {
        return {
            isLoading: false,
            searchInfo: [
                {
                    label: '患者状态',
                    code: 'testeeStatus',
                    type: 'select',
                    dataType: 'number',
                    required: true,
                    trim: 'common',
                    options: [
                        {
                            key: 1,
                            value: '筛选中',
                        },
                        {
                            key: 2,
                            value: '筛选失败',
                        },
                        {
                            key: 3,
                            value: '已入组',
                        },
                        {
                            key: 4,
                            value: '已终止',
                        },
                        {
                            key: 5,
                            value: '已完成',
                        },
                    ],
                    relationships: {
                        projectEnvId: 'projectEnvId',
                        testCenterId: 'testCenterId',
                    },
                    value: 1,
                },
                {
                    label: '所属试验项目',
                    code: 'projectEnvId',
                    type: 'select',
                    dataType: 'number',
                    options: [],
                    optionProps: {
                        key: 'id',
                        value: 'name',
                    },
                    required: true,
                    filterable: true,
                    requestConfig: {
                        url: `${window.testProtocol}/edc-profile-service/project/currentUserEnvList`,
                        method: 'post',
                        params: {},
                        callback: (res) => (res && res.data && res.data.data || []),
                    },
                },
                {
                    label: '所属中心',
                    code: 'testCenterId',
                    type: 'select',
                    filterable: true,
                    dataType: 'number',
                    options: [],
                    optionProps: {
                        key: 'id',
                        value: 'name',
                    },
                    requestConfig: {
                        url: `${window.testProtocol}/edc-profile-service/test-center/list`,
                        method: 'post',
                        params: {},
                        callback: (res) => (res.data || {}).data || [],
                    },
                    required: true,
                },
                {
                    label: '所属角色',
                    code: 'role',
                    type: 'select',
                    filterable: true,
                    dataType: 'number',
                    options: [],
                    optionProps: {
                        key: 'id',
                        value: 'name',
                    },
                    requestConfig: {
                        url: `${window.testProtocol}/edc-user-service/role/findPage`,
                        method: 'post',
                        params: {
                            pageIndex: 1,
                            pageSize: 10,
                        },
                        callback: (res) => ((res.data || {}).data || {}).records || [],
                    },
                    required: true,
                },
                {
                    label: '所属用户',
                    code: 'users',
                    type: 'select',
                    filterable: true,
                    dataType: 'number',
                    options: [],
                    optionProps: {
                        key: 'id',
                        value: 'nickname',
                    },
                    requestConfig: {
                        url: `${window.testProtocol}/edc-user-service/user/findPage`,
                        method: 'post',
                        params: {
                            pageIndex: 1,
                            pageSize: 10,
                        },
                        callback: (res) => ((res.data || {}).data || {}).records || [],
                    },
                    required: true,
                },
                {
                    label: '用户账号/姓名',
                    code: 'keyword',
                    type: 'text',
                },
            ],
            tableColumn: [
                {
                    label: '用户账号',
                    code: 'username',
                    minWidth: 150,
                },
                {
                    label: '用户姓名',
                    code: 'nickname',
                    minWidth: 150,
                },
                {
                    label: '用户状态',
                    code: 'status',
                    formatter: ({ status }) => ({ 1: '启用', 2: '禁用' })[status],
                },
                {
                    label: '创建人',
                    code: 'createUser',
                    minWidth: 100,
                },
                {
                    label: '创建时间',
                    code: 'createTime',
                    sortable: true,
                    minWidth: 150,
                },
            ],
            requestConfig: {
                url: `${window.testProtocol}/edc-user-service/user/findPage`,
                method: 'post',
                params: {},
            },
            dialogConfig: {
                title: '',
                type: 'add',
                visible: false,
                itemInfo: [],
                addItemInfo: [
                    {
                        label: '用户账号',
                        code: 'username',
                        type: 'text',
                        required: true,
                        maxlength: 20,
                    },
                    {
                        label: '用户姓名',
                        code: 'nickname',
                        type: 'text',
                        required: true,
                        maxlength: 20,
                    },
                    {
                        label: '手机号码',
                        code: 'telephone',
                        type: 'text',
                        valueType: 'number',
                        required: true,
                        maxlength: 11,
                    },
                    {
                        label: '所属机构',
                        code: 'orgId',
                        type: 'select',
                        dataType: 'number',
                        options: [],
                        optionProps: {
                            key: 'id',
                            value: 'name',
                        },
                        requestConfig: {
                            url: `${window.testProtocol}/edc-user-service/organization/list`,
                            method: 'get',
                            params: {},
                            callback: (res) => (res.data || {}).data || [],
                        },
                        relationships: {
                            roleId: 'orgId',
                        },
                        required: true,
                    },
                    {
                        label: '所属角色',
                        code: 'roleId',
                        type: 'select',
                        dataType: 'number',
                        options: [],
                        optionProps: {
                            key: 'id',
                            value: 'name',
                        },
                        requestConfig: {
                            url: `${window.testProtocol}/edc-user-service/role/availableRoles`,
                            method: 'get',
                            params: {},
                            callback: (res) => (res.data || {}).data || [],
                        },
                        required: true,
                    },
                    {
                        label: '备注说明',
                        code: 'remarks',
                        type: 'textarea',
                        maxlength: 200,
                    },
                    {
                        label: '密码',
                        code: 'password',
                        type: 'password',
                        showPassword: true,
                        required: true,
                        maxlength: 8,
                    },
                    {
                        label: '确认密码',
                        code: 'confirmPassword',
                        type: 'password',
                        showPassword: true,
                        required: true,
                        maxlength: 8,
                    },
                    {
                        label: '状态',
                        code: 'status',
                        type: 'radio',
                        required: true,
                        options: [
                            {
                                key: 1,
                                value: '启用',
                            },
                            {
                                key: 2,
                                value: '禁用',
                            },
                        ],
                        value: 1,
                    },
                ],
                editItemInfo: [],
                rules: {},
                form: {},
            },
            currentRow: {},
        };
    },
    methods: {
        // 打开新增弹窗
        handlerAdd() {
            this.dialogConfig = {
                ...this.dialogConfig,
                title: '新增',
                type: 'add',
                itemInfo: this.dialogConfig.addItemInfo,
                form: {},
                rules: { ...this.dialogConfig.commonRules, ...this.dialogConfig.passwordRules },
                visible: true,
            };
        },
        // 打开编辑弹窗
        handlerEdit(row) {
            const { addItemInfo, editItemInfo } = this.dialogConfig;
            this.dialogConfig = {
                ...this.dialogConfig,
                title: '编辑',
                type: 'update',
                itemInfo: editItemInfo && editItemInfo.length ? editItemInfo : (addItemInfo || []),
                form: JSON.parse(JSON.stringify(row)),
                rules: this.dialogConfig.commonRules,
                visible: true,
            };
        },
    },
};
</script>

<style lang="scss">

.local-table {
}
</style>
