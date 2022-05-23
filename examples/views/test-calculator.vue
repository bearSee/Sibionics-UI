<template>
  <div class="test-calculator">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example>
      <div slot="describe">
        <h4>基础示例</h4>
      </div>
      <sib-calculator />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>展示计算历史记录</h4>
        <li>配置 show-history = "true" 可以展示计算记录面板</li>
      </div>
      <sib-calculator show-history />
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
            attributeData: [
                {
                    params: 'copyValue',
                    des: '是否允许点击结果值时，将值复制到粘贴板',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'showHistory',
                    des: '是否展示计算记录面板',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
            ],
            eventData: [
                {
                    name: 'compute-finish',
                    des: '计算完成时触发的事件，参数为 Number 类型的值',
                    params: 'value',
                },
                {
                    name: 'choose-result',
                    des: '点击计算结果值触发的事件，参数为 Number 类型的值',
                    params: 'value',
                },
                {
                    name: 'choose-number',
                    des: '点击计算记录面板内的记录值触发的事件，参数为 Number 类型的值',
                    params: 'value',
                },
            ],
            slotData: [],
        };
    },
};
</script>

<style lang="scss">
.test-calculator {
}
</style>
