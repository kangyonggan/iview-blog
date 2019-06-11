<template>
    <div class="navbar">
        <div class="content">
            <router-link to="/" class="logo">
                <img src="/static/images/logo.png"/>
            </router-link>

            <Dropdown class="navbar-user" trigger="click" @on-click="handleClick" placement="bottom-end">
                <a class="avatar">
                    <img :src="avatar"/>
                    <Icon type="md-arrow-dropdown" color="#999"/>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name="profile">
                        <Icon type="md-person" size="18"/>
                        个人资料
                    </DropdownItem>
                    <DropdownItem name="logout">
                        <Icon type="md-log-out" size="18"/>
                        安全退出
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            avatar: {
                type: String
            }
        },
        methods: {
            handleClick(name) {
                switch (name) {
                    case 'profile': {
                        this.$router.push({
                            name: 'USER_PROFILE'
                        });
                        break;
                    }
                    case 'logout': {
                        this.http.get('/logout').then(() => {
                            this.util.removeToken();
                            this.$router.push({
                                name: 'login'
                            });
                        }).catch(() => {
                            this.util.removeToken();
                            this.$router.push({
                                name: 'login'
                            });
                        });
                        break;
                    }
                }
            }
        }
    };
</script>

<style scoped lang="less">
    .navbar {
        height: 60px;
        background: #fff;
        border-bottom: 1px solid #f5f5f5;

        .logo {
            float: left;
            display: inline-block;
            height: 60px;
            margin-left: 10px;

            img {
                height: 60px;
            }
        }

        &-user {
            margin-right: 20px;
            float: right;

            .avatar {
                display: inline-block;
                height: 50px;

                img {
                    margin-top: 15px;
                    height: 35px;
                    width: 35px;
                    border-radius: 50%;
                    border: 1px solid #cccccccc;
                }

                i {
                    float: right;
                    margin-top: 30px;
                    margin-left: 5px;
                }
            }
        }
    }
</style>
