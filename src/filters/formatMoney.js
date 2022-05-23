/*
 * @Author: 熊望
 * @Date: 2022-01-05 22:37:33
 * @LastEditors: 熊望
 * @LastEditTime: 2022-01-05 22:44:14
 * @FilePath: /nginx/Users/bear/projects/project-bear/SIB-UI/src/filters/formatMoney.js
 * @Description:
 */
export default function formatMoney(s, n) {
  s = Number(s);
  if (Number.isNaN(s)) {
    return '0.00';
  }
  const isInt = n === 0;
  n = n > 0 && n <= 20 ? n : 2;
  s = `${parseFloat((`${s}`).replace(/,/g, '').replace(/[^\d.-]/g, '')).toFixed(n)}`;
  const l = s.split('.')[0].split('').reverse();
  const r = s.split('.')[1];
  let t = '';
  /* eslint-disable */
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length && l[i + 1] !== '-' ? ',' : '');
  }
  return `${t.split('').reverse().join('')}${isInt ? '' : `.${r}`}`;
}
