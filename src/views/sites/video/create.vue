<template>
    <AppForm ref="modal" action="/sites/video/save" :model="video" :rules="rules" @success="handleSuccess">
        <AppInput :model="video" prop="title" label="标题"/>
        <AppInput :model="video" prop="cover" label="封面"/>
        <AppInput :model="video" prop="content" label="视频代码"/>
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
                video: {},
                /**
                 * 表单的校验
                 */
                rules: {
                    title: [
                        {required: true, message: '标题为必填项', trigger: 'blur'},
                        {max: 64, message: '标题最多为64位', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '封面为必填项', trigger: 'blur'},
                        {max: 128, message: '封面最多128位', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '视频代码为必填项', trigger: 'blur'},
                        {max: 512, message: '视频代码最多512位', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSuccess() {
                this.$router.push({
                    name: 'SITES_VIDEO'
                })
            }
        }
    };
</script>
