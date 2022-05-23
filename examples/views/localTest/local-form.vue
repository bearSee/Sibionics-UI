<template>
  <div class="local-form">
    <div
      v-for="(itemInfo, i) of itemInfos"
      :key="i">
      <li>{{ itemInfo.title }}</li>
      <sib-form
        :row-size="3"
        :item-info="itemInfo.infos"
        :form="itemInfo.form"
        :rules="itemInfo.rules"
        @submit="handlerSubmit" />
    </div>
  </div>
</template>

<script>

export default {
    name: 'LocalForm',
    data() {
        return {
            itemInfos: [
                {
                    title: 'relationships 测试',
                    infos: [
                        {
                            label: '患者状态',
                            code: 'testeeStatus',
                            type: 'select',
                            dataType: 'number',
                            required: true,
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
                    ],
                    rules: {},
                    form: {
                        testeeStatus: 1,
                    },
                },
                {
                    title: 'relationResults 测试',
                    infos: [
                        {
                            label: '数值1',
                            code: 'number1',
                            type: 'text',
                            valueType: 'number',
                        },
                        {
                            label: '数值2',
                            code: 'number2',
                            type: 'number',
                        },
                        {
                            label: '数值3',
                            code: 'number3',
                            type: 'text',
                            valueType: 'number',
                        },
                        {
                            label: '数值4',
                            code: 'number4',
                            type: 'number',
                        },
                        {
                            label: '数值5',
                            code: 'number5',
                            type: 'number',
                        },
                        {
                            label: '结果',
                            code: 'result',
                            type: 'label',
                            relationResults: '({ number1, number2, number3, number4, number5 }) => (number1 * number2) + (number4 / number3) - number5',
                        },
                    ],
                    rules: {},
                    form: {
                        testeeStatus: 1,
                    },
                },
                {
                    title: 'inputrange 类型表单元素值变更导致form数据重置bug测试',
                    infos: [
                        {
                            label: '姓名',
                            code: 'name',
                            type: 'text',
                            maxlength: 30,
                            required: true,
                        },
                        {
                            label: '性别',
                            code: 'gender',
                            type: 'select',
                            dataType: 'number',
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
                            required: true,
                        },
                        {
                            label: '年龄',
                            code: 'age',
                            type: 'text',
                            dataType: 'number',
                            valueType: 'number',
                            maxlength: 3,
                            unit: '岁',
                            required: true,
                        },
                        {
                            label: '身高',
                            code: 'height',
                            type: 'text',
                            dataType: 'number',
                            valueType: 'number',
                            precision: 2,
                            maxlength: 6,
                            unit: 'cm',
                            required: true,
                        },
                        {
                            label: '体重',
                            code: 'weight',
                            type: 'text',
                            dataType: 'number',
                            valueType: 'number',
                            precision: 2,
                            maxlength: 6,
                            unit: 'kg',
                            required: true,
                        },
                        {
                            label: '腰围',
                            code: 'waistline',
                            type: 'text',
                            dataType: 'number',
                            valueType: 'number',
                            precision: 2,
                            maxlength: 6,
                            unit: 'cm',
                            required: true,
                        },
                        {
                            label: '臀围',
                            code: 'hipline',
                            type: 'text',
                            dataType: 'number',
                            valueType: 'number',
                            precision: 2,
                            maxlength: 6,
                            unit: 'cm',
                            required: true,
                        },
                        {
                            label: '血压',
                            code: 'pressure',
                            startCode: 'systolicPressure',
                            endCode: 'diastolicPressure',
                            type: 'inputrange',
                            valueType: 'number',
                            placeholder: '收缩压和舒张压不能为空',
                            startPlaceholder: '请输入收缩压',
                            endPlaceholder: '请输入舒张压',
                            maxlength: 3,
                            unit: 'mmHg',
                            required: true,
                        },
                        {
                            label: '体质指数',
                            placeholder: '-',
                            code: 'bodyMassIndex',
                            type: 'text',
                            readonly: true,
                            unit: 'kg/m²',
                            relationResults: ({ weight, height }) => Number(weight) / ((Number(height) / 100) ** 2),
                        },
                        {
                            label: '其他异常体征',
                            code: 'abnormalSigns',
                            type: 'select',
                            dataType: 'number',
                            options: [
                                {
                                    key: 1,
                                    value: '有',
                                },
                                {
                                    key: 2,
                                    value: '无',
                                },
                            ],
                            required: true,
                        },
                        {
                            label: '描述',
                            code: 'remarks',
                            type: 'textarea',
                            maxlength: 200,
                            // width: 'calc(66.66% - 10px)',
                        },
                    ],
                    form: {
                        id: 8,
                        hospitalCode: '3213',
                        caseCode: '123',
                        name: '123',
                        gender: 1,
                        age: 24,
                        collectionDate: '2022-05-10',
                        height: 123,
                        weight: 321,
                        waistline: 123,
                        hipline: 123,
                        systolicPressure: 123,
                        diastolicPressure: 223,
                        bodyMassIndex: 212.2,
                        abnormalSigns: 1,
                        remarks: '',
                        pressure: [123, 223],
                    },
                },
            ],
        };
    },
    methods: {
        handlerSubmit(form, cb) {
            console.log('form', form);
            cb();
        },
    },
};
</script>

<style lang="scss">

.local-form {
    & >div > li {
        margin-bottom: 20px;
        font-size: 20px;
    }
}
</style>
