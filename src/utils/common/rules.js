/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
const rules = {
    // 手机号码
    isMobilePhone: (value) => value && /^[1][3,4,5,6,7,8,9][0-9]{9}$|^\s*$/.test(value),
    // 座机号码
    isTelephone: (value) => value && /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value),
    // 邮箱
    isEmail: (value) => value && /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value),
    // URL
    isURL: (value) => {
        const strRegex = '^((https|http|ftp|rtsp|mms)?://)'
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
            + '(([0-9]{1,3}\.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
            + '|' // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' // 二级域名
            + '[a-z]{2,6})' // first level domain- .com or .museum
            + '(:[0-9]{1,4})?' // 端口- :80
            + '((/?)|' // a slash isn't required if there is no file name
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        return (new RegExp(strRegex)).test(value);
    },
    verificationRules: {
      // 4到20位,只能包含字母、数字和下划线
      checkUsername: (value) => value && /^[a-zA-Z0-9_]{4,20}$/.test(value),
      // 以字母开头，长度在6位以上，只能包含字母、数字和下划线
      checkPassword: (value) => value && /^[a-zA-Z]\w{5,}$/.test(value),
      // 以字母开头，只能包含字母、数字和下划线
      checkCode: (value) => value && /^[a-zA-Z]\w{0,}$/.test(value),
    },
    /*
      1.身份证号合法性验证
      2.支持15位和18位身份证号
      3.支持地址编码、出生日期、校验位验证

      根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
      地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
      出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
      顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
      校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

      出生日期计算方法。
          15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
          2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
      下面是正则表达式:
      出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
      身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
      15位校验规则 6位地址编码+6位出生日期+3位顺序号
      18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

      校验位规则
      公式:∑(ai×Wi)(mod 11)……………………………………(1)
      公式(1)中：
      i----表示号码字符从由至左包括校验码在内的位置序号；
      ai----表示第i位置上的号码字符值；
      Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
      i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
      Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
    */
    isIdentityCode(code) {
        const city = {
            11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外',
        };
        let tip = '';
        let pass = true;
        if (typeof code !== 'string') {
            console.error('身份证号必须为 String');
            return false;
        }

        if (!code || !/^(\d{15})(\d{2}[0-9xX])?$/.test(code)) {
            tip = '身份证号长度错误';
            pass = false;
        } else if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/i.test(code)) {
            tip = '身份证号格式错误';
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            tip = '地址编码错误';
            pass = false;
        } else if (code.length === 18) {
            // 18位身份证需要验证最后一位校验位
            code = code.split('');
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            // 校验位
            const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < 17; i++) {
                ai = Number(code[i]);
                wi = factor[i];
                sum += ai * wi;
            }
            if (String(parity[sum % 11]) !== code[17].toUpperCase()) {
                tip = '校验位错误';
                pass = false;
            }
        }
        // if (!pass) return tip;
        if (tip) console.error(tip);
        return pass;
    },
};

export default rules;
