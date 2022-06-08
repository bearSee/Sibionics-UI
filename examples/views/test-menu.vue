<template>
  <div class="test-menu">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <!-- 示例1 -->
    <example>
      <sib-menu
        mode="horizontal"
        default-active="/menu"
        :router="false"
        :menus="menus"
      />
    </example>
    <!-- 示例2 -->
    <example>
      <sib-menu
        class="vertical-menu"
        mode="vertical"
        collapsed
        show-collapse
        :menus="menus"
      />
    </example>
    <!-- <sib-index-page :menus="menus" /> -->
    <config-table :table-data="tableData" />
    <config-table
      step="events"
      :table-data="eventData" />
    <el-backtop target=".master-page" />
  </div>
</template>

<script>

export default {
    name: 'TestMenu',
    data() {
        return {
            menus: [
                {
                    name: this.$t('菜单标题'),
                    id: 'components',
                    icon: 'el-icon-location',
                    children: [
                        {
                            name: this.$t('菜单') + 1,
                            path: '/menu',
                        },
                        {
                            name: this.$t('菜单') + 2,
                            path: '/path1',
                        },
                        {
                            name: this.$t('菜单') + 3,
                            path: '/path2',
                        },
                    ],
                },
                {
                    name: this.$t('菜单') + 4,
                    path: '/path3',
                    icon: 'el-icon-menu',
                },
                {
                    name: this.$t('菜单') + 5,
                    path: '/menu2',
                    icon: 'el-icon-document',
                },
                {
                    name: this.$t('菜单') + 6,
                    path: '/path4',
                    icon: 'el-icon-setting',
                },
            ],
            tableData: [
                {
                    params: 'mode',
                    des: '模式：横向、纵向',
                    type: 'String',
                    values: 'horizontal/vertical',
                    defaultVal: 'vertical',
                },
                {
                    params: 'router',
                    des: '是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'showCollapse',
                    des: '是否启用水平折叠收起菜单（仅在 mode 为 vertical 时可用）',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'collapsed',
                    des: '默认是否折叠，showCollapse 为 true 时有效',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'uniqueOpened',
                    des: '是否只保持一个子菜单的展开',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'menus',
                    des: '菜单配置',
                    type: 'Array',
                    values: '-',
                    defaultVal: '[ ]',
                },
            ],
            eventData: [
                {
                    name: 'select',
                    des: '菜单被点击事件',
                    params: 'index: 选中菜单项的 index, indexPath: 选中菜单项的 index path',
                },
            ],
        };
    },
};
</script>

<style lang="scss">
.test-menu {
  .example {
  }
}
</style>
