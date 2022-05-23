<template>
  <div class="test-charts">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example>
      <sib-charts :options="options" />
    </example>
    <h3>
      二、{{ $t('配置项') }}
    </h3>
    <div>
      <el-button
        type="text"
        size="large">
        <a
          href="https://echarts.apache.org/zh/index.html"
          target="_blank">
          1、{{ $t('请参照 Echarts 官网配置') }}
        </a>
      </el-button>
    </div>
    <div>
      <el-button
        type="text"
        size="large">
        <a
          href="https://echarts.apache.org/examples/zh/editor.html?c=line-stack"
          target="_blank">
          2、{{ $t('本示例配置来源：Echarts折线图堆叠') }}
        </a>
      </el-button>
    </div>
    <el-backtop target=".master-page" />
  </div>
</template>

<script>

export default {
    name: 'TestChart',
    data() {
        return {
            show: false,
            options: {
                title: {
                    text: 'Stacked Line',
                },
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                    {
                        name: 'Union Ads',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310],
                    },
                    {
                        name: 'Video Ads',
                        type: 'line',
                        stack: 'Total',
                        data: [150, 232, 201, 154, 190, 330, 410],
                    },
                    {
                        name: 'Direct',
                        type: 'line',
                        stack: 'Total',
                        data: [320, 332, 301, 334, 390, 330, 320],
                    },
                    {
                        name: 'Search Engine',
                        type: 'line',
                        stack: 'Total',
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                    },
                ],
            },
        };
    },
};
</script>

<style lang="scss">
.test-charts {
  .sib-charts {
    height: 450px;
  }
}
</style>
