<template>
    <AppForm ref="modal" action="/sites/album/save" :model="album" :rules="rules" @success="handleSuccess">
        <AppInput :model="album" prop="albumName" label="相册名称"/>
        <AppInput :model="album" prop="cover" label="封面"/>
        <AppInput :model="album" prop="password" label="相册密码"/>
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
                album: {},
                /**
                 * 表单的校验
                 */
                rules: {
                    albumName: [
                        {required: true, message: '相册名称为必填项', trigger: 'blur'},
                        {max: 64, message: '相册名称最多为64位', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '封面为必填项', trigger: 'blur'},
                        {max: 128, message: '封面最多128位', trigger: 'blur'}
                    ],
                    password: [
                        {max: 6, message: '密码最多6位', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSuccess() {
                this.$router.push({
                    name: 'SITES_ALBUM'
                })
            }
        }
    };
</script>
