<template>
  <div
    class="download-file"
    v-show="false">
    <form
      :action="urlWithTimestamp"
      :method="method">
      <input
        type="text"
        v-for="key of Object.keys(params)"
        :key="key"
        :name="key"
        :value="params[key]">
      <input
        ref="download"
        type="submit"
        value="提交">
    </form>
  </div>
</template>

<script>
export default {
    name: 'DownloadFile',
    data() {
        return {
            action: '/api/file/download',
            params: {},
            method: 'post',
        };
    },
    computed: {
        urlWithTimestamp() {
            return `${this.action}?t=${+new Date()}`;
        },
    },
    methods: {
        download() {
            this.$nextTick(() => {
                this.$refs.download.click();
            });
        },
    },
};
</script>
