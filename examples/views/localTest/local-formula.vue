<template>
  <div class="test-formula-configuration">
    <sib-formula
      :variables="variables"
      :del-variable="false"
      @complete="handlerComplete" />
    <sib-form
      v-if="isUpdated"
      :is-submit="false"
      :is-cancel="false"
      :row-size="2"
      :item-info="itemInfo" />
  </div>
</template>

<script>

export default {
    name: 'FormulaConfiguration',
    data() {
        return {
            isUpdated: true,
            variables: [
                {
                    name: '数值1',
                    key: 'number1',
                },
                {
                    name: '数值2',
                    key: 'number2',
                },
                {
                    name: '数值3',
                    key: 'number3',
                },
                {
                    name: '数值4',
                    key: 'number4',
                },
            ],
            itemInfo: [
                {
                    label: '数值1',
                    code: 'number1',
                    type: 'text',
                    valueType: 'number',
                },
                {
                    label: '数值2',
                    code: 'number2',
                    type: 'text',
                    valueType: 'number',
                },
                {
                    label: '数值3',
                    code: 'number3',
                    type: 'number',
                },
                {
                    label: '数值4',
                    code: 'number4',
                    type: 'number',
                },
                {
                    label: '结果',
                    code: 'result',
                    type: 'label',
                    relationResults: '',
                },
            ],
        };
    },
    methods: {
        handlerComplete({ functionString }) {
            this.isUpdated = false;
            const index = this.itemInfo.findIndex(({ code }) => code === 'result');
            this.$set(this.itemInfo[index], 'relationResults', functionString);
            this.$set(this.itemInfo[index], 'labelTips', `公式更新为：\n${functionString}`);
            this.$nextTick(() => {
                this.isUpdated = true;
                this.$notify({
                    title: '公式应用成功',
                    message: '请在下方修改输入框的值，【结果】将依据定义的公式进行动态变化',
                });
            });
        },
    },
};
</script>
<style lang="scss">
.test-formula-configuration {
    height: auto!important;
    display: flex;
    .sib-form {
        margin: 20px;
    }
}
</style>
