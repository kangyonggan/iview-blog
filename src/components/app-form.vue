<template>
    <Form ref="form" :model="model" :rules="rules" class="inner-content">
        <slot></slot>

        <FormItem>
            <Button type="success" icon="md-checkmark" :loading="isLoading" @click="handleSubmit($event, $refs.form)">
                提交
            </Button>
        </FormItem>
    </Form>
</template>

<script>
    import Vue from 'vue';

    const AppForm = {
        props: {
            model: {
                required: false,
                type: Object
            },
            action: {
                required: false,
                type: String
            },
            method: {
                required: false,
                type: String,
                default: 'post'
            },
            rules: {
                required: false,
                type: Object
            }
        },
        data() {
            return {
                isLoading: false
            };
        },
        methods: {
            handleSubmit: function (e, form) {
                form.validate((valid) => {
                    if (valid) {
                        this.isLoading = true;
                        this.http.ajax(this.method, this.action, this.model).then(data => {
                            this.$emit('success', data);
                            this.isLoading = false;
                        }).catch(res => {
                            this.$emit('failure', res);
                            this.error(res.respMsg);
                            this.isLoading = false;
                        });
                    }
                });
            }
        }
    };

    export default AppForm;

    Vue.component('AppForm', AppForm);
</script>

<style>
    .inner-content {
        max-width: 600px;
        margin: 20px auto;
    }
</style>
