<template>
    <FormItem :prop="prop" :label="label">
        <Select v-model="model[prop]" :placeholder="placeholder ? placeholder : '请选择' + label" :disabled="disabled">
            <Option v-for="item in list" :value='item.code' :key="item.code">
                {{item.name}}
            </Option>
        </Select>
    </FormItem>
</template>

<script>
    import Vue from 'vue';

    const AppSelect = {
        props: {
            model: {
                required: true,
                type: Object
            },
            prop: {
                required: true,
                type: String
            },
            label: {
                type: String
            },
            placeholder: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            enumKey: {
                type: String,
                default: ''
            },
            dictType: {
                type: String,
                default: ''
            },
            items: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {
                list: []
            };
        },
        mounted() {
            this.list = [...this.items];
            if (this.enumKey) {
                this.loadEnumList();
            }
            if (this.dictType) {
                this.loadDictList();
            }
        },
        methods: {
            loadEnumList: function () {
                this.http.post('/enum', {enumKey: this.enumKey}).then(data => {
                    this.list = [...data.enumList];
                }).catch(res => {
                    this.error(res.respMsg);
                });
            },
            loadDictList: function () {
                this.http.post('/dict', {dictType: this.dictType}).then(data => {
                    for (const i in data.dicts) {
                        const dict = data.dicts[i];
                        this.list.push({
                            code: dict.dictCode,
                            name: dict.value
                        });
                    }
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        }
    };

    export default AppSelect;

    Vue.component('AppSelect', AppSelect);
</script>
