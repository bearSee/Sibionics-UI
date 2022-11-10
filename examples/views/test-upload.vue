<template>
  <div class="test-upload">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <!-- 示例1 -->
    <example
      :ignore-keys="['input']"
      :slot-data-string="slotDataString">
      <sib-item
        v-model="value"
        :props="props"
      />
    </example>
    <config-table
      step="attributes"
      :table-data="attributeData" />
    <config-table
      step="events"
      :table-data="eventData" />
    <config-table
      step="slots"
      :table-data="slotData" />
    <el-backtop target=".master-page" />
  </div>
</template>

<script>

export default {
    name: 'Testupload',
    data() {
        return {
            props: {
                type: 'upload',
                action: 'https://jsonplaceholder.typicode.com/posts/',
                accept: 'image/png',
                limit: 3,
                maxSize: 2,
                listType: 'picture-card',
                showTips: true,
                onSuccess: (res, file, fileList) => {
                    console.log(res, file, fileList);
                    if (res.code === 400) {
                        this.$message.error('上传失败');
                        return fileList.filter(({ uid }) => uid !== file.uid);
                    }
                    this.$message.success('上传成功');
                    return fileList;
                },
                beforeRemove(file) {
                    return this.$confirm(`确定移除 ${file.name}？`);
                },
            },
            value: [
                {
                    name: '帅照1.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                },
            ],
            slotDataString: `{
            props: {
                type: 'upload',
                action: 'https://jsonplaceholder.typicode.com/posts/',
                accept: 'image/png',
                limit: 3,
                maxSize: 2,
                listType: 'picture-card',
                showTips: true,
                onSuccess: (res, file, fileList) => {
                    console.log(res, file, fileList);
                    if (res.code === 400) {
                        this.$message.error('上传失败');
                        return fileList.filter(({ uid }) => uid !== file.uid);
                    }
                    this.$message.success('上传成功');
                    return fileList;
                },
                beforeRemove(file) {
                    return this.$confirm(\`确定移除 \${file.name}？\`);
                },
            },
        }`,
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定的文件列表, 例如: [{name: \'food.jpg\', url: \'https://xxx.cdn.com/xxx.jpg\'}]',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'props',
                    des: '表单元素配置',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'props.type',
                    des: '表单元素的类型(必传type=upload)',
                    type: 'String',
                    values: 'upload',
                    defaultVal: '-',
                },
                {
                    params: 'props.action',
                    des: '必选参数，上传的地址',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.headers',
                    des: '设置上传的请求头部',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ aun, mid, ts }',
                },
                {
                    params: 'props.multiple',
                    des: '是否支持多选文件',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.data',
                    des: '设置上传的额外请求参数',
                    type: 'Object',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.name',
                    des: '上传的文件字段名(后台接受文件的字段)',
                    type: 'String',
                    values: '-',
                    defaultVal: "'file'",
                },
                {
                    params: 'props.withCredentials',
                    des: '支持发送 cookie 凭证信息',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.showFileList',
                    des: '是否显示已上传文件列表',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.drag',
                    des: '是否启用拖拽上传',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.accept',
                    des: '接受上传的文件类型（thumbnail-mode 模式下此参数无效）',
                    type: 'String',
                    values: 'image/png等w3c标准属性',
                    defaultVal: '-',
                },
                {
                    params: 'props.listType',
                    des: '文件列表的类型',
                    type: 'Object',
                    values: 'text/picture/picture-card',
                    defaultVal: 'text',
                },
                {
                    params: 'props.autoUpload',
                    des: '是否在选取文件后立即进行上传',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'props.disabled',
                    des: '是否禁用',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.limit',
                    des: '最大允许上传个数',
                    type: 'Number',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.maxSize',
                    des: '文件大小限制(M)',
                    type: 'Number',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.btnText',
                    des: '上传按钮文案(props.listType 不为 picture-card 时有效)',
                    type: 'String',
                    values: '-',
                    defaultVal: "'点击上传'",
                },
                {
                    params: 'props.size',
                    des: '上传按钮尺寸大小(props.listType 不为 picture-card 时有效)',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: "'small'",
                },
                {
                    params: 'props.showTips',
                    des: '是否展示提示说明',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.uploadTip(props.showTips 为 true 时生效)',
                    des: '提示说明文字文案',
                    type: 'String',
                    values: '-',
                    defaultVal: "'不限制文档类型'",
                },
                {
                    params: 'props.onPreview',
                    des: '点击文件列表中已上传的文件时的钩子',
                    type: 'function(file)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.onRemove',
                    des: '文件列表移除文件时的钩子(支持异步方法)，支持 return 一个数组用以覆盖当前文件列表',
                    type: 'function(file, fileList)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.onSuccess',
                    des: '文件上传成功时的钩子，支持 return 一个数组用以覆盖当前文件列表',
                    type: 'function(response, file, fileList)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.onError',
                    des: '文件上传失败时的钩子，支持 return 一个数组用以覆盖当前文件列表',
                    type: 'function(err, file, fileList)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.onProgress',
                    des: '文件上传时的钩子',
                    type: 'function(event, file, fileList)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.beforeUpload',
                    des: '上传前的钩子，不 return 或者 return false 则中止上传',
                    type: 'function(file)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.beforeRemove',
                    des: '删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。',
                    type: 'function(file, fileList)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.onExceed',
                    des: '文件超出个数限制时的钩子',
                    type: 'function(file, fileList)',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.httpRequest',
                    des: '覆盖默认的上传行为，可以自定义上传的实现',
                    type: 'function',
                    values: '-',
                    defaultVal: '-',
                },
            ],
            eventData: [],
            slotData: [],
        };
    },
};
</script>

<style lang="scss">
.test-upload {
}
</style>
