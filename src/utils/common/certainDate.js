import formatDate from '../../filters/formatDate';
/**
 * 获取日期
 * 例如: delay传-5,则返回往前5天的日期 delay传2,则返回今天之后2天的日期 不传或传0,则返回今天日期
 * @param {*} delay 往前/往后 n 天
 * @returns yyyy-MM-dd
 */
const getCertainDate = function (delay, format = 'YYYY-MM-DD') {
    const days = Number(delay) || 0;
    const date = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * days));
    const systemDate = formatDate(date, format);
    return systemDate;
};

const today = getCertainDate();
const yesterday = getCertainDate(-1);
const tomorrow = getCertainDate(1);

export default {
    // 获取日期
    getCertainDate,
    // 今天
    today,
    // 昨天
    yesterday,
    // 明天
    tomorrow,
};
