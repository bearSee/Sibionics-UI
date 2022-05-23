<template>
  <div class="test-time">
    <h3>
      一、{{ $t('使用示例') }}
    </h3>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1-1、普通用法</h4>
        <li>前提：isPicker 未配置或者为 false </li>
        <li>
          此时组件内部实际上使用的是 <a
            href="https://element.eleme.cn/#/zh-CN/component/time-picker"
            target="_blank">el-time-select组件</a>
        </li>
        <li>格式为HH:mm，默认间隔5min</li>
      </div>
      <p>当前已选择：{{ value1 || '--' }}</p>
      <sib-item
        v-model="value1"
        :props="props1"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1-2、自定义时间区间与间隔</h4>
        <li>前提：isPicker 未配置或者为 false </li>
        <li>pickerOptions 传入的时间格式请保持 HH:mm，不要带秒钟，否则电脑会爆炸</li>
        <li>此时 pickerOptions 的配置规则如下：</li>
        <pre class="time-picker-options">
          <code>
          pickerOptions: {
            start: '开始时间',
            step: '结束时间',
            end: '间隔时间',
            minTime: '最小时间，小于该时间的时间段将被禁用',
            maxTime: '最大时间，大于该时间的时间段将被禁用'
          }
          </code>
        </pre>
      </div>
      <p>当前已选择：{{ value2 || '--' }}</p>
      <sib-item
        v-model="value2"
        :props="props2"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1-3、时间连接选择框</h4>
        <li>前提：isPicker 未配置或者为 false </li>
        <li>配置 isRange 为 true 即可</li>
      </div>
      <p>当前已选择：{{ value3 || '--' }}</p>
      <sib-item
        v-model="value3"
        :props="props3"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1-4、支持分开控制两个时间区间的配置</h4>
        <li>前提1：isPicker 未配置或者为 false </li>
        <li>前提2：isRange 为 true </li>
        <li>支持通过 startPickerOptions 和 endPickerOptFormat 分别对两个时间进行控制</li>
        <li>startPickerOptions 和 endPickerOptFormat 类型为 Function/Object </li>
        <li>当为 Function 时，参数为一个数组，即当前绑定值 value ，要求返回值与 pickerOptions 的配置规则相同</li>
      </div>
      <p>当前已选择：{{ value4 || '--' }}</p>
      <sib-item
        v-model="value4"
        :props="props4"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>1-5、两个时间区间的配置相同</h4>
        <li>前提1：isPicker 未配置或者为 false </li>
        <li>前提2：isRange 为 true </li>
        <li>直接配置 pickerOptions </li>
      </div>
      <p>当前已选择：{{ value5 || '--' }}</p>
      <sib-item
        v-model="value5"
        :props="props5"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>2-1、时分秒选择</h4>
        <li>前提：isPicker 为 true </li>
        <li>
          此时组件内部实际上使用的是 <a
            href="https://element.eleme.cn/#/zh-CN/component/time-picker"
            target="_blank">el-time-picker组件</a>
        </li>
        <li>默认格式为HH:mm:ss</li>
        <li>此时 pickerOptions 的配置规则如下：</li>
        <pre class="time-picker-options">
          <code>
          pickerOptions: {
            selectableRange: '可选时间段，例如'18:30:00 - 20:30:00'或者传入数组['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']',
            format: '时间格式化(例如HH:mm:ss、HH:mm、HH)',
          }
          </code>
        </pre>
      </div>
      <p>当前已选择：{{ value6 || '--' }}</p>
      <sib-item
        v-model="value6"
        :props="props6"
      />
    </example>
    <example :ignore-keys="['input']">
      <div slot="describe">
        <h4>2-2、时间连接选择框</h4>
        <li>前提：isPicker 为 true </li>
        <li>配置 isRange 为 true 即可</li>
        <li>arrowControl: true 将滚动选择改为箭头控制</li>
      </div>
      <p>当前已选择：{{ value7 || '--' }}</p>
      <sib-item
        v-model="value7"
        :props="props7"
      />
    </example>
    <config-table
      step="attributes"
      title="二、Attributes（props.isPicker 未配置或者为 false）"
      :table-data="attributeData1" />
    <config-table
      step="attributes"
      title="Attributes（props.isPicker 为 true）"
      :table-data="attributeData2" />
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
            value1: '15:15',
            props1: {
                type: 'time',
                defaultValue: '01:15',
            },
            value2: '01:02',
            props2: {
                type: 'time',
                pickerOptions: {
                    start: '00:00',
                    step: '00:01',
                    end: '03:59',
                    minTime: '01:00',
                    maxTime: '02:05',
                },
            },
            value3: ['10:15', '10:20'],
            props3: {
                type: 'time',
                isRange: true,
                defaultValue: ['01:15', '02:20'],
            },
            value4: ['10:00', '14:30'],
            props4: {
                type: 'time',
                isRange: true,
                startPickerOptFormat: (value) => ({
                    start: '10:00',
                    step: '00:15',
                    end: '16:00',
                    maxTime: value[1],
                }),
                endPickerOptFormat: (value) => ({
                    start: '08:00',
                    step: '00:30',
                    end: '20:00',
                    minTime: value[0],
                }),
            },
            value5: ['10:00', '14:30'],
            props5: {
                type: 'time',
                isRange: true,
                pickerOptions: {
                    start: '09:00',
                    step: '00:30',
                    end: '15:00',
                },
            },
            value6: '15:15:30',
            props6: {
                type: 'time',
                isPicker: true,
                defaultValue: '00:10:00',
            },
            value7: [],
            props7: {
                type: 'time',
                isPicker: true,
                isRange: true,
                arrowControl: true,
                defaultValue: ['10:00:00', '14:59:59'],
            },
            attributeData1: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'String(isRange为true时，类型为Array)',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'props',
                    des: '表单元素配置',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'props.size',
                    des: '尺寸大小',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: "'small'",
                },
                {
                    params: 'props.type',
                    des: '表单元素的类型(必传type=time)',
                    type: 'String',
                    values: 'time',
                    defaultVal: '-',
                },
                {
                    params: 'props.disabled',
                    des: '是否禁用',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.defaultValue',
                    des: '选择器打开时默认显示的时间',
                    type: 'String(isRange为true时，类型为Array)',
                    values: "00:00:00 / [ '00:00:00', '23:59:59' ]",
                    defaultVal: '当前时间',
                },
                {
                    params: 'props.value',
                    des: '若绑定值为空，将获取该值作为初始值',
                    type: 'String/Array',
                    values: '单日期选择器数据类型为String，连接类型选择器数据类型为Array',
                    defaultVal: '-',
                },
                {
                    params: 'props.pickerOptions',
                    des: '当前时间选择器特有的选项',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ start: \'00:00\', step: \'00:05\', end: \'23:59\', minTime: \' \', maxTime: \' \' }',
                },
                {
                    params: 'props.placeholder',
                    des: '输入框占位提示，props.isRange不为true时有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择'",
                },
                {
                    params: 'props.startPlaceholder',
                    des: '起始时间占位提示，props.isRange为true时有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择起始时间'",
                },
                {
                    params: 'props.endPlaceholder',
                    des: '截止时间占位提示，props.isRange为true时有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择结束时间'",
                },
                {
                    params: 'props.rangeSeparator',
                    des: '连接框的连接符号，props.isRange为true时有效',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.startPickerOptFormat',
                    des: '起始时间选择器特有的选项，props.isRange为true时有效',
                    type: '[Object, Function]',
                    values: '-',
                    defaultVal: '{ start: \'00:00\', step: \'00:05\', end: \'23:59\', minTime: \' \', maxTime: \'绑定值value[1]\' }',
                },
                {
                    params: 'props.endPickerOptFormat',
                    des: '截止时间选择器特有的选项，props.isRange为true时有效',
                    type: '[Object, Function]',
                    values: '-',
                    defaultVal: '{ start: \'00:00\', step: \'00:05\', end: \'23:59\', minTime: \'绑定值value[0]\', maxTime: \' \' }',
                },
            ],
            attributeData2: [
                {
                    params: 'value/v-model',
                    des: '绑定值',
                    type: 'String(isRange为true时，类型为Array)',
                    values: '-',
                    defaultVal: '',
                },
                {
                    params: '——',
                    des: '——',
                    type: '——',
                    values: '——',
                    defaultVal: '——',
                },
                {
                    params: 'props',
                    des: '表单元素配置',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ }',
                },
                {
                    params: 'props.size',
                    des: '尺寸大小',
                    type: 'String',
                    values: 'large/small/mini',
                    defaultVal: "'small'",
                },
                {
                    params: 'props.type',
                    des: '表单元素的类型(必传type=time)',
                    type: 'String',
                    values: 'time',
                    defaultVal: '-',
                },
                {
                    params: 'props.disabled',
                    des: '是否禁用',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.value',
                    des: '若绑定值为空，将获取该值作为初始值',
                    type: 'String/Array',
                    values: '单日期选择器数据类型为String，连接类型选择器数据类型为Array',
                    defaultVal: '-',
                },
                {
                    params: 'props.defaultValue',
                    des: '选择器打开时默认显示的时间',
                    type: 'String(isRange为true时，类型为Array)',
                    values: "00:00:00 / [ '00:00:00', '23:59:59' ]",
                    defaultVal: '当前时间',
                },
                {
                    params: 'props.arrowControl',
                    des: '是否将滚动选择改为箭头控制',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'false',
                },
                {
                    params: 'props.pickerOptions',
                    des: '当前时间选择器特有的选项',
                    type: 'Object',
                    values: '-',
                    defaultVal: '{ selectableRange: \'00:00:00 - 23:59:59\', format: \'HH:mm:ss\' }',
                },
                {
                    params: 'props.format',
                    des: '将选中的值转换成特定的时间格式',
                    type: 'String',
                    values: '',
                    defaultVal: "'HH:mm:ss'",
                },
                {
                    params: 'props.placeholder',
                    des: '输入框占位提示，props.isRange不为true时有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择'",
                },
                {
                    params: 'props.startPlaceholder',
                    des: '起始时间占位提示，props.isRange为true时有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择起始时间'",
                },
                {
                    params: 'props.endPlaceholder',
                    des: '截止时间占位提示，props.isRange为true时有效',
                    type: 'String',
                    values: '',
                    defaultVal: "'请选择结束时间'",
                },
                {
                    params: 'props.rangeSeparator',
                    des: '连接框的连接符号，props.isRange为true时有效',
                    type: 'String',
                    values: '-',
                    defaultVal: '-',
                },
                {
                    params: 'props.clearable',
                    des: '是否支持清空',
                    type: 'Boolean',
                    values: 'true/false',
                    defaultVal: 'true',
                },
            ],
            eventData: [
                {
                    name: 'item-change',
                    des: '值修改后抛出的事件',
                    params: 'value',
                },
            ],
            slotData: [],
        };
    },
};
</script>

<style lang="scss">
.test-time {
  .time-picker-options {
    background: transparent;
    padding: 0;
    margin: 0;
    code {
      color: #555;
    }
  }
  .example .sib-item {
    width: 400px;
  }
}
</style>
