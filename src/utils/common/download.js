function downloadUrl(url, fileName) {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadBlob(response, fileName) {
    const blob = response && response.data;
    if (!blob) return;
    fileName = fileName || (response.headers && response.headers['content-disposition'] || '').split('filename=')[1] || '';
    // 通过window.URL.createObjectURL(new Blob()) . indexOf(location.host) < 0 或 'msSaveOrOpenBlob' in navigator
    // 来检测是否是IE或早期生成Object URL不带域名的Edge。如果表达式返回true则时IE或Edge旧版本。
    if ('msSaveOrOpenBlob' in navigator) {
        // Microsoft Edge and Microsoft Internet Explorer 10-11
        window.navigator.msSaveOrOpenBlob(blob);
        return;
    }
    // standard code for Google Chrome, Mozilla Firefox etc
    const url = window.URL.createObjectURL(new Blob([blob]));
    downloadUrl(url, window.decodeURI(fileName));
}

export default function download(response, fileName) {
    if (Object.prototype.toString.call(response) === '[object String]') {
        downloadUrl(response, fileName || '');
        return;
    }
    downloadBlob(response, fileName);
}
