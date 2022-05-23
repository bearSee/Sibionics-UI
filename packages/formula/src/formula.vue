<template>
  <div class="sib-formula">
    <div class="formula-container">
      <div class="header-formula">
        <div id="formula" />
        <div class="c-number">
          {{ currentNumber.label || currentNumber.number || 0 }}
        </div>
      </div>
      <div class="container-operation">
        <div class="operation-box">
          <sib-throttle
            v-for="(symbol, index) in operationSymbols"
            :key="index"
            :time="250"
            events="click">
            <el-button
              :class="['symbol', `symbol-${symbol.class}`]"
              @click.native.stop="handlerTouchKey(symbol)">
              <span v-if="symbol.symbol">{{ symbol.symbol }}</span>
              <div
                class="symbol-render"
                v-else-if="symbol.render"
                v-html="symbol.render" />
            </el-button>
          </sib-throttle>
        </div>
        <div class="formula-variable">
          <div class="variable-list vertical-scroll">
            <el-button
              class="variable"
              type="info"
              v-for="(variable, i) in variableList"
              :key="variable.key"
              :title="`点击选择 ${variable.name}`"
              @click="handlerChooseVariable(variable)">
              <i
                class="del el-icon-close"
                :title="`删除 ${variable.name}`"
                v-if="delVariable"
                @click.stop="handlerDeleteVariable(i)" />
              {{ variable.name }}
            </el-button>
            <el-button @click="addVisible = true">
              +添加变量
            </el-button>
          </div>
          <el-button
            class="formula-test-btn"
            size="large"
            type="warning"
            :disabled="!realFormula.length"
            @click="handlerTestFormula">
            调试公式
          </el-button>
        </div>
      </div>
    </div>
    <el-drawer
      class="variable-dialog"
      title="新增变量"
      direction="btt"
      v-if="addVisible"
      :visible.sync="addVisible"
      :size="250"
      :modal-append-to-body="false"
      :wrapper-closable="false"
      :show-close="false">
      <sib-form
        cancel-text="取消"
        size="mini"
        :item-info="addItemInfo"
        :rules="addRules"
        @submit="handlerSubmitVariable"
        @reset="addVisible = false"
      />
    </el-drawer>
    <el-drawer
      class="variable-dialog test-variable-dialog"
      direction="btt"
      v-if="testVisible"
      :with-header="false"
      :visible.sync="testVisible"
      :size="336"
      :modal-append-to-body="false"
      :wrapper-closable="false"
      :show-close="false">
      <sib-form
        ref="testForm"
        :is-submit="false"
        :is-cancel="false"
        :item-info="testItemInfo"
      />
      <div class="test-formula">
        <span class="t-label">调试公式：</span>
        <span class="t-value">{{ this.realFormula.join('') }}</span>
      </div>
      <div class="test-result">
        <span class="t-label">调试结果：</span>
        <span class="t-value">{{ testResult }}</span>
      </div>
      <div class="test-btn-box">
        <el-button
          class="test-submit"
          type="primary"
          @click.native="handlerTest">
          开始调试
        </el-button>
        <el-button
          class="test-reset"
          @click.native="testVisible = false">
          关闭
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
    name: 'SibFormula',
    props: {
        delVariable: {
            type: Boolean,
            default: true,
        },
        variables: {
            type: Array,
            default: () => ([]),
        },
    },
    data() {
        return {
            operationSymbols: [
                {
                    symbol: '(',
                    class: 'operation mini-font',
                    operate: () => {
                        this.handlerOperateSymbol('(');
                    },
                },
                {
                    symbol: ')',
                    class: 'operation mini-font',
                    operate: () => {
                        this.handlerOperateSymbol(')');
                    },
                },
                {
                    symbol: 'C',
                    class: 'operation mini-font',
                    operate: () => {
                        this.formulaExhibition = [];
                        this.realFormula = [];
                        this.setCurrentNumber();
                        this.handlerInitMathjax();
                    },
                },
                {
                    symbol: '',
                    class: 'operation',
                    render: `<div class="symbol-backspace">
                      <div class="backspace-icon-l"></div>
                      <div class="backspace-icon-r">x</div>
                    </div>`,
                    operate: () => {
                        const { isVariable, number } = this.currentNumber;
                        if (isVariable) {
                            this.setCurrentNumber();
                            return;
                        }
                        const res = String(number).split('');
                        if (res.length) {
                            res.pop();
                            this.setCurrentNumber({ number: res.join('') });
                            return;
                        }

                        this.formulaExhibition.pop();
                        this.realFormula.pop();
                        this.handlerInitMathjax();
                    },
                },
                {
                    symbol: '%',
                    class: 'operation mini-font',
                    operate: () => {
                        if (this.isMultistepOperate) return;
                        const { number, label } = this.currentNumber;
                        const realStr = `(${number || 0} / 100)`;
                        const markStr = `${label || number || 0}\\%`;
                        this.handlerAssemble(realStr, markStr);
                    },
                },
                {
                    symbol: 'π',
                    class: 'operation mini-font',
                    operate: () => {
                        if (this.isMultistepOperate) return;
                        const { number, label } = this.currentNumber;
                        const realStr = `(${number || 1} * Math.PI)`;
                        const markStr = `${label || number}π`;
                        this.handlerAssemble(realStr, markStr);
                    },
                },
                {
                    symbol: 'sin(x)',
                    class: 'operation mini-font',
                    operate: () => {
                        if (this.isMultistepOperate) return;
                        const { number, label } = this.currentNumber;
                        const realStr = `Math.sin(${number || 0})`;
                        const markStr = `sin(${label || number || 0})`;
                        this.handlerAssemble(realStr, markStr);
                    },
                },
                {
                    symbol: 'cos(x)',
                    class: 'operation mini-font',
                    operate: () => {
                        if (this.isMultistepOperate) return;
                        const { number, label } = this.currentNumber;
                        const realStr = `Math.cos(${number || 0})`;
                        const markStr = `cos(${label || number || 0})`;
                        this.handlerAssemble(realStr, markStr);
                    },
                },
                {
                    symbol: 'x²',
                    class: 'operation mini-font',
                    operate: () => {
                        if (this.isMultistepOperate) return;
                        const { number, label } = this.currentNumber;
                        const realStr = `(${number || 0} ** 2)`;
                        const markStr = `${label || number || 0}^2`;
                        this.handlerAssemble(realStr, markStr);
                    },
                },
                {
                    symbol: 'xⁿ',
                    class: 'operation mini-font',
                    operate: () => {
                        if (this.isMultistepOperate) return;
                        const { number, label } = this.currentNumber;
                        const realStr = `(${number || 0} ** `;
                        const markStr = `${label || number || 0}^`;
                        this.handlerAssemble(realStr, markStr);
                        this.isMultistepOperate = true;
                    },
                },
                {
                    symbol: '²√x',
                    class: 'operation mini-font',
                    operate: () => {
                        if (this.isMultistepOperate) return;
                        const { number, label } = this.currentNumber;
                        const realStr = `Math.sqrt(${number || 0})`;
                        const markStr = `\\sqrt[2]{${label || number || 0}}`;
                        this.handlerAssemble(realStr, markStr);
                    },
                },
                {
                    symbol: '÷',
                    class: 'operation large-font',
                    operate: () => {
                        this.handlerOperateSymbol('÷');
                    },
                },
                {
                    symbol: '7',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '8',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '9',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '×',
                    class: 'operation large-font',
                    operate: () => {
                        this.handlerOperateSymbol('×');
                    },
                },
                {
                    symbol: '4',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '5',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '6',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '－',
                    class: 'operation large-font',
                    operate: () => {
                        this.handlerOperateSymbol('－');
                    },
                },
                {
                    symbol: '1',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '2',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '3',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '＋',
                    class: 'operation large-font',
                    operate: () => {
                        this.handlerOperateSymbol('＋');
                    },
                },
                {
                    symbol: '±',
                    class: 'number font-normal',
                    operate: () => {
                        const { isVariable, number } = this.currentNumber;
                        if (isVariable) {
                            const arr = number.split('');
                            // eslint-disable-next-line no-unused-expressions
                            arr.includes('-') ? arr.shift() : arr.unshift('-');
                            this.setCurrentNumber({ number: arr.join('') });
                            return;
                        }
                        if (Number(number)) this.setCurrentNumber({ number: String(-Number(number)) });
                    },
                },
                {
                    symbol: '0',
                    type: 'digit',
                    class: 'number',
                },
                {
                    symbol: '.',
                    class: 'number',
                    operate: () => {
                        const { isVariable, number: cNumber } = this.currentNumber;
                        if (isVariable) return;
                        if (cNumber.includes('.')) return;
                        const number = cNumber ? `${cNumber}.` : '0.';
                        this.setCurrentNumber({ number });
                    },
                },
                {
                    symbol: '完成',
                    class: 'operation large-font equal',
                    operate: () => {
                        const number = ['+', '-', '*', '/'].includes(this.realFormula[this.realFormula.length - 1]) ? (this.currentNumber.number || '0') : '';
                        this.handlerAssemble(number, this.currentNumber.label);

                        const relyVariables = this.variableList.filter(({ key }) => this.realFormula.some((d) => d && d.includes(key)));
                        const functionString = '(_data) => {\n'
                            .concat(relyVariables.map(({ key }) => `const ${key}=_data.${key} || 0;`).join('\n'))
                            .concat(`\nconst _res = ${this.realFormula.join('') || 0};`)
                            .concat('\nreturn window.SIB ? window.SIB.repairAccuracy(_res) : _res;')
                            .concat('\n}');
                        const emitData = {
                            functionString,
                            formula: this.realFormula.join(''),
                            mathjax: this.formulaExhibition.join(''),
                        };
                        this.$emit('complete', emitData);
                    },
                },
            ],
            // 当前的运算表达式展示字符
            formulaExhibition: [],
            // 当前的运算表达式公式
            realFormula: [],
            // 当前的数值
            currentNumber: {
                // 是否为变量
                isVariable: false,
                // 名称
                label: '',
                // 值
                number: '',
                // 表达式
                expression: '',
            },
            isMultistepOperate: false,
            variableList: this.variables,
            addVisible: false,
            addItemInfo: [
                {
                    label: '变量名',
                    code: 'name',
                    type: 'text',
                    maxlength: 5,
                    required: true,
                },
                {
                    label: '运算code',
                    code: 'key',
                    type: 'text',
                    valueType: 'letter',
                    required: true,
                },
            ],
            addRules: {
                key: [
                    {
                        validator: (rule, value, callback) => {
                            if (this.variableList.some((d) => d.key === value)) {
                                callback(new Error(`已存在运算code为 ${value} 的变量`));
                                return;
                            }
                            callback();
                        },
                        trigger: 'blur',
                    },
                ],
            },
            // 调试弹窗
            testVisible: false,
            testItemInfo: [],
            testResult: '',
        };
    },
    methods: {
        setCurrentNumber(obj = {}) {
            const {
                isVariable = false,
                label = '',
                number = '',
                expression = '',
            } = obj;
            this.currentNumber = {
                isVariable, label, number, expression,
            };
        },
        // 按键触发的事件
        handlerTouchKey(symbol) {
            // 按数字键
            if (symbol.type === 'digit') {
                const { isVariable, number } = this.currentNumber;
                if (isVariable) return;
                let res = `${number}${symbol.symbol}`;
                const index = res.indexOf('.');
                if ((index > -1 && res[index - 1] !== '0') || index < 0) {
                    res = res.replace(/\b(0+)/gi, '');
                }
                if (res.length <= 16) {
                    this.setCurrentNumber({ number: res });
                }
                return;
            }
            // 按其他键
            if (symbol.operate) {
                symbol.operate(symbol);
                return;
            }
            this.handlerAssemble(symbol.symbol);
        },
        handlerMultistepOperate() {
            if (this.isMultistepOperate) {
                const { number, label } = this.currentNumber;
                this.realFormula.push(`${number || 0})`);
                this.formulaExhibition.push(`{${label || number || 0}}`);
                this.isMultistepOperate = false;
                this.setCurrentNumber();
            }
        },
        // 操作运算符（+、-、*、/）的逻辑
        handlerOperateSymbol(symbol) {
            this.handlerMultistepOperate();
            const { number, label } = this.currentNumber;
            if (number) {
                this.realFormula.push(number);
                this.formulaExhibition.push(label || number);
            }
            if (symbol) {
                this.realFormula.push(({
                    '＋': '+',
                    '－': '-',
                    '×': '*',
                    '÷': '/',
                })[symbol] || symbol);
                this.formulaExhibition.push(symbol);
            }
            this.setCurrentNumber();
            this.handlerInitMathjax();
        },
        // 组装表达式
        handlerAssemble(realStr, markStr) {
            this.handlerMultistepOperate();
            if (realStr) {
                this.realFormula.push(realStr);
                this.formulaExhibition.push(markStr || realStr);
            }
            this.setCurrentNumber();
            this.handlerInitMathjax();
        },
        handlerSubmitVariable(form, cb) {
            this.variableList.push(form);
            this.addVisible = false;
            cb();
        },
        handlerChooseVariable({ name, key }) {
            if (this.currentNumber.number === key) return;
            if (!this.isMultistepOperate) this.handlerAssemble();
            this.setCurrentNumber({ isVariable: true, number: key, label: name });
        },
        handlerDeleteVariable(index) {
            const key = this.variableList[index].key;
            this.variableList.splice(index, 1);
            if (this.realFormula.some((d) => d && d.includes(key))) {
                this.formulaExhibition = [];
                this.realFormula = [];
                this.setCurrentNumber();
                this.handlerInitMathjax();
            }
        },
        // 打开调试公式弹窗
        handlerTestFormula() {
            const number = ['+', '-', '*', '/'].includes(this.realFormula[this.realFormula.length - 1]) ? (this.currentNumber.number || '0') : '';
            this.handlerAssemble(number, this.currentNumber.label);
            const relyVariables = this.variableList.filter(({ key }) => this.realFormula.some((d) => d && d.includes(key)));
            this.testItemInfo = relyVariables.map(({ name, key }) => ({
                label: name,
                code: key,
                type: 'number',
                value: 1,
            }));
            this.testResult = '';
            this.testVisible = true;
        },
        handlerTest() {
            let res = '';
            try {
                const functionString = '(_data) => {\n'
                    .concat(this.testItemInfo.map(({ code }) => `const ${code}=_data.${code};`).join('\n'))
                    .concat(`\nreturn ${this.realFormula.join('')};`)
                    .concat('\n}');
                // eslint-disable-next-line no-eval
                res = eval(functionString)(this.$refs.testForm.currentForm);
                this.testResult = window.SIB ? window.SIB.repairAccuracy(res) : res;
            } catch (error) {
                this.testResult = error;
            }
        },
        // 渲染公式
        handlerInitMathjax() {
            const dom = this.$el.querySelector('#formula');
            const text = this.formulaExhibition.join('');
            if (!text) {
                dom.innerHTML = '';
                return;
            }
            dom.style.opacity = '0';
            dom.innerHTML = `\\(${text}\\)`;
            if (this.$globalVariable.isMathjaxConfig) this.$globalVariable.initMathjaxConfig();
            this.$globalVariable.MathQueue(dom);
            setTimeout(() => {
                dom.style.opacity = '1';
                dom.scrollTo(9999, 0);
            }, 250);
        },
    },
};
</script>
