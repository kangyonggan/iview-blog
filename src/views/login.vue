<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="用户登录">
                <div class="form-con">
                    <Form ref="loginForm" :model="user" :rules="rules">
                        <FormItem prop="email">
                            <Input type="email" v-model="user.email" placeholder="请输入电子邮箱" clearable>
                                <span slot="prepend">
                                  <Icon :size="16" type="md-mail"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="user.password" placeholder="请输入密码" clearable>
                                <span slot="prepend">
                                  <Icon :size="14" type="md-lock"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="submit" :loading="loading" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {email: 'admin@kangyonggan.com', password: '11111111'},
                loading: false,
                rules: {
                    email: [
                        {required: true, message: '电子邮箱为必填项', trigger: 'blur'},
                        {max: 64, message: '电子邮箱最多为64位', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]+@[a-z0-9]+\.[a-z0-9]+$/, message: '电子邮箱格式错误', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]{8,20}$/, message: '密码必须是8至20位的字母、数字或下划线', trigger: 'blur'}
                    ]
                }
            };
        },

        methods: {
            submit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.http.post('login', this.user).then(res => {
                            this.util.setToken(res[this.util.tokenKey]);

                            this.$router.push({
                                name: 'index'
                            });
                        }).catch(res => {
                            this.error(res.respMsg);
                            this.loading = false;
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .login {
        width: 100%;
        height: 100%;
        background-image: url('/static/images/login_bg.jpg');
        background-size: cover;
        background-position: center;
        position: relative;

        &-con {
            position: absolute;
            right: 160px;
            top: 50%;
            transform: translateY(-60%);
            width: 300px;

            &-header {
                font-size: 16px;
                font-weight: 300;
                text-align: center;
                padding: 30px 0;
            }

            .form-con {
                padding: 10px 0 0;
            }
        }
    }
</style>
