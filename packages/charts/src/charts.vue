<template>
  <div class="sib-charts">
    <div
      class="main"
      :id="id" />
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'SibCharts',
    props: {
        id: {
            type: [Number, String],
            default: Math.random(),
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    watch: {
        options: {
            deep: true,
            handler(opts) {
                if (!this.echartComponent) return;
                this.echartComponent.setOption(opts, true);
            },
        },
    },
    data() {
        return {
            echartComponent: null,
        };
    },
    mounted() {
        this.creatCanvas();
        // 图表视口自适应宽度
        window.addEventListener('resize', this.echartResize);
    },
    methods: {
        echartResize() {
            if (this.echartComponent) this.echartComponent.resize();
        },
        creatCanvas() {
            // 基于准备好的dom，初始化echarts实例
            const dom = document.getElementById(this.id);
            if (!dom) return;
            setTimeout(() => {
                this.echartComponent = echarts.init(document.getElementById(this.id));
                this.echartComponent.setOption(this.options, true);
            }, 0);
        },
    },
    activated() {
        this.echartResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.echartResize);
    },
};
</script>
