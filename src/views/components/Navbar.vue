<template>
    <div class="navbar">
        <div class="content">
            <router-link to="/" class="logo">
                <img src="/static/images/logo.png"/>
            </router-link>

            <Dropdown class="navbar-user" trigger="click" @on-click="handleClick" placement="bottom-end">
                <a class="avatar">
                    <img :src="getAvatar()"/>
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name="logout">安全退出</DropdownItem>
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
                        this.util.removeToken();
                        this.http.get('logout').then(() => {
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
    @import "../../../my-theme/custom";

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
            margin-right: 10px;
            float: right;

            .avatar {
                display: inline-block;
                height: 50px;

                img {
                    margin-top: 8px;
                    height: 43px;
                    width: 43px;
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
