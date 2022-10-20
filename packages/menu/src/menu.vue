<template>
  <div
    class="sib-menu"
    :class="collapse && 'is-collapse'"
    :style="mode === 'vertical' ? { width: showCollapse && collapse ? '50px' : '300px' } : {}">
    <div
      class="collapse-control"
      v-if="mode === 'vertical' && showCollapse"
      @click="handlerCollapse">
      <i :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
    </div>
    <el-menu
      class="transverse-scroll vertical-scroll"
      :style="{
        height: mode === 'vertical' && showCollapse ? 'calc(100% - 34px)' : '100%',
        'overflow-y': mode === 'vertical' ? 'auto' : 'hidden',
        'overflow-x': mode === 'horizontal' ? 'auto' : 'hidden',
      }"
      :router="router"
      :collapse="collapse"
      :unique-opened="uniqueOpened"
      :mode="mode"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :default-active="defaultActive || this.$route.path || null"
      @select="handlerSelect">
      <template v-for="(menu, index) of menus">
        <el-submenu
          v-if="menu.children && menu.children.length"
          :index="String(menu.id || menu.name)"
          :key="`menu-${index}`">
          <template slot="title">
            <i
              v-if="menu.icon"
              :class="menu.icon"
            />
            <span>{{ $t(menu.name) }}</span>
          </template>
          <el-menu-item
            v-for="(child, i) of menu.children"
            :index="child.redirect || child.path"
            :key="`child-${i}`">
            {{ $t(child.name) }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="menu.redirect || menu.path"
          :key="`menu-${index}`">
          <i
            v-if="menu.icon"
            :class="menu.icon"
          />
          <template slot="title">
            <span>{{ $t(menu.name) }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>

export default {
    name: 'SibMenu',
    props: {
        // horizontal/vertical
        mode: {
            type: String,
            default: 'vertical',
        },
        router: {
            type: Boolean,
            default: true,
        },
        defaultActive: {
            type: String,
            default: '',
        },
        // 是否启用水平折叠收起菜单（仅在 mode 为 vertical 时可用）
        showCollapse: {
            type: Boolean,
            default: false,
        },
        // 默认是否折叠，showCollapse 为 true 时有效
        collapsed: {
            type: Boolean,
            default: false,
        },
        // 是否只保持一个子菜单的展开
        uniqueOpened: {
            type: Boolean,
            default: false,
        },
        menus: {
            type: Array,
            default: () => ([]),
        },
        backgroundColor: {
            type: String,
            default: '',
        },
        textColor: {
            type: String,
            default: '',
        },
        activeTextColor: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            collapse: this.collapsed,
        };
    },
    methods: {
        handlerSelect(path, pathList) {
            this.$emit('select', path, pathList);
        },
        handlerCollapse() {
            this.collapse = !this.collapse;
            this.$nextTick(() => {
                window.dispatchEvent(new Event('resize'));
            });
        },
    },
};
</script>
