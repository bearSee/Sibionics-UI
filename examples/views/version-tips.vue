<template>
  <div class="version-tips">
    <div
      class="box"
      v-for="(vers, index) in versionTips"
      :key="index">
      <h2>v{{ vers.version }} {{ $t('版本') }}</h2>
      <p>{{ $t('更新时间') }}：{{ vers.time || '' }}</p>
      <li
        v-for="(d, i) in vers.tips"
        :key="i">
        {{ d }}
      </li>
    </div>
    <el-backtop target=".master-page" />
  </div>
</template>

<script>
import { versionTips } from '../../package.json';

export default {
    name: 'VersionTips',
    data() {
        return {
            versionTips,
        };
    },
};
</script>

<style lang="scss">

.version-tips {
  .box {
    padding: 15px 0;
  }
  h3 > span {
    font-size: 14px;
  }
}
</style>
