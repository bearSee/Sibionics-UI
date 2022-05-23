<template>
  <div class="sib-dropdown">
    <el-dropdown
      :type="type"
      :size="size"
      :placement="placement"
      :trigger="trigger"
      :disabled="disabled"
      :split-button="splitButton"
      :hide-on-click="hideOnClick"
      @click="handlerClick"
      @command="handlerCommand">
      <div class="dropdown-link">
        <template v-if="$slots.default">
          <slot />
        </template>
        <span
          v-else-if="clearable && !disabled"
          @mouseenter="showClear = true"
          @mouseleave="showClear = false">
          {{ currentLabel }}
          <i
            class="el-icon-circle-close  el-icon--right"
            v-if="showClear && currentValue"
            @click.stop="currentValue = ''" />
          <i
            class="el-icon-arrow-down el-icon--right"
            v-else />
        </span>
        <span v-else>
          {{ currentLabel }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in data"
          :key="item[dataProps.key]"
          :divided="item.divided"
          :disabled="item.disabled"
          :command="item[dataProps.key]">
          <slot
            v-if="item.slot"
            name="opt"
            :opt="item" />
          <span v-else>{{ item[dataProps.value] }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
    name: 'SibDropdown',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        placeholder: {
            type: String,
            default: '请选择',
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        // 菜单按钮类型(primary / success / warning / danger / info / text)，只在split-button为 true 的情况下有效
        type: {
            type: String,
            default: 'primary',
        },
        // 下拉菜单尺寸 medium / small / mini
        size: {
            type: String,
            default: 'small',
        },
        // 下拉触发元素是否呈现为按钮组
        splitButton: {
            type: Boolean,
            default: false,
        },
        // 菜单弹出位置 top/top-start/top-end/bottom/bottom-start/bottom-end
        placement: {
            type: String,
            default: 'bottom',
        },
        // 触发下拉的行为 hover, click
        trigger: {
            type: String,
            default: 'click',
        },
        // 是否在点击菜单项后隐藏菜单
        hideOnClick: {
            type: Boolean,
            default: true,
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        },
        dataProps: {
            type: Object,
            default: () => ({ key: 'key', value: 'value' }),
        },
        // 下拉菜单数据 [{ key: 'name', value: '姓名' }]
        data: {
            type: Array,
            default: () => ([]),
        },
    },
    data() {
        return {
            currentValue: '',
            showClear: false,
        };
    },
    computed: {
        currentLabel() {
            const { key, value } = this.dataProps;
            return (this.data.find((d) => d[key] === this.currentValue) || {})[value] || this.$t(this.placeholder);
        },
    },
    watch: {
        // 传入的默认值改变时，变更currentValue
        value: {
            handler(val) {
                this.currentValue = val;
            },
            immediate: true,
        },
        currentValue(val) {
            this.$emit('input', val === 0 ? 0 : (val || ''));
            this.$emit('change', val === 0 ? 0 : (val || ''));
        },
    },
    methods: {
        handlerClick() {
            this.$emit('click', this.currentValue);
        },
        handlerCommand(key) {
            this.currentValue = key;
            this.$emit('select', this.data.find((d) => d[this.dataProps.key] === key) || {});
        },
    },
};
</script>
