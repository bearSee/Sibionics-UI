// 数值计算精度处理
const repairAccuracy = (number, precision = 10) => {
    // 去除小数点后无意义的0
    const reg = /(?:\.0*|(\.\d+?)0+)$/;
    // 值为科学计数法的值时
    if (String(number).includes('e')) {
        const numberStrArr = String(number).split('e');
        // 值总长度超过10个长度时，则将科学计数法展示的值只保留6位有效小数位
        if (numberStrArr[0].length > 10) return `${Number(numberStrArr[0]).toFixed(6).replace(reg, '$1')}e${numberStrArr[1]}`;
        // 值总长度不超过10个长度时，则将科学计数法展示的值直接返回
        return String(number);
    }
    // number为常规值时，过滤小数点后无意义的0
    return number.toFixed(precision).replace(reg, '$1');
};

/**
 * 实例方法/属性: 所有实例都有, 以构造函数为模板 (constructor内绑在this上的方法)
 * 原型方法/属性: 所有实例共享, 通过原型链指向 (与constructor方法同一层级的其他方法)
 * 静态方法/属性: 为构造函数特有, 实例不会有 (与constructor方法同一层级的前缀追加static标识的其他方法)
 */
class Calculator {
    constructor($el, config) {
        const {
            // 是否允许点击结果值时，将值复制到粘贴板
            copyValue = true,
            // 是否展示计算记录面板
            showHistory = true,
            // 计算完成时触发的事件，参数为 Number 类型的值
            computeFinish,
            // 点击计算结果值触发的事件，参数为 Number 类型的值
            chooseResult,
            // 点击计算记录面板内的记录值触发的事件，参数为 Number 类型的值
            chooseNumber,
        } = config || {};

        Object.assign(this, {
            $el: typeof $el === 'string' ? (document && document.getElementById($el) || null) : $el,
            copyValue,
            showHistory,
            computeFinish: typeof computeFinish === 'function' ? computeFinish : (() => {}),
            chooseResult: typeof chooseResult === 'function' ? chooseResult : (() => {}),
            chooseNumber: typeof chooseNumber === 'function' ? chooseNumber : (() => {}),
            // 按键配置
            operationSymbols: [
                {
                    symbol: '%',
                    class: 'operation mini-font',
                    operate: () => {
                        const currentResult = Number(this.currentResult) || 0;
                        this.currentResult = `${repairAccuracy(currentResult / 100, 11)}`;
                        // 更新计算结果展示
                        this.updateResultString();
                        const lastProcessString = this.lastSymbolObject ? `${this.lastResult || ''} ${this.lastSymbolObject.symbol || ''}` : '';
                        this.handlerCompute(() => {
                            // 更新计算过程展示
                            this.updateProcessString(lastProcessString ? `${lastProcessString} (${currentResult} ÷ 100)` : `${currentResult} ÷ 100`);
                        });
                        this.isFinishComputed = true;
                        this.handlerStorageProcessNum(currentResult);
                        this.handlerStorageResultNum(this.currentResult);
                        this.computeFinish(Number(this.currentResult));
                    },
                },
                {
                    symbol: 'CE',
                    class: 'operation mini-font',
                    operate: () => {
                        if (this.isFinishComputed) {
                            this.lastResult = '';
                            this.lastSymbolObject = null;
                            // 更新计算过程展示
                            this.updateProcessString('');
                        }
                        this.currentResult = '0';
                        // 更新计算结果展示
                        this.updateResultString();
                        this.computeFinish(Number(this.currentResult));
                    },
                },
                {
                    symbol: 'C',
                    class: 'operation mini-font',
                    operate: () => {
                        this.lastResult = '';
                        this.currentResult = '0';
                        this.lastSymbolObject = null;
                        // 更新计算结果展示
                        this.updateResultString();
                        // 更新计算过程展示
                        this.updateProcessString('');
                        this.computeFinish(Number(this.currentResult));
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
                        const res = String(this.currentResult).split('');
                        res.pop();
                        if (!res.length || (res.length === 1 && res[0] === '-') || this.isComputing || this.isFinishComputed) {
                            this.currentResult = '0';
                            // 更新计算结果展示
                            this.updateResultString();
                            // 更新计算过程展示
                            if (this.isFinishComputed) this.updateProcessString('');
                            return;
                        }
                        this.currentResult = res.join('');
                        // 更新计算结果展示
                        this.updateResultString();
                        this.computeFinish(Number(this.currentResult));
                    },
                },
                {
                    symbol: '¹/x',
                    class: 'operation mini-font',
                    operate: () => {
                        const currentResult = Number(this.currentResult) || 0;
                        if (currentResult === 0) {
                            this.switchErrorDialogShow(true);
                            return;
                        }
                        this.currentResult = `${repairAccuracy(1 / currentResult, 11)}`;
                        const lastProcessString = this.lastSymbolObject ? `${this.lastResult || ''} ${this.lastSymbolObject.symbol || ''}` : '';
                        this.handlerCompute(() => {
                            // 更新计算过程展示
                            this.updateProcessString(lastProcessString ? `${lastProcessString} (1 ÷ ${currentResult})` : `1 ÷ ${currentResult}`);
                        });
                        this.isFinishComputed = true;
                        this.handlerStorageProcessNum(currentResult);
                        this.handlerStorageResultNum(this.currentResult);
                        // 更新计算结果展示
                        this.updateResultString();
                        this.computeFinish(Number(this.currentResult));
                    },
                },
                {
                    symbol: 'x²',
                    class: 'operation mini-font',
                    operate: () => {
                        const currentResult = Number(this.currentResult) || 0;
                        this.currentResult = `${repairAccuracy(currentResult ** 2, 11)}`;
                        const lastProcessString = this.lastSymbolObject ? `${this.lastResult || ''} ${this.lastSymbolObject.symbol || ''}` : '';
                        this.handlerCompute(() => {
                            // 更新计算过程展示
                            this.updateProcessString(`${lastProcessString} ${currentResult}²`);
                        });
                        this.isFinishComputed = true;
                        this.handlerStorageProcessNum(currentResult);
                        this.handlerStorageResultNum(this.currentResult);
                        // 更新计算结果展示
                        this.updateResultString();
                        this.computeFinish(Number(this.currentResult));
                    },
                },
                {
                    symbol: '²√x',
                    class: 'operation mini-font',
                    operate: () => {
                        const currentResult = Number(this.currentResult) || 0;
                        this.currentResult = `${repairAccuracy(Math.sqrt(currentResult), 11)}`;
                        const lastProcessString = this.lastSymbolObject ? `${this.lastResult || ''} ${this.lastSymbolObject.symbol || ''}` : '';
                        this.handlerCompute(() => {
                            // 更新计算过程展示
                            this.updateProcessString(`${lastProcessString} ²√${currentResult}`);
                        });
                        this.isFinishComputed = true;
                        this.handlerStorageProcessNum(currentResult);
                        this.handlerStorageResultNum(this.currentResult);
                        // 更新计算结果展示
                        this.updateResultString();
                        this.computeFinish(Number(this.currentResult));
                    },
                },
                {
                    symbol: '÷',
                    class: 'operation large-font',
                    operate: (obj) => {
                        this.handlerOperateSymbol(obj);
                    },
                    asyncSymbolOperateVal: () => {
                        const lastResult = Number(this.lastResult) || 0;
                        const currentResult = Number(this.currentResult) || 0;
                        if (currentResult === 0) return 'Error';
                        return `${repairAccuracy(lastResult / currentResult)}`;
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
                    operate: (obj) => {
                        this.handlerOperateSymbol(obj);
                    },
                    asyncSymbolOperateVal: () => {
                        const lastResult = Number(this.lastResult) || 0;
                        const currentResult = Number(this.currentResult) || 0;
                        return `${repairAccuracy(lastResult * currentResult)}`;
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
                    operate: (obj) => {
                        this.handlerOperateSymbol(obj);
                    },
                    asyncSymbolOperateVal: () => {
                        const lastResult = Number(this.lastResult) || 0;
                        const currentResult = Number(this.currentResult) || 0;
                        return `${repairAccuracy(lastResult - currentResult)}`;
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
                    operate: (obj) => {
                        this.handlerOperateSymbol(obj);
                    },
                    asyncSymbolOperateVal: () => {
                        const lastResult = Number(this.lastResult) || 0;
                        const currentResult = Number(this.currentResult) || 0;
                        return `${repairAccuracy(lastResult + currentResult)}`;
                    },
                },
                {
                    symbol: '±',
                    class: 'number font-normal',
                    operate: () => {
                        const res = Number(this.currentResult);
                        if (res) {
                            this.currentResult = String(-res);
                            // 更新计算结果展示
                            this.updateResultString();
                        }
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
                        let res = `${(this.isFinishComputed || this.isComputing || this.isShowHistory ? 0 : this.currentResult)}`;
                        if (res.includes('.')) return;
                        res = res ? `${res}.` : '0.';
                        this.opreateAfterTouchKey(res);
                    },
                },
                {
                    symbol: '＝',
                    class: 'operation large-font equal',
                    operate: () => {
                        this.handlerCompute();
                        this.isFinishComputed = true;
                    },
                },
            ],
            // 计算过程的值列表
            processNumbers: [],
            // 计算结果的值列表
            resultNumbers: [],
            // 是否处于待计算状态，控制用户在连续点击运算符时，不会重复计算
            isComputing: false,
            // 一轮计算是否结束，控制点击数字时是否需要先清空再拼接数字
            isFinishComputed: false,
            // 当前是否为展示历史数值
            isShowHistory: false,
            // 上一个运算符对象
            lastSymbolObject: null,
            // 上一个保存的值
            lastResult: '',
            // 当前输入的值
            currentResult: '0',
            // 计算过程信息
            processString: '',
            // 展示计算过程的dom
            processStringDom: null,
            // 展示计算结果的dom
            resultStringDom: null,
        });

        this.createElement();
    }

    // 按键触发的事件
    handlerTouchKey(symbol) {
        // 按数字键
        if (symbol.type === 'digit') {
            let res = `${(this.isComputing || this.isFinishComputed || this.isShowHistory ? '0' : this.currentResult)}${symbol.symbol}`;
            const index = res.indexOf('.');
            if ((index > -1 && res[index - 1] !== '0') || index < 0) {
                res = res.replace(/\b(0+)/gi, '');
            }
            this.opreateAfterTouchKey(res);
            return;
        }
        // 按其他键
        if (symbol.operate) symbol.operate(symbol);
    }

    // 按了数字键之后的操作逻辑
    opreateAfterTouchKey(num) {
        // if (Number(num) > 999999999.99 || num.length > 16) return;
        if (num.length > 16) return;
        this.currentResult = num || '0';
        this.isComputing = false;
        // 按下数字键时，上一步若为完成一轮计算的状态，则改变完成状态，清除计算过程
        if (this.isFinishComputed) {
            this.isFinishComputed = false;
            // 更新计算过程展示
            this.updateProcessString('');
        }
        // 按下数字键时，上一步若为展示历史计算记录的状态，则改变完成状态，清除计算过程
        if (this.isShowHistory) {
            this.isShowHistory = false;
            // 更新计算过程展示
            this.updateProcessString('');
        }
        // 更新计算结果展示
        this.updateResultString();
    }

    // 操作运算符（+、-、*、/）的逻辑
    handlerOperateSymbol(obj) {
        if (!this.isComputing) this.handlerCompute();
        this.isComputing = true;
        this.isFinishComputed = false;
        this.isShowHistory = false;
        this.lastSymbolObject = obj;
        this.lastResult = this.currentResult;
        this.handlerStorageProcessNum(this.lastResult);
        // 更新计算过程展示
        this.updateProcessString(`${this.lastResult} ${obj.symbol} `);
    }

    // 存储计算过程的值
    handlerStorageProcessNum(num) {
        if (this.processNumbers.find(({ number }) => number === String(num))) return;
        this.processNumbers.unshift({ number: String(num), processString: '' });
        // 更新计算过程值和结果的列表
        this.updateProcessList();
    }

    // 存储计算结果的值
    handlerStorageResultNum(num) {
        if (this.resultNumbers.find(({ number }) => number === String(num))) return;
        this.resultNumbers.unshift({ number: String(num), processString: this.processString });
        // 更新计算过程值和结果的列表
        this.updateProcessList();
    }

    // 点击计算过程/计算结果列表的值触发的逻辑
    handlerChooseNum({ number, processString }) {
        this.currentResult = number;
        // 抛出点击计算过程/计算结果列表的回调方法
        this.chooseNumber(Number(this.currentResult || 0));
        // 已完成上一轮计算，点击时仅为预览之前的计算时
        if (!this.lastSymbolObject) {
            // 更新计算过程展示
            this.updateProcessString(processString);
            this.isShowHistory = true;
        }
        this.isComputing = false;
        this.updateResultString();
    }

    // 计算过程的逻辑
    handlerCompute(callback) {
        // 若上一个操作符对象不存在，则不计算
        if (!this.lastSymbolObject) {
            if (callback) callback();
            return;
        }
        // 从上一个操作符对象中获取具体计算方法
        const { asyncSymbolOperateVal, symbol } = this.lastSymbolObject;
        // 将当前展示的值记录存到临时变量
        const lastResult = this.currentResult;
        // 根据具体计算方法获取最新结果值
        const newResult = asyncSymbolOperateVal && asyncSymbolOperateVal() || 0;
        // 除数为0等错误发生时，中断计算，抛出错误弹窗
        if (newResult === 'Error') {
            this.currentResult = newResult;
            // 更新计算结果展示
            this.updateResultString();
            // 展示错误弹窗
            this.switchErrorDialogShow(true);
            return;
        }
        // 更新计算过程展示
        this.updateProcessString(`${this.lastResult} ${symbol} ${this.currentResult}`);
        // 修改上一次的结果值
        this.lastResult = lastResult;
        // 修改最新结果值
        this.currentResult = newResult;
        // 清除上一个计算的操作符对象
        this.lastSymbolObject = null;
        // 存储计算过程值
        this.handlerStorageProcessNum(lastResult);
        // 存储计算结果值
        this.handlerStorageResultNum(newResult);
        // 更新计算结果展示并动态调整计算结果的字号
        this.updateResultString();
        // 抛出计算完成的回调方法
        this.computeFinish(Number(newResult));
        if (callback) callback();
    }

    // 点击计算结果值，将值复制到粘贴板
    handlerCopy() {
        // 抛出点击计算结果值的回调方法
        this.chooseResult(Number(this.currentResult || 0));
        if (!this.copyValue) return;
        const copyBox = document.createElement('input');
        document.body.append(copyBox);
        copyBox.value = this.currentResult || 0;
        copyBox.focus();
        copyBox.select();
        try {
            document.execCommand('copy');
            this.showToast('已将结果复制到粘贴板');
        } catch (error) {
            console.error("浏览器不支持document.execCommand('copy')");
        }
        copyBox.blur();
        document.body.removeChild(copyBox);
    }

    // 处理异常计算
    handlerError() {
        // 关闭错误弹窗
        this.switchErrorDialogShow(false);
        this.lastResult = '';
        this.currentResult = '0';
        // 更新计算结果展示
        this.updateResultString();
        // 清空上一次操作符对象
        this.lastSymbolObject = null;
    }

    // 删除记录列表的数据
    handlerDeleteHistory(origin, i) {
        this[origin].splice(i, 1);
        // 更新计算过程值和结果的列表
        this.updateProcessList();
    }

    // 创建dom
    createElement() {
        if (!this.$el) {
            console.error('挂载实例的dom节点找不到，请确保传入正确的节点id或节点元素');
            return;
        }
        const ContainerString = `
            <div class="calculator ${this.showHistory && 'show-history' || ''}">
                <div class="calculator-container">
                    <div class="container-header">
                        <div class="header-process">${this.processString}</div>
                        <div class="header-result">
                            <div class="result-num" title="点击复制结果">${this.currentResult}</div>
                        </div>
                    </div>
                    <div class="container-operation">
                        ${this.operationSymbols.map((symbol, index) => `
                            <div class="symbol-key symbol symbol-${symbol.class}" data-index="${index}">
                                ${symbol.symbol ? `<span >${symbol.symbol}</span>` : `<div class="symbol-render">${symbol.render}</div>`}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ${this.showHistory ? '<div class="calculator-history"></div>' : ''}
                <div class="error-dialog" style="display:none;">
                    <div class="error-container">
                        <div class="error-content">计算值输入错误</div>
                        <div class="error-btn">重新输入</div>
                    </div>
                </div>
                <div class="info-toast" style="display:none;"></div>
            </div>
        `;
        this.$el.innerHTML = ContainerString;
        this.processStringDom = this.$el.querySelector('.header-process');
        this.resultStringDom = this.$el.querySelector('.result-num');
        // 创建计算过程值和结果的列表
        this.updateProcessList();
        this.createEvents();
    }

    // 更新计算过程值和结果的列表
    updateProcessList() {
        const historyDom = this.$el.querySelector('.calculator-history');
        if (!historyDom) return;

        const valueListDomString = [
            { key: 'processNumbers', title: '计算过程值' },
            { key: 'resultNumbers', title: '计算结果' },
        ].map(({ key, title }) => `
            <div class="process-number">
                <div class="history-title">${title}</div>
                <div class="history-number-box vertical-scroll">
                    ${this[key].map((obj, index) => `
                        <li title="点击选择 ${obj.number}">
                            <span class="h-num">${obj.number}</span>
                            <span class="h-mark"
                                title="删除该条记录"
                                data-origin="${key}"
                                data-index="${index}">+
                            </span>
                        </li>
                    `).join('')}
                </div>
            </div>
        `).join('');
        historyDom.innerHTML = valueListDomString;

        const lists = historyDom.querySelectorAll('.history-number-box > li > .h-num');
        const deles = historyDom.querySelectorAll('.history-number-box > li > .h-mark');
        Array(lists.length).fill().forEach((_, i) => {
            const { index, origin } = deles[i].dataset;
            lists[i].onclick = () => {
                this.handlerChooseNum.call(this, this[origin][index]);
            };
            deles[i].onclick = () => {
                this.handlerDeleteHistory.call(this, origin, index);
            };
        });
    }

    // 更新计算过程展示
    updateProcessString(text) {
        this.processString = text;
        if (this.processStringDom) this.processStringDom.innerText = text;
    }

    // 更新计算结果展示
    updateResultString() {
        if (!this.resultStringDom) return;
        this.resultStringDom.innerText = this.currentResult;
        setTimeout(() => {
            const resultDom = this.$el.querySelector('.header-result');
            const { width: resultWidth } = resultDom.getBoundingClientRect();
            const { width: sonWidth } = this.resultStringDom.getBoundingClientRect();
            const originScale = Number((this.resultStringDom.style.transform || '').replace(/[^0-9.]/ig, '') || '1');
            const scale = resultWidth / (sonWidth / originScale + 50);
            this.resultStringDom.style.transform = `scale(${scale < 1 ? scale : 1})`;
        }, 30);
    }

    // 创建相关点击事件
    createEvents() {
        // 点击结果复制内容到粘贴板
        this.resultStringDom.onclick = this.handlerCopy.bind(this);
        // 点击重新输入按钮关闭错误弹窗
        const errorBtn = this.$el.querySelector('.error-btn');
        errorBtn.onclick = this.handlerError.bind(this);
        // 按键逻辑
        const keys = this.$el.querySelectorAll('.symbol-key');
        Array(keys.length).fill().forEach((_, i) => {
            keys[i].onclick = () => {
                const { index } = keys[i].dataset;
                this.handlerTouchKey.call(this, this.operationSymbols[index]);
            };
        });
    }

    // 错误弹窗控制
    switchErrorDialogShow(show) {
        const errorDialog = this.$el.querySelector('.error-dialog');
        errorDialog.style.display = show && 'flex' || 'none';
    }

    // toast提示控制
    showToast(text) {
        const infoToast = this.$el.querySelector('.info-toast');
        infoToast.innerText = text;
        infoToast.style.display = 'block';
        setTimeout(() => {
            infoToast.style.display = 'none';
        }, 1000);
    }

    // 初始化
    init() {
        this.createElement();
    }

    // 销毁dom
    destroy() {
        Object.assign(this, {
            processNumbers: [],
            resultNumbers: [],
            isComputing: false,
            isFinishComputed: false,
            isShowHistory: false,
            lastSymbolObject: null,
            lastResult: '',
            currentResult: '0',
            processString: '',
        });
        this.$el.innerHTML = '';
    }
}

export default Calculator;
