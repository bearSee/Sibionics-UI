<template>
  <div class="test-index-page">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <li>使用 &lt;sib-index-page /&gt;，传入菜单配置，左侧展示为菜单栏，右侧自动展示对应菜单的路由页面</li>
    <example>
      <sib-index-page :custom-menus="menus" />
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
    name: 'TestText',
    data() {
        return {
            menus: [
                {
                    name: this.$t('菜单标题'),
                    id: 'components',
                    icon: 'el-icon-location',
                    children: [
                        {
                            name: 'Calculator 计算器',
                            path: '/index-page/calculator',
                        },
                    ],
                },
                {
                    name: 'Table 表格',
                    path: '/index-page/table',
                    icon: 'el-icon-menu',
                },
            ],
            attributeData: [
                {
                    params: 'menus',
                    des: '菜单配置',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
            ],
            eventData: [],
            slotData: [],
        };
    },
};
</script>

<style lang="scss">
.test-index-page {
    .sib-index-page {
        width: 1000px;
        height: 600px;
        .main-content {
            overflow: hidden;
        }
    }
}
</style>
