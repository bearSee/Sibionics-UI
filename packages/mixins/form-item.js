export default {
    methods: {
        // 敲回车
        handlerEnter() {
            if (!this.enterable) return;
            // 表格查询
            if (this.handlerSearch) this.handlerSearch();
            // 表单提交
            if (this.handlerSubmit) this.handlerSubmit();
        },
        // 所有类型的表单项（输入框、下拉框、弹窗选择等）值变更触发的事件
        handlerChangeItem(value, info) {
            const {
                type, startCode, endCode, isRange,
            } = info;
            const valueSplit = [
                'inputrange',
                'numberrange',
                'daterange',
                'datetimerange',
                'monthrange',
            ].includes(type) || (type === 'time' && isRange);
            if (valueSplit && startCode && endCode) {
                const form = this.currentForm || this.searchForm;
                this.$set(form, startCode, value && value[0] || '');
                this.$set(form, endCode, value && value[1] || '');
            }
            if (['cascader', 'dropselect'].includes(type)) {
                if (this.$refs.form) this.$refs.form.clearValidate();
            }
            this.$emit('form-item-change', value, info);
            this.resetRelationshipFields(value, info);
            this.resetRelationResultFields(info);
        },
        // 下拉选择框值变更触发的事件
        handlerSelectChange(valueObj, info) {
            this.$emit('select-change', valueObj, info);
        },
        // 弹窗选择框值变更触发的事件
        handlerPickerChange(obj, info) {
            const form = this.currentForm || this.searchForm;
            Object.keys(obj.value).forEach((key) => {
                this.$set(form, key, obj.value[key]);
            });
            this.$emit('picker-change', obj, info);
        },
        // 表单项值变更，清空关联字段的值，并重新请求相关数据
        resetRelationshipFields(value, info, relationKey = [], saveOriginVal) {
            const { relationships } = info;
            const itemInfo = this.itemInfo || this.searchInfo;
            const form = this.currentForm || this.searchForm;
            const emptyValue = {
                '[object Undefined]': undefined,
                '[object Null]': null,
                '[object Number]': '',
                '[object String]': '',
                '[object Array]': [],
                '[object Object]': {},
                '[object Boolean]': false,
            };
            Object.keys(relationships || {}).forEach((key) => {
                // relationKey 已经递归重置了“关联字段的所有关联关系”对应的code
                if (!relationKey.includes(key)) {
                    relationKey.push(key, info.code);
                    const itemRef = this.$refs[`item-${key}`] && this.$refs[`item-${key}`][0];
                    // 找出关联字段和索引
                    const relationInfoIndex = itemInfo.findIndex(({ code }) => code === key);
                    const relationInfo = itemInfo[relationInfoIndex] || {};
                    const { showCode, requestConfig } = relationInfo;
                    const clearVal = emptyValue[Object.prototype.toString.call(form[key])] || '';
                    if (!saveOriginVal) {
                        // 清空关联字段的值
                        this.$set(form, key, clearVal);
                        // 清空弹窗、树等控件的展示值
                        if (showCode) {
                            this.$set(form, showCode, '');
                            if (itemRef) itemRef.setDefaultFormatValue();
                        }
                    }

                    if (relationInfo.relationships) this.resetRelationshipFields(clearVal, relationInfo, relationKey);
                    // 当前操作的字段，变更后有值，则将关联字段的请求重新触发一遍
                    const isArray = Object.prototype.toString.call(value) === '[object Array]';
                    // if (requestConfig && relationships[key] && ((isArray && value.length) || (!isArray && value) || value === 0)) {
                    if (requestConfig && relationships[key]) {
                        const paramValue = isArray && value.join() || value;
                        const params = { ...requestConfig.params, [relationships[key]]: paramValue };
                        if (paramValue !== 0 && !paramValue) delete params[relationships[key]];
                        this.$set(itemInfo[relationInfoIndex].requestConfig, 'params', params);
                        // if (itemRef) itemRef.getOptions();
                    }
                }
            });
        },
        // 表单项值变更，计算结果字段的值
        resetRelationResultFields(info = {}, relationKey = []) {
            const itemInfo = this.itemInfo || this.searchInfo;
            const relationResultInfos = itemInfo.filter(({ relationResults }) => relationResults);
            relationResultInfos.forEach((item) => {
                const { code, relationResults, precision } = item;
                const form = this.currentForm || this.searchForm;
                if (info.code !== code && !relationKey.includes(code)) {
                    let res = 0;
                    if (typeof relationResults === 'function') res = relationResults({ ...form });
                    if (typeof relationResults === 'string') {
                        try {
                            // eslint-disable-next-line no-eval
                            res = eval(relationResults)({ ...form });
                        } catch (error) {
                            console.error(`relationResults字段eval出错\n${relationResults}`);
                            res = 'Error';
                        }
                    }
                    if (Number(res) || Number(res) === 0) res = window.SIB.repairAccuracy(Number(res), Number(precision) === 0 ? 0 : (Number(precision) || 2));
                    this.$nextTick(() => {
                        this.$set(form, code, res);
                        this.resetRelationResultFields(item, [...relationKey, code, info.code]);
                    });
                }
            });
        },
    },
};
