<!-- 本地调试 -->

<template>
  <div class="test-component">
    <el-tabs v-model="componentName">
      <el-tab-pane
        v-for="component in components"
        :key="component.code"
        :label="component.name"
        :name="component.code" />
    </el-tabs>
    <component
      class="component"
      :is="componentName" />
  </div>
</template>

<script>
import { encryptAES, encryptRSA, decryptRSA } from '@/utils/encryption';
import localTable from './localTest/local-table';
import localForm from './localTest/local-form';
import localFormula from './localTest/local-formula';

// eslint-disable-next-line max-len
const sdkey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvDxv6PVKG/gcRLmpMjSkncTg6axl085TRNveLvxZWTe36m2NLBFaHQbpagu62zwOfh4rzsBIDynYTG8qc5AFn6M4jQXvPSmThQcWFg+kS30iD98X4UmtSLAzfysTnTITfdUKqT0kjPoGf1wDuWsoOopGDGaJZCYp/jFiYUWstGwIDAQAB';

const protocol = 'http://edc-api.dev.dc.sibionics.com';
const username = 'xw2';
const password = 'Xw13579';

window.testProtocol = protocol;
window.localStorage.setItem('sdkey', sdkey);

export default {
    name: 'TestComponent',
    components: {
        localTable,
        localForm,
        localFormula,
    },
    data() {
        return {
            componentName: 'localTable',
            components: [
                {
                    name: 'Table调试',
                    code: 'localTable',
                },
                {
                    name: 'Form调试',
                    code: 'localForm',
                },
                {
                    name: '公式配置调试',
                    code: 'localFormula',
                },
            ],
        };
    },
    beforeRouteEnter: async (to, from, next) => {
        const random = Math.ceil(Math.random() * 0x1000);
        const sd = encryptRSA(random, sdkey);
        await window.axios.get(`${protocol}/edc-auth/secretKey`, { headers: { sd } }).then(
            (res) => {
                // RSA公钥解密
                const key = decryptRSA(res.data.data, sdkey);
                // RSA解密后的密钥存储到本地
                window.localStorage.setItem('key', key);

                window.axios.post(`${protocol}/edc-auth/auth/login`, {
                    username,
                    password: encryptAES(password),
                    // 客户端类型，101：后台管理系统 web，201：手机 APP
                    clientType: 101,
                    loginSysId: 1,
                }).then((data) => {
                    const { accessToken, refreshToken } = (data && data.data || {}).data || {};
                    // 存储Token
                    window.localStorage.setItem(`accessToken-${window.systemId}`, accessToken);
                    window.localStorage.setItem(`refreshToken-${window.systemId}`, refreshToken);
                });
            },
        );
        next();
    },
};
</script>
<style lang="scss">
    .test-component {
        background: #fff;
        .el-tabs {
            height: 55px;
        }
        .component {
            height: calc(100% - 55px);
            max-width: calc(100vw - 382px);
        }
    }
</style>
