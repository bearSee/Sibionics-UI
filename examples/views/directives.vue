<template>
  <div class="directives">
    <div
      class="code-box"
      v-for="(item, index) in data"
      :key="index">
      <h2>{{ $t(item.title || '') }}</h2>
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
      <el-button
        v-if="item.title === 'v-dialogDrag'"
        @click="dialogVisible = true">
        Click Me
      </el-button>
    </div>
    <el-dialog
      class="center"
      width="400px"
      v-dialogDrag
      :visible.sync="dialogVisible">
      <p style="text-align: center;font-size: 30px;">
        Hello World!
      </p>
    </el-dialog>
    <el-backtop target=".master-page" />
  </div>
</template>

<script>
export default {
    name: 'Directives',
    data() {
        return {
            dialogVisible: false,
            data: [
                {
                    title: 'v-dialogDrag',
                    des: [
                        '你可以在 el-dialog 弹窗组件上添加 v-dialogDrag 指令，使其支持拖拽',
                        '使用 el-dialog 弹窗组件时，你可以给其添加 class="center"，使其打开时出现在屏幕中央',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`<el-dialog
    class="center"
    width="400px"
    v-dialogDrag
    :visible.sync="visible">
    <p style="text-align: center;font-size: 30px;">
      Hello World!
    </p>
</el-dialog>
`,
                },
                {
                    title: 'v-watermark',
                    des: [
                        '你可以在任意元素上添加 v-watermark 指令，使其获得水印效果',
                    ],
                    code: // eslint-disable-next-line vue/script-indent
`<template>
    <div id="app" v-watermark="watermark"></div>
</template>

<script>
    export default {
        data() {
            return {
                watermark: 'sibionics-ui ${this.$t('组件库演示')}',
            };
        },
    };
</ script>
`,
                },
            ],
        };
    },
};
</script>

<style lang="scss">

.directives {
  .code-box {
    padding: 15px 0;
  }
  pre {
    display: flex;
  }
}
</style>
