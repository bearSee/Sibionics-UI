<template>
  <div class="test-throttle">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example>
      <div slot="describe">
        <h4>1、{{ $t('未使用 sib-throttle 组件的普通按钮') }}</h4>
      </div>
      <el-button
        type="primary"
        :time="1000"
        @click="handlerClick">
        {{ $t('连续点击我') }}
      </el-button>
    </example>
    <example
      :slot-template-string="slotTemplateString"
      :method-template-string="methodTemplateString">
      <div slot="describe">
        <h4>2、isImmediate {{ $t('和') }} isDebounce {{ $t('默认都为') }} true</h4>
        <li>
          {{ $t('若设置时间为1000ms') }}
        </li>
        <li>
          {{ $t('重复快速点击，且时间间隔小于1000ms时，只有第一次点击有效') }}
        </li>
      </div>
      <sib-throttle
        :time="1000"
        events="click">
        <el-button
          type="primary"
          @click="handlerClick">
          {{ $t('连续点击我') }}
        </el-button>
      </sib-throttle>
    </example>
    <example
      :slot-template-string="slotTemplateString"
      :method-template-string="methodTemplateString">
      <div slot="describe">
        <h4>3、isImmediate {{ $t('为') }} false， isDebounce {{ $t('为') }} true</h4>
        <li>
          {{ $t('若设置时间为1000ms') }}
        </li>
        <li>
          {{ $t('重复快速点击，且时间间隔小于1000ms时，只有最后一次点击有效') }}
        </li>
      </div>
      <sib-throttle
        events="click"
        :time="1000"
        :is-immediate="false">
        <el-button
          type="primary"
          @click="handlerClick">
          {{ $t('连续点击我') }}
        </el-button>
      </sib-throttle>
    </example>
    <example
      :slot-template-string="slotTemplateString"
      :method-template-string="methodTemplateString">
      <div slot="describe">
        <h4>4、isImmediate {{ $t('为') }} true， isDebounce {{ $t('为') }} false</h4>
        <li>
          {{ $t('若设置时间为1000ms') }}
        </li>
        <li>
          {{ $t('重复快速点击，必须等到时间间隔大于或等于1000ms时，才触发下一次点击') }}
        </li>
      </div>
      <sib-throttle
        events="click"
        :time="1000"
        :is-debounce="false">
        <el-button
          type="primary"
          @click="handlerClick">
          {{ $t('连续点击我') }}
        </el-button>
      </sib-throttle>
    </example>
    <example
      :slot-template-string="slotTemplateString"
      :method-template-string="methodTemplateString">
      <div slot="describe">
        <h4>5、isImmediate {{ $t('和') }} isDebounce {{ $t('都为') }} false</h4>
        <li>
          {{ $t('若设置时间为1000ms') }}
        </li>
        <li>
          {{ $t('相当于你防了个锤子的抖') }}
        </li>
      </div>
      <sib-throttle
        events="click"
        :is-immediate="false"
        :is-debounce="false">
        <el-button
          type="primary"
          :time="1000"
          @click="handlerClick">
          {{ $t('连续点击我') }}
        </el-button>
      </sib-throttle>
    </example>
    <config-table :table-data="tableData" />
  </div>
</template>

<script>
export default {
    name: 'TestThrottle',
    data() {
        return {
            slotTemplateString: `
              <el-button type="primary" @click="handlerClick">${this.$t('连续点击我')}</el-button>`,
            methodTemplateString: `
            handlerClick() {
                this.$message.info('${this.$t('点击我啦')}');
            },`,
            tableData: [
                {
                    params: 'time',
                    des: '间隔时间',
                    type: 'Number',
                    values: '-',
                    defaultVal: '300',
                },
                {
                    params: 'events',
                    des: '需要控制的事件',
                    type: 'String',
                    values: 'click/dbclick/mouseenter...',
                    defaultVal: "'click'",
                },
                {
                    params: 'isDebounce',
                    des: '',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'isImmediate',
                    des: '',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
            ],
        };
    },
    methods: {
        handlerClick() {
            this.$message.info(this.$t('点击我啦'));
        },
    },
};
</script>

<style lang="scss">
.test-throttle {
}
</style>
