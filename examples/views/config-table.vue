<template>
  <div class="config-table">
    <h3>{{ $t(title || defaultTitle) }}</h3>
    <div>
      <sib-table
        border
        stripe
        :is-pagination="false"
        :table-column="tableColumn[step]"
        :table-data="tableData"
      />
    </div>
  </div>
</template>

<script>
export default {
    name: 'ConfigTable',
    props: {
        title: {
            type: String,
            default: '',
        },
        step: {
            type: String,
            default: 'attributes',
        },
        tableData: {
            type: Array,
            default: () => ([]),
        },
    },
    data() {
        return {
            tableColumn: {
                attributes: [
                    {
                        label: '参数',
                        code: 'params',
                    },
                    {
                        label: '说明',
                        code: 'des',
                    },
                    {
                        label: '类型',
                        code: 'type',
                    },
                    {
                        label: '可选值',
                        code: 'values',
                    },
                    {
                        label: '默认值',
                        code: 'defaultVal',
                    },
                ],
                events: [
                    {
                        label: '事件名称',
                        code: 'name',
                        width: 180,
                    },
                    {
                        label: '说明',
                        code: 'des',
                    },
                    {
                        label: '回调参数',
                        code: 'params',
                    },
                ],
                slots: [
                    {
                        label: 'name',
                        code: 'name',
                        width: 180,
                    },
                    {
                        label: '说明',
                        code: 'des',
                    },
                    {
                        label: '参数',
                        code: 'params',
                    },
                ],
                refs: [
                    {
                        label: 'name',
                        code: 'name',
                        width: 230,
                    },
                    {
                        label: '类型',
                        code: 'type',
                        formatter: (row) => ({ 1: '属性', 2: '方法' })[row.type],
                        width: 60,
                    },
                    {
                        label: '说明',
                        code: 'des',
                    },
                ],
            },
        };
    },
    computed: {
        defaultTitle() {
            return ({
                attributes: '二、Attributes',
                events: '三、Events',
                slots: '四、Slots',
                refs: '五、Refs提供的外部属性和方法（仅提供使用，禁止赋值）',
            })[this.step];
        },
    },
};
</script>

<style lang="scss">
.config-table {
}
</style>
