<template>
    <AppForm ref="modal" action="/user/profile" :model="userProfile" :rules="rules"
             @success="handleSuccess">
        <AppInput :model="userProfile" prop="userId" label="用户ID" readonly :clearable="false"/>
        <AppInput :model="userProfile" prop="email" label="电子邮箱" readonly :clearable="false"/>

        <AppInput :model="userProfile" prop="name" label="姓名"/>
        <AppSelect :model="userProfile" prop="idType" label='证件类型' dict-type="ID_TYPE"/>
        <AppInput :model="userProfile" prop="idNo" label="证件号码"/>
    </AppForm>
</template>

<script>
    export default {
        data() {
            return {
                userProfile: {},
                rules: {
                    name: [
                        {max: 32, message: '姓名最多32位', trigger: 'blur'}
                    ],
                    idNo: [
                        {validator: this.validateIdNo, trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            this.http.get('/userData').then(data => {
                let user = data.user;
                this.userProfile = {
                    userId: user.userId,
                    email: user.email,
                    name: user.name,
                    idType: user.idType,
                    idNo: user.idNo
                };
            }).catch(res => {
                this.error(res.respMsg);
            });
        },
        methods: {
            validateIdNo: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                this.http.post('/validate/idNo', {idNo: value}).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            handleSuccess() {
                this.success('更新成功');
            }
        }
    };
</script>
