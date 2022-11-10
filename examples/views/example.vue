<template>
  <div class="example-box">
    <slot name="describe" />
    <div class="example">
      <div class="slot-content">
        <slot />
      </div>
      <div style="text-align: center;">
        <el-button
          type="text"
          size="large"
          @click="show = !show">
          {{ show ? $t('隐藏') : $t('展示') }}{{ $t('代码') }}
        </el-button>
      </div>
      <div v-show="show">
        <pre>
          <code>{{ templateCode }}</code>
        </pre>
      </div>
      <div style="text-align: center;">
        <el-button
          type="text"
          size="large"
          v-if="show"
          @click="show = false">
          {{ $t('隐藏') }}{{ $t('代码') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Example',
    props: {
        // 自定义所有代码串
        templateString: {
            type: String,
            default: '',
        },
        // 自定义组件外部元素代码串
        excessTemplateString: {
            type: String,
            default: '',
        },
        // 自定义组建内部元素插槽代码串
        slotTemplateString: {
            type: String,
            default: '',
        },
        // 自定义Data数据代码串
        slotDataString: {
            type: String,
            default: '',
        },
        // 自定义方法代码串
        methodTemplateString: {
            type: String,
            default: '',
        },
        cssTemplatetring: {
            type: String,
            default: '',
        },
        defaultData: {
            type: Object,
            default: () => ({}),
        },
        // 忽略抛出方法，不写入代码串
        ignoreKeys: {
            type: Array,
            default: () => ([]),
        },
    },
    data() {
        return {
            show: false,
            componentData: this.defaultData,
            methodString: '',
            componentTemplate: '',
        };
    },
    computed: {
        templateCode() {
            return this.templateString || `
<template>
    <div class="example-box">
        ${this.excessTemplateString || `<!-- ${this.$t('组件使用演示')} -->`}
        ${this.componentTemplate}
    </div>
</template>

<script>
export default {
    name: 'ExampleBox',
    data() {
        return ${this.slotDataString || JSON.stringify(this.componentData, null, 13)};
    },
    methods: {${this.methodString}${this.methodTemplateString}
    },
};
< /script>

<style lang="scss">
.example-box {${this.cssTemplatetring}
}
</style>`;
        },
    },
    mounted() {
        const component = (this.$slots.default || []).filter(({ tag }) => tag.includes('vue-component'));
        if (!component.length) return;
        const { tag, propsData = {}, listeners = {} } = component[0].componentOptions;
        const { model } = component[0].data;
        const expression = model && model.expression || '';
        const syncKeys = Object.keys(listeners).filter((key) => key.includes('update:'));
        const publicKeys = Object.keys(listeners).filter((key) => !key.includes('update:'));
        let attributes = Object.keys(propsData).map((key) => {
            if (['string'].includes(typeof propsData[key]) && !['value'].includes(key) && propsData[key] === '') {
                return `${key}`;
            }
            const data = propsData[key];
            if (Object.prototype.toString.call(data) === '[object Array]') {
                this.componentData[key] = window.SIB.deepCopy(data).map((item) => {
                    if (Object.prototype.toString.call(item) === '[object Object]') {
                        Object.keys(item).forEach((k) => {
                            if (typeof item[k] === 'function') {
                                const str = item[k].toString().replace(/\n/ig, '');
                                const params = str.slice(str.indexOf('(') + 1, str.indexOf(')'));
                                const body = (str.slice(str.indexOf('{') + 1, str.lastIndexOf('}')) || '').replace('_this', 'this');
                                item[`${k} `] = `(${params}) => { ${body} }`;
                            }
                        });
                    }
                    return item;
                });
            } else {
                if (Object.prototype.toString.call(data) === '[object Object]') {
                    Object.keys(data).forEach((k) => {
                        if (typeof data[k] === 'function') {
                            const str = data[k].toString().replace(/\n/ig, '');
                            const params = str.slice(str.indexOf('(') + 1, str.indexOf(')'));
                            const body = (str.slice(str.indexOf('{') + 1, str.lastIndexOf('}')) || '').replace('_this', 'this');
                            data[`${k} `] = `(${params}) => {${body}}`;
                        }
                    });
                }
                this.componentData[key] = data;
            }
            if (key === 'value' && expression) {
                return `v-model="${key}"`;
            }
            return `:${key}${syncKeys.some((k) => k.includes(key)) ? '.sync' : ''}="${key}"`;
        }).join('\n\t\t');
        const method = publicKeys.map((key) => {
            const methName = key.split('-').join('');
            if (this.ignoreKeys.includes(key)) return '';
            this.methodString += `
        ${methName}() {
            console.log('${methName}${this.$t('的所有参数')}', ...arguments);
        },`;
            return `@${key}="${methName}"`;
        });
        if (method) attributes += (`\n\t\t${method.join('\n\t\t')}`);
        this.componentTemplate = `<${tag}\n\t\t${attributes}>${this.slotTemplateString ? `${this.slotTemplateString}\n\t` : '\n\t'}</${tag}>`;
    },
};
</script>

<style lang="scss">
.example-box {
}
</style>
