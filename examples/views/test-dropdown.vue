<template>
  <div class="test-dropdown">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1、{{ $t('普通下拉菜单') }}</h4>
      </div>
      <p>{{ $t('当前已选择') }}：{{ value || '--' }}</p>
      <sib-dropdown
        v-model="value"
        :data="dropdownData1" />
    </example>
    <example
      :slot-template-string="slotTemplateString"
      :css-templatetring="cssTemplatetring">
      <div slot="describe">
        <h4>2、{{ $t('通过默认插槽插入内容') }}</h4>
      </div>
      <sib-dropdown
        :data="dropdownData2"
        @select="handlerSelect">
        <div class="drop-content-box">
          <el-avatar icon="el-icon-user-solid" />
          <p class="userName">
            {{ $t('管理员') }}
          </p>
          <i class="el-icon-caret-bottom" />
        </div>
      </sib-dropdown>
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
    name: 'TestLabel',
    data() {
        return {
            value: '',
            dropdownData1: [
                {
                    value: '黄金糕',
                    key: '1',
                },
                {
                    value: '狮子头',
                    key: '2',
                },
                {
                    value: '螺蛳粉',
                    key: '3',
                },
                {
                    value: '双皮奶',
                    key: '4',
                },
            ],
            dropdownData2: [
                {
                    value: '个人资料',
                    key: '1',
                },
                {
                    value: '修改密码',
                    key: '2',
                },
                {
                    value: '切换用户',
                    key: '3',
                },
                {
                    value: '退出登录',
                    key: '4',
                },
            ],
            slotTemplateString: `
                <div class="drop-content-box">
                    <el-avatar icon="el-icon-user-solid" />
                    <p class="userName">
                      ${this.$t('管理员')}
                    </p>
                    <i class="el-icon-caret-bottom" />
                </div>`,
            cssTemplatetring: `
    .sib-dropdown {
      .drop-content-box {
        display: flex;
        align-items: center;
        .userName {
          margin: 0 10px;
        }
      }
    }`,
            attributeData: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'String/Number',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: 'data',
                    des: '下拉选项数据',
                    type: 'Array',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'size',
                    des: '尺寸大小',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: "'small'",
                },
                {
                    params: 'splitButton',
                    des: '下拉触发元素是否呈现为按钮组',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'type',
                    des: '菜单按钮类型，只在splitButton为 true 的情况下有效',
                    type: 'String',
                    values: 'primary / success / warning / danger / info / text',
                    defaultVal: "'primary'",
                },
                {
                    params: 'placement',
                    des: '菜单弹出位置',
                    type: 'String',
                    values: 'top / top-start / top-end / bottom / bottom-start / bottom-end',
                    defaultVal: "'bottom'",
                },
                {
                    params: 'trigger',
                    des: '触发下拉的行为',
                    type: 'String',
                    values: 'hover / click',
                    defaultVal: "'click'",
                },
                {
                    params: 'hideOnClick',
                    des: '是否在点击菜单项后隐藏菜单',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
                {
                    params: 'disabled',
                    des: '是否禁用',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'placeholder',
                    des: '占位提示，插槽存在内容时，该配置无效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择'",
                },
                {
                    params: 'clearable',
                    des: '是否展示清空图标，插槽存在内容时，该配置无效',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'dataProps',
                    des: "指定下拉选项配置的键/值所对应的字段编码，一般用于配置接口从后台获取数据的情况，默认展示的字段叫value，获取值的字段叫key，可能后台返回的数据中并不包含key和value，而是叫id和name，那么此时你需要配置成{ key: 'id', value: ''name' }",
                    type: 'Object',
                    values: '-',
                    defaultVal: "{ key: 'key', value: ''value' }",
                },
                {
                    params: 'dataProps[i].key',
                    des: '指定下拉选项配置的主键所对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'key'",
                },
                {
                    params: 'dataProps[i].value',
                    des: '指定下拉选项配置的展示值所对应的字段编码',
                    type: 'String',
                    values: '-',
                    defaultVal: "'value'",
                },
            ],
            eventData: [
                {
                    name: 'select',
                    des: '下拉选择事件',
                    params: '目前的选中的对象',
                },
            ],
            slotData: [
                {
                    name: '-',
                    des: '替换展示内容',
                    params: '-',
                },
            ],
        };
    },
    methods: {
        handlerSelect(data) {
            this.$message.info(`${this.$t('当前已选择')}: ${JSON.stringify(data)}`);
            console.log('当前已选择', data);
        },
    },
};
</script>

<style lang="scss">
.test-dropdown {
  .sib-dropdown {
    .drop-content-box {
      display: flex;
      align-items: center;
      .userName {
        margin: 0 10px;
      }
    }
  }
}
</style>
