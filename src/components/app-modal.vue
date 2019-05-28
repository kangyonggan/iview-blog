<template>
    <Modal :title="title" v-model="showModel" :mask-closable="false" :closable="false">
        <Form ref="form" :model="model" :rules="rules">
            <slot></slot>
        </Form>

        <template slot="footer">
            <Button icon="md-close" @click="cancel">取消</Button>
            <Button type="success" icon="md-checkmark" :loading="isLoading" @click="handleSubmit($event, $refs.form)">
                提交
            </Button>
        </template>
    </Modal>
</template>

<script>
    import Vue from 'vue';

    const AppModal = {
        props: {
            title: {
                required: true,
                type: String
            },
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
                isLoading: false,
                showModel: false
            }
        },
        methods: {
            show: function () {
                this.stop();
                this.$refs.form.resetFields();
                this.showModel = true;
            },
            hide: function () {
                this.stop();
                this.showModel = false;
            },
            loading: function () {
                this.isLoading = true;
            },
            stop: function () {
                this.isLoading = false;
            },
            handleSubmit: function (e, form) {
                form.validate((valid) => {
                    if (valid) {
                        this.loading();
                        this.http.ajax(this.method, this.action, this.model).then(data => {
                            this.hide();
                            this.$emit('success', data);
                        }).catch(res => {
                            this.stop();
                            this.$emit('failure', res.respMsg);
                            this.error(res.respMsg);
                        })
                    }
                })
            },
            cancel: function () {
                this.$refs.form.resetFields();
                this.hide();
            }
        }
    };

    export default AppModal;

    Vue.component('AppModal', AppModal);
</script>
