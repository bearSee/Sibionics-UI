<template>
  <div
    class="sib-input-number"
    :class="showCalculator && 'show-calculator'">
    <el-input-number
      v-model="currentValue"
      v-bind="$attrs"
      @keyup.enter.native="handlerEnter"
      @change="handlerChange" />
    <el-popover
      v-if="showCalculator"
      placement="bottom"
      trigger="click">
      <i
        class="calculator-icon el-icon-s-grid"
        slot="reference"
        :title="$t('点击打开计算器')" />
      <sib-calculator
        :copy-value="copyValue"
        :show-history="showHistory"
        @choose-number="handlerChooseValue"
        @compute-finish="handlerChooseValue" />
    </el-popover>
  </div>
</template>

<script>

export default {
    name: 'SibInputNumber',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        showCalculator: {
            type: Boolean,
            default: false,
        },
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
            currentValue: this.value,
        };
    },
    watch: {
        // 传入的默认值改变时，变更currentValue
        value: {
            handler(val) {
                this.currentValue = val;
            },
            immediate: false,
        },
        currentValue(val) {
            this.$emit('input', val);
        },
    },
    methods: {
        handlerChange() {
            this.$emit('change', this.currentValue);
        },
        handlerEnter(e) {
            this.$emit('enter', e);
        },
        handlerChooseValue(value) {
            this.currentValue = value;
            this.handlerChange();
        },
    },
};
</script>
