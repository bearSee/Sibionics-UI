<template>
  <div
    class="sib-form"
    :class="{
      'border': border,
      'is-disabled': disabled,
    }">
    <el-form
      ref="form"
      inline
      v-if="itemInfo.length"
      :size="size"
      :model="currentForm"
      :rules="currentRules"
      :label-position="labelPosition"
      :label-width="labelWidth ? `${labelWidth}px` : 'auto'">
      <template v-for="(info, i) of itemInfo">
        <el-form-item
          ref="formItems"
          :class="[info.code + '-temp sib-form__temp', info.labelTips ? 'sib-form-tips__temp' : '', isCalculated && 'is-calculated']"
          :key="info.code"
          :title="$t(info.labelTips || info.label || '')"
          :style="info.width ? `width: ${info.width};min-width:${info.minWidth || 'auto'}` : `width: calc(${widthPercent}% - ${border && 1.5 || 10}px);min-width:${info.minWidth || 'auto'}`"
          :label="$t(info.label || ' ')"
          :prop="info.code"
          v-if="info.show !== false">
          <template
            v-if="info.type === 'slot'">
            <slot
              :name="info.code"
              :info="info"
              :index="i"
              :form="currentForm" />
          </template>
          <sib-item
            v-else
            v-model="currentForm[info.code]"
            :ref="`item-${info.code}`"
            :class="`sib-item-${info.type}`"
            :props="info"
            :disabled="disabled"
            :size="size"
            :format-value="currentForm[info.showCode]"
            @item-change="handlerChangeItem($event, info)"
            @select-change="handlerSelectChange($event, info)"
            @table-picker-change="handlerPickerChange($event, info)"
            @tree-picker-change="handlerPickerChange($event, info)"
            @enter="handlerEnter" />
        </el-form-item>
      </template>
      <!-- 隐藏域input解决浏览器默认提交bug -->
      <input
        type="text"
        v-show="false"
        v-if="itemInfo.length === 1">
      <el-form-item
        class="button-list"
        :style="buttonListStyle"
        v-if="!disabled">
        <sib-throttle
          :time="1000"
          events="click">
          <el-button
            class="submit"
            type="primary"
            :loading="isLoading"
            @click.native="handlerSubmit"
            v-if="isSubmit !== false">
            {{ $t(submitText) }}
          </el-button>
        </sib-throttle>
        <sib-throttle
          :time="1000"
          events="click">
          <el-button
            class="reset"
            @click.native="handlerResetForm"
            v-if="isCancel !== false">
            {{ $t(cancelText) }}
          </el-button>
        </sib-throttle>
        <slot
          name="more-operate"
          :currentForm="currentForm" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';

export default {
    name: 'SibForm',
    mixins: [formItemMixin],
    props: {
        size: {
            type: String,
            default: 'small',
        },
        border: {
            type: Boolean,
            default: false,
        },
        itemInfo: {
            type: Array,
            default: () => ([]),
        },
        form: {
            type: Object,
            default: () => ({}),
        },
        rules: {
            type: Object,
            default: () => ({}),
        },
        rowSize: {
            type: Number,
            default: 1,
        },
        labelPosition: {
            type: String,
            default: 'right',
        },
        labelWidth: {
            type: Number,
            default: 0,
        },
        isSubmit: {
            type: Boolean,
            default: true,
        },
        isCancel: {
            type: Boolean,
            default: true,
        },
        submitText: {
            type: String,
            default: '提交',
        },
        cancelText: {
            type: String,
            default: '重置',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        enterable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        widthPercent() {
            return (100 / this.rowSize).toFixed(2);
        },
        buttonListStyle() {
            const percentNumber = this.itemInfo.length % this.rowSize;
            const percent = (100 / this.rowSize * (this.rowSize - percentNumber)).toFixed(2);
            return `width:calc(${percent}% - 10px);`;
        },
    },
    data() {
        return {
            currentRules: {},
            currentForm: {},
            isLoading: false,
            isCalculated: false,
        };
    },
    watch: {
        form: {
            deep: true,
            handler() {
                this.initForm();
                this.$nextTick(() => {
                    if (this.$refs.form) this.$refs.form.clearValidate();
                });
            },
        },
        itemInfo: {
            deep: true,
            handler() {
                this.initForm(true);
                this.$nextTick(() => {
                    if (this.$refs.form) this.$refs.form.clearValidate();
                    this.resetFormItemWidth();
                });
            },
        },
        currentForm: {
            deep: true,
            handler() {
                this.$emit('change', this.currentForm);
            },
        },
    },
    methods: {
        initRules() {
            if (this.disabled) return;
            let rules = {};
            try {
                rules = window.SIB.deepCopy(this.rules);
            } catch (error) {
                console.error(error);
            }
            const inputTypes = ['text', 'inputrange', 'number', 'numberrange', 'textarea', 'password'];
            this.itemInfo.forEach(({
                label,
                code,
                required,
                type,
                placeholder,
                // startPlaceholder,
                // endPlaceholder,
                dataType,
                // isRange,
                // isPicker,
            }) => {
                const rule = rules[code] || [];
                if (required) {
                    const message = placeholder || `${this.$t(inputTypes.includes(type) ? '请输入' : '请选择')}${this.$t(label || '')}`;
                    const value = this.currentForm[code] === 0 ? 0 : (this.currentForm[code] || '');
                    const cTypes = {
                        number: 'number',
                    };
                    const dType = dataType || cTypes[type] || Object.prototype.toString.call(value).split(' ')[1].replace(']', '').toLocaleLowerCase();
                    rule.push({
                        type: dType,
                        required: true,
                        message,
                        trigger: ['blur', 'change'],
                    });
                    if (dType === 'array' && type !== 'cascader') {
                        const rl = {
                            validator: (ru, val, callback) => {
                                if (
                                    !val
                                    || !val.length
                                    || (['inputrange', 'numberrange', 'time', 'datetimerange', 'daterange', 'monthrange'].includes(type) && val.length < 2)
                                    || val.some((v) => v !== 0 && !v)
                                ) {
                                    callback(new Error(message));
                                    return;
                                }
                                callback();
                            },
                            trigger: ['blur'],
                        };
                        rule.push(rl);
                    }
                    // const isCustomRangeType = ['inputrange', 'numberrange'].includes(type) || (type === 'time' && isRange && !isPicker);
                    // if (isCustomRangeType) {
                    //     const field = {
                    //         type: type === 'numberrange' ? 'number' : 'string',
                    //         required: true,
                    //     };
                    //     ruleConfig.fields = {
                    //         0: { ...field, message: startPlaceholder || message },
                    //         1: { ...field, message: endPlaceholder || message },
                    //     };
                    // }
                }
                if (rule.length) rules[code] = rule;
            });
            this.currentRules = rules;
        },
        initForm(isSave) {
            const form = this.form;
            this.itemInfo.forEach((info) => {
                const {
                    code, value, type, multiple, isRange, relationships, props = {},
                } = info;
                if (code) {
                    const isMultiple = [
                        'inputrange',
                        'numberrange',
                        'table',
                        'tree',
                        'check',
                        'dates',
                        'datetimerange',
                        'daterange',
                        'monthrange',
                    ].includes(type)
                        || (type === 'select' && multiple)
                        || (type === 'cascader' && (props.multiple || props.emitPath !== false))
                        || (type === 'time' && isRange);
                    const isString = Object.prototype.toString.call(form[code]) === '[object String]';

                    const defaultVal = value === 0 ? 0 : (value || '');
                    form[code] = form[code] === 0 ? 0 : (form[code] || defaultVal);
                    if (isMultiple && isString) {
                        form[code] = form[code] ? form[code].split(',') : [];
                    } else if (isMultiple) {
                        form[code] = form[code] || [];
                    }
                    // 配置了关联字段并且有值时，初始化关联字段
                    if (relationships && ((isMultiple && form[code].length) || (!isMultiple && form[code]) || form[code] === 0)) this.resetRelationshipFields(form[code], info, [], true);
                }
            });
            this.currentForm = { ...form, ...(isSave ? this.currentForm : {}) };
            this.resetRelationResultFields();
            this.initRules();
        },
        handlerResetForm() {
            // this.$refs.form.resetFields();
            // this.currentForm = { ...this.form };
            this.initForm();
            this.$nextTick(() => {
                if (this.$refs.form) this.$refs.form.clearValidate();
            });
            this.$emit('reset');
        },
        async handlerSubmit() {
            if (!this.isSubmit) return;
            const valid = await this.getValidateStatus();
            if (!valid) return;
            this.isLoading = true;
            this.$emit('submit', this.currentForm, () => {
                this.isLoading = false;
            });
        },
        getValidateStatus() {
            return new Promise((resolve) => {
                this.$refs.form.validate((v) => {
                    resolve(v ? this.currentForm : v);
                });
            });
        },
        // 动态调整表单宽度
        resetFormItemWidth() {
            if (this.labelPosition === 'top') {
                this.isCalculated = true;
                return;
            }
            setTimeout(() => {
                const formItems = this.$refs.formItems || [];
                formItems.forEach((formItem) => {
                    try {
                        let labelWidth = 0;
                        let labelMargin = 0;
                        const labelWrap = formItem.$el.querySelector('.el-form-item__label-wrap');
                        const label = formItem.$el.querySelector('.el-form-item__label');
                        const dom = formItem.$el.querySelector('.el-form-item__content');
                        if (this.border) {
                            labelWidth = this.labelWidth || 120;
                            labelMargin = 20;
                            label.style.width = `${labelWidth}px`;
                        } else if (!this.border && !this.labelWidth) {
                            labelWidth = +window.getComputedStyle(labelWrap).width.replace(/px/ig, '');
                            labelMargin = +window.getComputedStyle(labelWrap).marginLeft.replace(/px/ig, '');
                        } else {
                            labelWidth = +window.getComputedStyle(label).width.replace(/px/ig, '');
                            labelMargin = +window.getComputedStyle(label).marginLeft.replace(/px/ig, '');
                        }
                        dom.style.width = `calc(100% - ${labelWidth + labelMargin}px)`;
                    } catch (error) {
                        // eslint-disable-next-line no-console
                        console.error(error);
                    }
                });
                this.isCalculated = true;
            }, 100);
        },
    },
    created() {
        this.initForm();
    },
    mounted() {
        this.$nextTick(() => {
            this.resetFormItemWidth();
        });
    },
};
</script>
