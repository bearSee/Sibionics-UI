import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js/crypto-js';

const NodeRSA = require('node-rsa');

const insertKey = (key, modifier, codeNum) => {
    let newKey = '';
    for (let i = 0; i < key.length; i += codeNum) {
        const tmp = key.substring(i, i + codeNum);
        newKey += (tmp + modifier);
    }
    return newKey;
};

// RSA公钥
const publicKey = (key) => `-----BEGIN PUBLIC KEY-----\n${insertKey(key || process.env.VUE_APP_PUBLIC_KEY || '', '\n', 64)}-----END PUBLIC KEY-----`;

// RSA公钥加密
const encryptRSA = (word, key) => {
    const secret = new JSEncrypt();
    secret.setPublicKey(publicKey(key));
    return secret.encrypt(word.toString());
};

// RSA公钥解密
const decryptRSA = (word, key) => (new NodeRSA(publicKey(key))).decryptPublic(word, 'utf8');

// AES加密
// type: Base64/Utf8
const encryptAES = (word, key, type = 'Base64') => {
    key = key || window.localStorage.getItem('key') || 'secret';
    const keys = (CryptoJS.enc[type] || CryptoJS.enc.Base64).parse(key);
    const encryptedWord = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(encryptedWord, keys, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
};

// AES解密
// type: Base64/Utf8
const decryptAES = (word, key, type = 'Base64') => {
    key = key || window.localStorage.getItem('key') || 'secret';
    const keys = (CryptoJS.enc[type] || CryptoJS.enc.Base64).parse(key);
    const decrypted = CryptoJS.AES.decrypt(word, keys, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

export {
    encryptRSA,
    decryptRSA,
    encryptAES,
    decryptAES,
};
