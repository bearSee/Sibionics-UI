<template>
  <div class="sib-calculator" />
</template>

<script>
import Calculator from './calculator';

export default {
    name: 'SibCalculator',
    props: {
        copyValue: {
            type: Boolean,
            default: true,
        },
        showHistory: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            calculator: null,
        };
    },
    mounted() {
        this.calculator = new Calculator(this.$el, {
            // 是否允许点击结果值时，将值复制到粘贴板
            copyValue: this.copyValue,
            // 是否展示计算记录面板
            showHistory: this.showHistory,
            // 计算完成时触发的事件，参数为 Number 类型的值
            computeFinish: (value) => {
                this.$emit('compute-finish', value);
            },
            // 点击计算结果值触发的事件，参数为 Number 类型的值
            chooseResult: (value) => {
                this.$emit('choose-result', value);
            },
            // 点击计算记录面板内的记录值触发的事件，参数为 Number 类型的值
            chooseNumber: (value) => {
                this.$emit('choose-number', value);
            },
        });
    },
};
</script>
