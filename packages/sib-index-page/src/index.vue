<template>
  <el-container class="sib-index-page">
    <el-aside class="index-menu-box">
      <sib-menu
        mode="vertical"
        show-collapse
        :menus="mainMenus" />
    </el-aside>
    <el-main class="main-content">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="bread in breadcrumbData"
          :key="bread.path">
          {{ $t(bread.name) }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <keep-alive>
        <router-view
          class="vertical-scroll animated fadeIn delay-1.5s"
          v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view
        class="vertical-scroll animated fadeIn delay-1.5s"
        v-if="!$route.meta.keepAlive" />
    </el-main>
  </el-container>
</template>

<script>

export default {
    name: 'SibIndexPage',
    props: {
        menus: {
            type: Array,
            default: () => ([]),
        },
        permissionCode: {
            type: String,
            default: '',
        },
        customMenus: {
            type: Array,
            default: () => ([]),
        },
    },
    data() {
        return {
        };
    },
    computed: {
        mainMenus() {
            if (this.customMenus.length) return this.customMenus;
            if (!this.permissionCode) return [];
            const menus = (this.menus.filter(({ permission }) => permission === this.permissionCode)[0] || {}).children || [];
            return menus.filter(({ path, children }) => children && children.length || (path !== '/404'));
        },
        breadcrumbData() {
            let data = [];
            const path = this.$route.fullPath;
            const indexRoutes = this.menus.find((menu) => menu.path === path || (menu.children || []).find((m) => m.path === path || (m.children || []).find((r) => r.path === path)));
            const menuRoutes = this.mainMenus.find((menu) => menu.path === path || (menu.children || []).find((m) => m.path === path));
            const childrenRoutes = ((menuRoutes || {}).children || []).find((menu) => menu.path === path);
            if (indexRoutes) data = [indexRoutes];
            if (childrenRoutes) {
                data = [...data, { ...menuRoutes, children: [] }, childrenRoutes];
            } else if (menuRoutes) {
                data = [...data, menuRoutes];
            }
            return data;
        },
    },
};
</script>
