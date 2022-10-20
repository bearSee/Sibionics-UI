import deepCopy from './deepCopy';
import certainDate from './certainDate';
import download from './download';
import getuuid from './uuid';
import rules from './rules';
import formatMoney from '../../filters/formatMoney';
import formatDate from '../../filters/formatDate';

/* eslint-disable */

window.SIB = {
  ...rules,
  ...certainDate,
  download,
  getuuid,
  deepCopy: (object) => object && deepCopy(object) || {},
  formatMoney,
  formatDate,
  // 数值计算精度处理
  repairAccuracy: (number, precision = 10) => {
    if (!Number(number)) return number;
    // 去除小数点后无意义的0
    const reg = /(?:\.0*|(\.\d+?)0+)$/;
    // 值为科学计数法的值时
    if (String(number).includes('e')) {
        const numberStrArr = String(number).split('e');
        // 值总长度超过10个长度时，则将科学计数法展示的值只保留6位有效小数位
        if (numberStrArr[0].length > precision + 5) return Number(`${Number(numberStrArr[0]).toFixed(precision).replace(reg, '$1')}e${numberStrArr[1]}`);
        // 值总长度不超过10个长度时，则将科学计数法展示的值直接返回
        return Number(number);
    }
    // number为常规值时，过滤小数点后无意义的0
    return Number(Number(number).toFixed(precision).replace(reg, '$1'));
  },
};

// 全局时间格式化方法
String.prototype.formatTime = function (template) {
  template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
  const arr = this.match(/\d+/g) || [];
  template = template.replace(/\{(\d+)\}/g, function () {
    // eslint-disable-next-line prefer-rest-params
    const n = arguments[1];
    return arr[n] || '00';
  });
  return template;
};

// 重写toFixed方法修复精度丢失的bug
Number.prototype.toFixed = function (n) {
  // n为期望保留的位数，超过限定，报错！
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  // 获取数字
  let number = this;
  // 如果是NaN,或者数字过大，直接返回'NaN'或者类似'1e+21'的科学计数法字符串
  if (Number.isNaN(number) || number >= 10 ** 21) {
    return number.toString();
  }
  // 默认保留整数
  if (typeof n === 'undefined' || n === 0) {
    return (Math.round(number)).toString();
  }
  if (Math.abs(number) <= 10 ** -(n + 1)) {
    number = 0;
  }

  // 先获取字符串
  let result = number.toString();
  // 获取小数部分
  const arr = result.split('.');

  // 整数的情况，直接在后面加上对应个数的0即可
  if (arr.length < 2) {
    result += '.';
    for (let i = 0; i < n; i += 1) {
      result += '0';
    }
    return result;
  }

  // 整数和小数
  const integer = arr[0];
  const decimal = arr[1];
  // 如果已经符合要求位数，直接返回
  if (decimal.length === n) {
    return result;
  }
  // 如果小于指定的位数，补上
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0';
    }
    return result;
  }
  // 如果到这里还没结束，说明原有小数位多于指定的n位
  // 先直接截取对应的位数
  result = `${integer}.${decimal.substr(0, n)}`;
  // 获取后面的一位
  let last = decimal.substr(n, 1);
  if (/^\d(9){5,}[89]$/.test(decimal.substr(n))) {
    last += last + 1;
  }
  // 大于等于5统一进一位
  if (parseInt(last, 10) >= 5) {
    // 转换倍数，转换为整数后，再进行四舍五入
    const x = 10 ** n;
    // 进一位后，转化还原为小数
    result = (Math.round((parseFloat(result) * x)) + 1) / x;
    // 再确认一遍
    result = result.toFixed(n);
  }

  return result;
};

JSON.parseAll = function (obj) {
  return JSON.parse(obj || '{}', (key, value) => {
    // eslint-disable-next-line no-eval
    if (value.includes && (value.includes('function') || value.includes('=>'))) return eval(`(function(){return ${value} })()`);
    return value;
  });
};

JSON.stringifyAll = function (obj) {
  return JSON.stringify(obj || {}, (key, val) => typeof val === 'function' && `${val}` || val);
};