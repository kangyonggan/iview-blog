<template>
    <FormItem :prop="prop">
        <DatePicker :type="type" v-model="model[prop]" :placeholder="placeholder"
                    @on-change="model[prop]=$event"
                    :class="{large: type === 'daterange' || type === 'datetime' || type === 'datetimerange'}"/>
    </FormItem>
</template>

<script>
    import Vue from 'vue';
    import {oneOf} from 'iview/src/utils/assist';

    const AppDatePicker = {
        props: {
            model: {
                required: true,
                type: Object
            },
            prop: {
                required: true,
                type: String
            },
            type: {
                required: false,
                type: String,
                default: 'date',
                validator(value) {
                    return oneOf(value, ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month']);
                }
            },
            placeholder: {
                type: String
            }
        }
    };

    export default AppDatePicker;

    Vue.component('AppDatePicker', AppDatePicker);
</script>

<style scoped>
    .large {
        width: 220px;
    }
</style>
