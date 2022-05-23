<template>
  <div class="plug-in-unit">
    <div
      class="code-box"
      v-for="(item, index) in data"
      :key="index">
      <h3>{{ $t(item.subTitle || '') }}</h3>
      <template v-if="item.des">
        <li
          v-for="d in item.des"
          :key="d">
          {{ $t(d) }}
        </li>
      </template>
      <pre>
        <code>{{ item.code }}</code>
      </pre>
    </div>
    <el-backtop target=".master-page" />
  </div>
</template>

<script>

export default {
    name: 'PlugInUnit',
    data() {
        return {
            data: [
                {
                    subTitle: 'import { encryptRSA, decryptRSA, encryptAES, decryptAES } from \'sibionics-ui/lib/utils/encryption\'',
                    des: [
                        '该插件提供了RSA公钥加密、RSA公钥解密、AES加密、AES解密四个方法',
                        '它们都接收两个参数，第一个为需要加密/解密的文字，第二个为密钥',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`import {
    // ${this.$t('RSA公钥加密')}
    encryptRSA,
    // ${this.$t('RSA公钥解密')}
    decryptRSA,
    // ${this.$t('AES加密')}
    encryptAES,
    // ${this.$t('AES解密')}
    decryptAES,
} from 'sibionics-ui/lib/utils/encryption'

const str1 = encryptAES('${this.$t('加密信息')}', key);

const str2 = decryptAES(str1, key); // '${this.$t('加密信息')}'`,
                },
            ],
        };
    },
};
</script>

<style lang="scss">

.plug-in-unit {
  .code-box {
    padding: 15px 0;
  }
  pre {
    display: flex;
  }
}
</style>
