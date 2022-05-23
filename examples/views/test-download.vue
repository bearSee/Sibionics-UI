<template>
  <div class="test-download">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example
      :excess-template-string="excessTemplateString"
      :method-template-string="methodTemplateString">
      <div slot="describe">
        <div>
          <el-button
            type="primary"
            @click="handlerClick">
            点击下载
          </el-button>
        </div>
        <h4>1、通过表单实现下载</h4>
        <li>Vue原型上挂载了封装好的下载方法，可通过调用 this.$download 即可实现表单下载</li>
        <li>this.$download 接收一个 Object </li>
      </div>
    </example>
    <config-table
      step="attributes"
      :table-data="attributeData" />
    <el-backtop target=".master-page" />
  </div>
</template>

<script>

export default {
    name: 'TestDownload',
    data() {
        return {
            excessTemplateString: '\n\t<el-button type="primary" @click="handlerClick">点击下载</el-button>',
            methodTemplateString: `
        handlerClick() {
            this.$download({
                action: '/api/file/download',
                params: {
                    a: 1,
                    b: 2,
                },
                method: 'post',
            });
        },`,
            attributeData: [
                {
                    params: 'action',
                    des: '接口请求地址',
                    type: 'String',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: 'method',
                    des: '请求方式',
                    type: 'String',
                    values: 'get/post',
                    defaultVal: "'post'",
                },
                {
                    params: 'params',
                    des: '请求参数',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
            ],
        };
    },
    methods: {
        handlerClick() {
            this.$download({
                action: '/api/file/download',
                params: {
                    a: 1,
                    b: 2,
                },
                method: 'post',
            });
        },
    },
};
</script>

<style lang="scss">
.test-download {
}
</style>
