<template>
  <div
    class="sib-item"
    :class="props.unit && 'has-unit'"
    :title="props.type !== 'password' && props.showValue !== false ? (currentFormatValue || currentValue || '') : ''">
    <label
      v-if="props.type === 'label'"
      class="text-label">
      <div
        v-for="val in String(currentValue === 0 ? 0 : (currentValue || '')).split(/\n/ig)"
        :key="val">{{ val }}</div>
    </label>
    <div
      class="text-input"
      v-else-if="props.type === 'text'">
      <span
        class="prefix-text cut_font"
        v-if="props.prefixText"
        :title="props.prefixText">
        {{ props.prefixText }}
      </span>
      <el-input
        type="text"
        :value="currentValue"
        :placeholder="props.placeholder || `${$t('请输入')}${$t(props.label || '')}`"
        :disabled="disabled || props.disabled"
        :readonly="props.readonly"
        :maxlength="props.maxlength"
        :show-word-limit="props.showWordLimit"
        :prefix-icon="props.prefix"
        :suffix-icon="props.suffix"
        :size="props.size || size"
        :clearable="props.clearable !== false"
        @clear="handlerClear"
        @keyup.enter.native="handlerEnter"
        @blur="handlerTextBlur"
        @input="handlerTrimValue" />
      <span
        class="suffix-text cut_font"
        v-if="props.suffixText"
        :title="props.suffixText">
        {{ props.suffixText }}
      </span>
    </div>
    <el-input
      type="password"
      auto-complete="new-password"
      v-else-if="props.type === 'password'"
      :value="currentValue"
      :placeholder="props.placeholder || `${$t('请输入')}${$t(props.label || '')}`"
      :disabled="disabled || props.disabled"
      :show-password="props.showPassword"
      :prefix-icon="props.prefix"
      :suffix-icon="props.suffix"
      :maxlength="props.maxlength"
      :size="props.size || size"
      :clearable="props.clearable !== false"
      @clear="handlerClear"
      @keyup.enter.native="handlerEnter"
      @input="handlerTrimValue"
      @blur="handlerChange" />
    <el-input
      type="textarea"
      show-word-limit
      v-else-if="props.type === 'textarea'"
      v-model="currentValue"
      :placeholder="props.placeholder || `${$t('请输入')}${$t(props.label || '')}`"
      :disabled="disabled || props.disabled"
      :resize="props.resize === false && 'none' || props.resize"
      :readonly="props.readonly"
      :rows="props.rows"
      :autosize="props.autosize || (!!props.rows ? false : { minRows: 2, maxRows: 6 })"
      :maxlength="props.maxlength"
      :size="props.size || size"
      @blur="handlerChange" />
    <!-- resize  none, both, horizontal, vertical -->
    <input-number
      v-else-if="props.type === 'number'"
      v-model="currentValue"
      :placeholder="props.placeholder || `${$t('请输入')}${$t(props.label || '')}`"
      :disabled="disabled || props.disabled"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :step-strictly="props.stepStrictly"
      :precision="props.precision"
      :controls="props.controls !== false"
      :controls-position="props.controlsPosition"
      :size="props.size || size"
      :show-calculator="props.showCalculator"
      :copy-value="props.copyValue"
      :show-history="props.showHistory"
      @enter="handlerEnter"
      @change="handlerChange" />
    <template v-else-if="props.type === 'inputrange'">
      <div class="item-inputrange">
        <el-col :span="11">
          <el-input
            v-model="currentValue[0]"
            :placeholder="props.startPlaceholder || `${$t('请输入')}${$t(props.label || '')}`"
            :disabled="disabled || props.disabled"
            :readonly="props.readonly"
            :maxlength="props.maxlength"
            :show-word-limit="props.showWordLimit"
            :prefix-icon="props.prefix"
            :suffix-icon="props.suffix"
            :size="props.size || size"
            :clearable="props.clearable !== false"
            @clear="handlerClear(0)"
            @blur="handlerTextBlur(0)"
            @keyup.enter.native="handlerEnter" />
        </el-col>
        <el-col
          class="line"
          :span="2">
          {{ props.rangeSeparator || '-' }}
        </el-col>
        <el-col :span="11">
          <el-input
            v-model="currentValue[1]"
            :placeholder="props.endPlaceholder || `${$t('请输入')}${$t(props.label || '')}`"
            :disabled="disabled || props.disabled"
            :readonly="props.readonly"
            :maxlength="props.maxlength"
            :show-word-limit="props.showWordLimit"
            :prefix-icon="props.prefix"
            :suffix-icon="props.suffix"
            :size="props.size || size"
            :clearable="props.clearable !== false"
            @clear="handlerClear(1)"
            @blur="handlerTextBlur(1)"
            @keyup.enter.native="handlerEnter" />
        </el-col>
      </div>
    </template>
    <template v-else-if="props.type === 'numberrange'">
      <div class="item-inputrange">
        <el-col :span="11">
          <input-number
            v-model="currentValue[0]"
            :placeholder="props.startPlaceholder || `${$t('请输入')}${$t(props.label || '')}`"
            :disabled="disabled || props.disabled"
            :min="props.min"
            :max="currentValue[1]"
            :step="props.step"
            :step-strictly="props.stepStrictly"
            :precision="props.precision"
            :controls="props.controls !== false"
            :controls-position="props.controlsPosition"
            :size="props.size || size"
            :show-calculator="props.showCalculator"
            :copy-value="props.copyValue"
            :show-history="props.showHistory"
            @enter="handlerEnter"
            @change="handlerChange" />
        </el-col>
        <el-col
          class="line"
          :span="2">
          {{ props.rangeSeparator || '-' }}
        </el-col>
        <el-col :span="11">
          <input-number
            v-model="currentValue[1]"
            :placeholder="props.endPlaceholder || `${$t('请输入')}${$t(props.label || '')}`"
            :disabled="disabled || props.disabled"
            :min="currentValue[0]"
            :max="props.max"
            :step="props.step"
            :step-strictly="props.stepStrictly"
            :precision="props.precision"
            :controls="props.controls !== false"
            :controls-position="props.controlsPosition"
            :size="props.size || size"
            :show-calculator="props.showCalculator"
            :copy-value="props.copyValue"
            :show-history="props.showHistory"
            @enter="handlerEnter"
            @change="handlerChange" />
        </el-col>
      </div>
    </template>
    <sib-dropdown
      v-else-if="props.type === 'dropselect'"
      v-model="currentValue"
      :placeholder="props.placeholder || `${$t('请选择')}${$t(props.label || '')}`"
      :disabled="disabled || props.disabled"
      :placement="props.placement"
      :size="props.size || size"
      :data-props="props.optionProps"
      :data="props.options"
      :clearable="props.clearable !== false"
      @clear="handlerClear"
      @change="handlerSelectChange" />
    <el-select
      v-else-if="props.type === 'select'"
      v-model="currentValue"
      :placeholder="props.placeholder || `${$t('请选择')}${$t(props.label || '')}`"
      :disabled="disabled || props.disabled"
      :filterable="props.filterable"
      :filter-method="props.filterMethod"
      :remote="props.remote"
      :remote-method="props.remoteMethod"
      :reserve-keyword="props.reserveKeyword"
      :multiple="props.multiple"
      :multiple-limit="props.multipleLimit"
      :collapse-tags="props.collapseTags"
      :size="props.size || size"
      :clearable="props.clearable !== false"
      @clear="handlerClear"
      @change="handlerSelectChange">
      <el-option
        v-for="item in (props.options || [])"
        :key="item[optionProps.key]"
        :label="item[optionProps.value]"
        :value="item[optionProps.key]"
        :disabled="item.disabled" />
    </el-select>
    <el-cascader
      ref="cascader"
      v-else-if="props.type === 'cascader'"
      v-model="currentValue"
      :placeholder="props.placeholder || `${$t('请选择')}${$t(props.label || '')}`"
      :disabled="disabled || props.disabled"
      :options="props.options"
      :props="props.props"
      :show-all-levels="props.showAllLevels"
      :collapse-tags="props.collapseTags"
      :separator="props.separator"
      :filterable="props.filterable"
      :filter-method="props.filterMethod"
      :debounce="props.debounce"
      :before-filter="props.beforeFilter"
      :popper-class="props.popperClass"
      :size="props.size || size"
      :clearable="props.clearable !== false"
      @change="handlerSelectChange">
      <template slot-scope="{ node, data }">
        <span>{{ data[(props.props || {}).label || 'label'] }}</span>
        <span
          v-if="!node.isLeaf
            && data[(props.props || {}).children || 'children']
            && data[(props.props || {}).children || 'children'].length">
          （{{ data[(props.props || {}).children || 'children'].length }}）
        </span>
      </template>
    </el-cascader>
    <el-checkbox-group
      v-else-if="props.type === 'check'"
      v-model="currentValue"
      :disabled="disabled || props.disabled"
      :size="props.size || size"
      @change="handlerSelectChange">
      <el-checkbox
        v-for="item in (props.options || [])"
        :title="item[optionProps.value]"
        :key="item[optionProps.key]"
        :label="item[optionProps.key]"
        :disabled="props.disabled">
        {{ item[optionProps.value] }}
      </el-checkbox>
    </el-checkbox-group>
    <el-radio-group
      v-else-if="props.type === 'radio'"
      v-model="currentValue"
      :disabled="disabled || props.disabled"
      :size="props.size || size"
      @change="handlerSelectChange">
      <el-radio
        v-for="item in (props.options || [])"
        :title="item[optionProps.value]"
        :key="item[optionProps.key]"
        :label="item[optionProps.key]"
        :disabled="props.disabled">
        {{ item[optionProps.value] }}
      </el-radio>
    </el-radio-group>
    <el-switch
      v-else-if="props.type === 'switch'"
      v-model="currentValue"
      :disabled="disabled || props.disabled"
      :active-value="props.on === undefined ? 'on' : props.on"
      :inactive-value="props.off === undefined ? 'off' : props.off"
      @change="handlerChange" />
    <template v-else-if="props.type === 'time'">
      <el-time-picker
        v-if="props.isPicker"
        v-model="currentValue"
        :arrow-control="props.arrowControl"
        :placeholder="props.placeholder || `${$t('请选择')}${$t(props.label || '')}`"
        :start-placeholder="props.startPlaceholder || $t('请选择起始时间')"
        :end-placeholder="props.endPlaceholder || $t('请选择结束时间')"
        :is-range="props.isRange"
        :range-separator="props.rangeSeparator || '-'"
        :disabled="disabled || props.disabled"
        :default-value="defaultTimeValue(0)"
        :picker-options="props.pickerOptions || {
          selectableRange: '00:00:00 - 23:59:59',
          format: props.format || 'HH:mm:ss',
        }"
        :value-format="props.format || 'HH:mm:ss'"
        :size="props.size || size"
        :clearable="props.clearable !== false"
        @clear="handlerClear"
        @change="handlerChange" />
      <template v-else>
        <template v-if="props.isRange">
          <div class="item-time-range">
            <el-col :span="11">
              <el-time-select
                v-model="currentValue[0]"
                :placeholder="props.startPlaceholder || $t('请选择起始时间')"
                :picker-options="(props.startPickerOptFormat
                  && typeof props.startPickerOptFormat === 'function'
                  ? props.startPickerOptFormat(currentValue)
                  : props.startPickerOptFormat)
                  || {
                    start: '00:00',
                    step: '00:05',
                    end: '23:59',
                    ...(props.pickerOptions || {}),
                    maxTime: currentValue[1],
                  }"
                :default-value="defaultTimeValue(0)"
                :disabled="disabled || props.disabled"
                :size="props.size || size"
                @change="handlerChange" />
            </el-col>
            <el-col
              class="line"
              :span="2">
              {{ props.rangeSeparator || '-' }}
            </el-col>
            <el-col :span="11">
              <el-time-select
                v-model="currentValue[1]"
                :placeholder="props.endPlaceholder || $t('请选择结束时间')"
                :picker-options="(props.endPickerOptFormat
                  && typeof props.endPickerOptFormat === 'function'
                  ? props.endPickerOptFormat(currentValue)
                  : props.endPickerOptFormat)
                  || {
                    start: '00:00',
                    step: '00:05',
                    end: '23:59',
                    ...(props.pickerOptions || {}),
                    minTime: currentValue[0]
                  }"
                :default-value="defaultTimeValue(1)"
                :disabled="disabled || props.disabled"
                :size="props.size || size"
                @change="handlerChange" />
            </el-col>
          </div>
        </template>
        <el-time-select
          v-else
          :placeholder="props.placeholder || `${$t('请选择')}${$t(props.label || '')}`"
          v-model="currentValue"
          :picker-options="props.pickerOptions || {
            start: '00:00',
            step: '00:05',
            end: '23:59',
          }"
          :default-value="defaultTimeValue(0)"
          :disabled="disabled || props.disabled"
          :size="props.size || size"
          @change="handlerChange" />
      </template>
    </template>
    <el-date-picker
      type="week"
      v-else-if="props.type === 'week'"
      v-model="currentValue"
      :placeholder="props.placeholder || `${$t('请选择')}${$t(props.label || '')}`"
      :disabled="disabled || props.disabled"
      :readonly="props.readonly"
      :picker-options="props.pickerOptions"
      :format="props.format || 'yyyy 第 WW 周'"
      value-format="yyyy-MM-dd"
      :size="props.size || size"
      :clearable="props.clearable !== false"
      @clear="handlerClear"
      @change="handlerChange" />
    <el-date-picker
      v-else-if="['year', 'month', 'date', 'dates', 'datetime', 'datetimerange', 'daterange', 'monthrange'].includes(props.type)"
      v-model="currentValue"
      :type="props.type"
      :placeholder="props.placeholder || `${$t('请选择')}${$t(props.label || '')}`"
      :start-placeholder="props.startPlaceholder || $t('请选择起始时间')"
      :end-placeholder="props.endPlaceholder || $t('请选择结束时间')"
      :range-separator="props.rangeSeparator || '-'"
      :disabled="disabled || props.disabled"
      :readonly="props.readonly"
      :picker-options="props.pickerOptions"
      :format="props.format || dateFormat"
      :value-format="props.valueFormat || dateFormat"
      :size="props.size || size"
      :clearable="props.clearable !== false"
      @clear="handlerClear"
      @change="handlerChange" />
    <el-upload
      v-else-if="props.type === 'upload'"
      :disabled="props.disabled"
      :action="props.action"
      :headers="{ ...uploadHeaders, ...(props.headers || {}) }"
      :data="props.params || {}"
      :limit="props.limit"
      :show-file-list="props.showFileList"
      :list-type="props.listType || 'text'"
      :accept="props.accept"
      :on-preview="props.onPreview"
      :on-success="uploadSuccess"
      :on-remove="uploadRemove"
      :before-upload="beforeUpload"
      :file-list="currentValue"
      :name="props.name || 'file'"
      @change="handlerChange">
      <el-button
        :size="props.size || size"
        type="primary"
        :id="`${props.onlyKey || ''}_upload_${props.code}`">
        {{ $t(props.btnText || '点击上传') }}
      </el-button>
      <div
        slot="tip"
        class="el-upload__tip"
        v-if="props.showTips">
        <!-- accept 为 'image/png' 等 w3c 标准属性 -->
        {{ props.uploadTip ? props.uploadTip : `${$t('不限制文档类型，大小限制为')}${props.maxSize || 5}M` }}
      </div>
    </el-upload>
    <el-input
      type="text"
      prefix-icon="el-icon-search"
      v-else-if="props.type === 'tree'"
      :size="props.size || size"
      :value="currentFormatValue"
      :placeholder="props.placeholder || `${$t('请选择')}${$t(props.label || '')}`"
      :disabled="disabled || props.disabled"
      :clearable="props.clearable !== false"
      @clear="handlerClear"
      @click.native="handlerClickInput($event)" />
    <sib-tree-picker
      v-if="props.type === 'tree' && treeVisible"
      v-bind="props"
      :title="props.label"
      :visible.sync="treeVisible"
      :width="props.pickerWidth"
      :request-config="props.requestConfig"
      :selected="currentValue"
      :leaf-only="props.leafOnly"
      @selection-change="handlerTreePickerChange" />
    <el-input
      type="text"
      prefix-icon="el-icon-search"
      v-else-if="props.type === 'table'"
      :size="props.size || size"
      :value="currentFormatValue"
      :placeholder="props.placeholder || `${$t('请选择')}${$t(props.label || '')}`"
      :disabled="disabled || props.disabled"
      :clearable="props.clearable !== false"
      @clear="handlerClear"
      @click.native="handlerClickInput($event)" />
    <sib-table-picker
      v-if="props.type === 'table' && pickerVisible"
      :title="props.label"
      :visible.sync="pickerVisible"
      :width="props.pickerWidth"
      :table-config="props.tableConfig"
      :request-config="props.tableConfig.requestAlways !== false ? props.requestConfig : {}"
      :row-trans="props.trans"
      :row-key="rowKey"
      :selected="selections"
      @selection-change="handlerPickerChange" />
    <div
      class="unit"
      :title="props.unit"
      v-if="props.unit"
      v-html="props.unit" />
  </div>
</template>

<script>
import { encryptAES } from '../../../src/utils/encryption';
import inputNumber from './input-number';

export default {
    name: 'SibItem',
    components: { inputNumber },
    props: {
        size: {
            type: String,
            default: 'small',
        },
        props: {
            type: Object,
            default: () => ({}),
        },
        value: {
            type: [String, Number, Array],
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        formatValue: {
            type: [String, Number],
            default: '',
        },
    },
    data() {
        // UUID || 生成随机数
        const uuid = Array(8).fill().map(() => (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1)).join('');
        const aun = window.localStorage.getItem(`accessToken-${window.systemId}`) || '';
        const timeStamp = window.SIB.formatDate(new Date(), 'YYYYMMDDhhmmss');
        return {
            currentValue: '',
            file: {},
            // table/tree弹窗选择框默认值展示
            currentFormatValue: '',
            pickerVisible: false,
            treeVisible: false,
            uploadHeaders: {
                aun,
                mid: encryptAES(uuid),
                ts: encryptAES(timeStamp),
            },
        };
    },
    computed: {
        propParams() {
            return this.props.requestConfig && this.props.requestConfig.params || {};
        },
        optionProps() {
            const optionProps = { key: 'key', value: 'value', ...this.props.optionProps };
            return optionProps;
        },
        dateFormat() {
            const { type } = this.props;
            const formatRules = {
                year: 'yyyy',
                month: 'yyyy-MM',
                date: 'yyyy-MM-dd',
                datetime: 'yyyy-MM-dd HH:mm:ss',
                // 多个日期
                dates: 'yyyy-MM-dd',
                // 年月日时分秒范围选择
                datetimerange: 'yyyy-MM-dd HH:mm:ss',
                // 年月日范围选择
                daterange: 'yyyy-MM-dd',
                // 年月范围选择
                monthrange: 'yyyy-MM',
            };
            return formatRules[type];
        },
        // 值为多个，值类型为数组
        isMultiple() {
            const {
                type, multiple, isRange, props = {},
            } = this.props;
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
            return isMultiple;
        },
        rowKey() {
            const { trans = [], code, rowKey } = this.props;
            const key = (trans.find(({ to }) => code === to) || {}).from;
            return rowKey || key || code;
        },
        selections() {
            const { trans = [], showCode } = this.props;
            const keys = this.currentValue || [];
            const values = this.currentFormatValue && this.currentFormatValue.split(',') || [];
            const valueCode = (trans.find(({ to }) => to === showCode) || {}).from;
            return keys.map((key, i) => ({
                [this.rowKey]: key,
                [showCode]: values[i],
                [valueCode]: values[i],
            }));
        },
    },
    watch: {
        // 传入的默认值改变时，变更currentValue
        value: {
            handler(val) {
                this.setDefaultValue(val);
            },
            immediate: false,
        },
        currentValue(val) {
            this.$emit('input', val === 0 ? 0 : (val || ''));
            this.$emit('change', val === 0 ? 0 : (val || ''));
        },
        formatValue(val) {
            this.setDefaultFormatValue(val);
        },
        propParams: {
            immediate: true,
            deep: true,
            handler() {
                // 获取下拉框数据等相关配置
                this.getOptions();
            },
        },
    },
    methods: {
        setDefaultValue(val) {
            const {
                type, isPicker, isRange, dataType, optionProps = {},
            } = this.props;
            let value = val === 0 ? 0 : (val || '');
            const isString = Object.prototype.toString.call(value) === '[object String]';
            if (this.isMultiple) {
                if ((this.currentValue && value) && JSON.stringify(this.currentValue || '[]') === JSON.stringify(value || '[]')) return;
                value = isString ? (value && value.split(',') || []) : JSON.parse(JSON.stringify(value));
                const isNumber = dataType === 'number' || type === 'numberrange' || optionProps.valueType === 'number';
                if (isNumber) value = value.map((v) => Number(v) || '');
            }
            if (type === 'time' && isRange && isPicker && !value.length) {
                value = ['', ''];
            }
            if (type === 'upload') value = value || [];
            this.currentValue = value;
        },
        setDefaultFormatValue(fValue = '') {
            const {
                code, showCode, type, tableConfig, trans,
            } = this.props;
            if (['tree'].includes(type)) {
                const isArray = Object.prototype.toString.call(this.value) === '[object Array]';
                if (!fValue) fValue = isArray ? this.value.join(',') : this.value;
            } else if (['table'].includes(type)) {
                const codeKey = ((trans || []).find(({ to }) => to === code) || {}).from;
                const showCodeKey = ((trans || []).find(({ to }) => to === showCode) || {}).from || codeKey;
                fValue = ((tableConfig || {}).data || []).filter((d) => this.currentValue.includes(d[codeKey])).map((d) => d[showCodeKey]).join(',') || fValue;
            } else if (['select', 'check', 'radio', 'dropselect'].includes(type)) {
                const { options = [], optionProps = { key: 'key', value: 'value' } } = this.props;
                const isArray = Object.prototype.toString.call(this.currentValue) === '[object Array]';
                // eslint-disable-next-line max-len
                fValue = options.filter((opt) => (isArray ? this.currentValue.includes(opt[optionProps.key]) : this.currentValue === opt[optionProps.key])).map((opt) => opt[optionProps.value]).join(',') || fValue;
            } else {
                fValue = this.currentValue;
            }
            this.currentFormatValue = fValue;
        },
        getOptions() {
            const {
                requestConfig, type, setInitialVal, stringify, tableConfig = {},
            } = this.props;
            const requested = requestConfig && requestConfig.url
                && (['select', 'check', 'radio', 'dropselect', 'cascader'].includes(type) || (type === 'table' && tableConfig.requestAlways === false));
            if (requested) {
                const { url, method = 'get', callback } = requestConfig;
                const requestParams = stringify ? this.$qs.stringify(this.propParams) : this.propParams;
                const requestUrl = method === 'post' ? url : `${url}?${this.$qs.stringify(requestParams)}`;

                this.$http[method](requestUrl, requestParams).then((res) => {
                    let opts;
                    if (callback && typeof callback === 'function') {
                        opts = callback(res) || [];
                    } else {
                        opts = res && res.data && res.data.data || [];
                    }

                    if (['table'].includes(type)) {
                        this.$set(this.props.tableConfig || {}, 'data', opts);
                    } else {
                        const { key, value } = this.optionProps;
                        opts = opts.map((opt) => {
                            const isObj = Object.prototype.toString.call(opt) === '[object Object]';
                            let object = isObj ? opt : {};
                            if (key && opt[key]) {
                                object = {
                                    ...object,
                                    [key]: isObj ? opt[key] : opt,
                                    [value]: isObj ? opt[value] : opt,
                                };
                            }
                            return object;
                        });
                        this.$set(this.props, 'options', opts);
                        if (this.props.value !== 0 && !this.props.value
                            && this.currentValue !== 0 && !this.currentValue
                            && setInitialVal
                            && !['cascader'].includes(type)) {
                            this.currentValue = opts[0] && opts[0][key] || '';
                        }
                    }

                    this.setDefaultFormatValue();
                    this.$forceUpdate();
                });
            }
        },
        // lov弹窗选择
        handlerClickInput(e) {
            if (!this.disabled && !this.props.disabled && e.target.tagName === 'INPUT') {
                const visibleObj = {
                    tree: 'treeVisible',
                    table: 'pickerVisible',
                };
                this[visibleObj[this.props.type]] = true;
            }
        },
        beforeUpload(file) {
            if (this.props.maxSize && file.size > (this.props.maxSize * 1024 * 1024)) {
                this.$message.warning(this.$t('文件大小超过', { size: this.props.maxSize }));
                return false;
            }
            this.file = file;
            return true;
        },
        uploadSuccess(res) {
            res.name = res.filename || res.name || this.file.name;
            if (typeof this.props.onSuccess === 'function') {
                res = this.props.onSuccess(res, this.file);
            }
            if (res) this.currentValue.push(res);

            // this.currentValue.push(res);
            // const code = (res.data || {}).code || '';
            // if (String(code) !== '200') {
            //     this.currentValue.pop(res);
            //     this.$message.warning(res.msg || this.$t('上传失败'));
            // }
        },
        uploadRemove(file) {
            const index = this.currentValue.indexOf(file);
            this.currentValue.splice(index, 1);
        },
        // table弹窗选择框
        handlerPickerChange(rows) {
            const { code, showCode } = this.props;
            const tanslateRows = rows.map((row) => this.tanslateTableData(row));
            this.currentValue = tanslateRows.map((row) => row[code]);
            this.currentFormatValue = tanslateRows.map((row) => row[showCode] || row[code]).join(',');
            this.$emit('table-picker-change', {
                rows: tanslateRows,
                value: {
                    [code]: this.currentValue.join(','),
                    [showCode]: this.currentFormatValue,
                },
            });
            this.handlerChange();
        },
        // tree弹窗选择框
        handlerTreePickerChange(checked, halfChecked) {
            const {
                code, nodeKey = 'id', labelProp = 'name', showCode, checkedFormatter,
            } = this.props;
            const isFormatter = checkedFormatter && typeof checkedFormatter === 'function';
            const realChecked = isFormatter ? (checkedFormatter(checked, halfChecked) || checked) : checked;
            this.currentValue = realChecked.map((row) => row[nodeKey]);
            this.currentFormatValue = realChecked.map((row) => row[labelProp] || row[nodeKey]).join(',');
            this.$emit('tree-picker-change', {
                rows: checked,
                halfRows: halfChecked,
                realChecked,
                value: {
                    [code]: this.currentValue,
                    [showCode]: this.currentFormatValue,
                },
            });
            this.handlerChange();
        },
        // table弹窗选择框 数据转换
        tanslateTableData(data = {}) {
            const { trans, code } = this.props;
            const values = {
                ...data,
                [code]: data[code] || '',
            };
            if (trans instanceof Array) {
                trans.forEach(({ from, to }) => {
                    values[to] = data[from] || '';
                });
            }
            return values;
        },
        defaultTimeValue(key) {
            const {
                type,
                defaultValue,
                isPicker,
                isRange,
            } = this.props;
            if (!defaultValue || type !== 'time') return null;

            let values = [defaultValue].flat(9);
            if (isPicker) values = values.map((t) => `${window.getCertainDate()} ${t || '00:00:00'}`);
            if (isPicker && isRange) return values.map((t) => new Date(t));
            return values[key];
        },
        // 数据清空
        handlerClear(index) {
            const { type, code, showCode } = this.props;
            if (this.isMultiple) {
                const value = [...(this.currentValue || [])];
                if (value[index] || value[index] === 0) value[index] = '';
                this.currentValue = value;
            } else {
                this.currentValue = '';
            }
            if (['table'].includes(type)) {
                this.$emit('table-picker-change', {
                    rows: [],
                    value: {
                        [code]: '',
                        [showCode]: '',
                    },
                });
            }
            if (['tree'].includes(type)) {
                this.$emit('tree-picker-change', {
                    rows: [],
                    halfRows: [],
                    realChecked: [],
                    value: {
                        [code]: '',
                        [showCode]: '',
                    },
                });
            }
            this.currentFormatValue = '';
            this.handlerChange();
        },
        handlerEnter(e) {
            try {
                e.target.blur();
            } catch (error) {
                console.error(error);
            }
            this.$nextTick(() => {
                this.$emit('enter');
            });
        },
        handlerTrimValue(value) {
            const strValue = String(value === 0 ? 0 : (value || ''));
            const trimValue = {
                all: strValue.replace(/\s/ig, ''),
                common: strValue.trim(),
                none: strValue,
            };
            this.currentValue = trimValue[this.props.trim || 'all'];
        },
        handlerChange() {
            this.$nextTick(() => {
                this.$emit('item-change', this.currentValue);
            });
        },
        handlerSelectChange() {
            this.$nextTick(() => {
                this.setDefaultFormatValue();
                this.$emit('item-change', this.currentValue);
                this.$emit('select-change', {
                    value: this.currentValue,
                    formatValue: this.currentFormatValue,
                    checkedNodes: this.getCheckedNodes(),
                    checkedLeafNodes: this.getCheckedNodes(true),
                });
            });
        },
        handlerTextBlur(index) {
            const { type, valueType, precision = 0 } = this.props;
            if (['text', 'inputrange'].includes(type) && ['number', 'letter', 'letter-number'].includes(valueType)) {
                const isRange = Object.prototype.toString.call(this.currentValue) === '[object Array]';
                const originVal = isRange ? this.currentValue[index] : this.currentValue;
                let value = '';
                if (valueType === 'number') {
                    const number = Number(parseFloat(originVal));
                    if (number !== 0 && !number) {
                        value = '';
                    } else {
                        value = Number((number === 0 ? 0 : number).toFixed(precision));
                    }
                }
                if (valueType === 'letter') value = originVal.replace(/[^a-zA-Z]/ig, '');
                if (valueType === 'letter-number') value = originVal.replace(/\W/ig, '');
                // eslint-disable-next-line no-unused-expressions
                isRange ? this.currentValue.splice(index, 1, value) : this.currentValue = value;
            }
            this.handlerChange();
        },
        // type 为 cascader时，该方法用于获取选中的节点;(leafOnly) 是否只是叶子节点，默认值为 false
        getCheckedNodes(leafOnly) {
            return this.$refs.cascader && this.$refs.cascader.getCheckedNodes(leafOnly) || [];
        },
    },
    created() {
        this.setDefaultValue(this.value || this.props.value);
        this.setDefaultFormatValue(this.formatValue || this.props.formatValue);
    },
};
</script>
