<template>
    <AppForm ref="modal" action="/sites/novel/save" :model="novel" :rules="rules" @success="handleSuccess">
        <AppSelect :model="novel" prop="source" label='来源' enumKey="NovelSource"/>
        <AppInput :model="novel" prop="code" label="小说代码"/>
        <AppInput :model="novel" prop="name" label="小说名称"/>
        <AppInput :model="novel" prop="author" label="作者"/>
        <AppInput :model="novel" prop="summary" label="简介"/>
        <AppInput :model="novel" prop="cover" label="封面"/>
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
                novel: {},
                /**
                 * 表单的校验
                 */
                rules: {
                    source: [
                        {required: true, message: '请选择来源', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '小说代码为必填项', trigger: 'blur'},
                        {max: 20, message: '小说代码最多为20位', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '小说名称为必填项', trigger: 'blur'},
                        {max: 32, message: '小说名称最多为32位', trigger: 'blur'}
                    ],
                    author: [
                        {required: true, message: '作者为必填项', trigger: 'blur'},
                        {max: 32, message: '作者最多为32位', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '简介为必填项', trigger: 'blur'},
                        {max: 2048, message: '简介最多2048位', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '封面为必填项', trigger: 'blur'},
                        {max: 256, message: '封面最多256位', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSuccess() {
                this.$router.push({
                    name: 'SITES_NOVEL'
                })
            }
        }
    };
</script>
