<template>
    <AppForm ref="modal" action="/sites/article/save" title="新增文章" :model="article" :rules="rules" @success="handleSuccess">
        <AppInput :model="article" prop="title" label="文章标题"/>
        <AppInput :model="article" prop="summary" label="摘要"/>
        <i-editor :height="500" v-model="article.content"></i-editor>
    </AppForm>
</template>

<script>
    export default {
        props: {
            success: {
                type: Function
            }
        },
        data() {
            return {
                article: {},
                /**
                 * 表单的校验
                 */
                rules: {
                    title: [
                        {required: true, message: '文章标题为必填项', trigger: 'blur'},
                        {max: 64, message: '文章标题最多为64位', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '摘要为必填项', trigger: 'blur'},
                        {max: 256, message: '摘要最多256位', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSuccess() {
                this.$router.push({
                    name: 'SITES_ARTICLE'
                })
            }
        }
    };
</script>

<style>
    .i-editor-md textarea {
        height: 500px !important;
    }
    .i-editor-wrapper {
        padding: 0 !important;
    }
</style>
