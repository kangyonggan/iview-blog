<template>
    <div class="navbar">
        <div class="content">
            <router-link to="/" class="logo">
                <img src="/static/images/logo.png"/>
            </router-link>

            <Dropdown class="navbar-user" trigger="click" @on-click="handleClick" placement="bottom-end">
                <a class="avatar">
                    <img :src="getAvatar()"/>
                    <Icon type="md-arrow-dropdown" color="#999"/>
                </a>
                <DropdownMenu slot="list">
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
            user: {
                type: Object,
                default: {}
            }
        },
        methods: {
            handleClick(name) {
                switch (name) {
                    case 'logout': {
                        this.http.get('logout').then(() => {
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
            },
            getAvatar: function () {
                let avatar = this.user.avatar;
                return avatar ? this.baseUrl + avatar : '/static/images/avatar.jpg';
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
