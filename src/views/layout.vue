<template>
    <div class="layout">
        <Navbar :avatar="avatar"/>
        <Sidebar :activeName="$route" @on-select="turnToPage"/>
        <div class="main">
            <TagsNav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
            <keep-alive>
                <div style="margin: 20px;clear: both">
                    <router-view/>
                </div>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import Navbar from './components/Navbar';
    import Sidebar from './components/Sidebar';
    import TagsNav from './components/TagsNav';

    export default {
        components: {Navbar, Sidebar, TagsNav},
        data() {
            return {
                tagNavList: []
            };
        },
        methods: {
            // 点击菜单
            turnToPage(name) {
                this.$router.push({
                    name: name
                });
            },
            // 关闭Tab页
            handleCloseTag(res, route) {
                this.tagNavList = res;
                this.util.setTagNavList(this.$store.state.app.user.userId, res);
                if (route) {
                    this.handleClick(route);
                }
            },
            // 激活Tab页
            handleClick(item) {
                this.$router.push({
                    name: item.name,
                    params: item.meta.params,
                    query: item.meta.query
                });
            }
        },
        mounted() {
            this.http.get('userData').then(data => {
                let user = data.user;
                this.$store.commit('setUser', user);

                this.tagNavList = this.util.getTagNavList(user.userId);
            }).catch(res => {
                if (res.respCo === '9998') {
                    this.util.removeToken();
                    this.$router.push({
                        name: 'login'
                    });
                } else {
                    this.error(res.respMsg);
                }
            });
        },
        computed: {
            avatar: function () {
                return this.$store.state.app.user.avatar;
            }
        },
        watch: {
            '$route'(newRoute) {
                let exists = false;
                for (let i = 0; i < this.tagNavList.length; i++) {
                    if (this.tagNavList[i].name === newRoute.name) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    this.tagNavList.push({
                        name: newRoute.name,
                        meta: {
                            title: newRoute.meta.title
                        }
                    });

                    this.util.setTagNavList(this.$store.state.app.user.userId, this.tagNavList);
                }
            }
        }
    };
</script>

<style lang="less">
    .layout {
        height: 100%;
    }

    .main {
        float: left;
        min-height: ~"calc(100% - 60px)";
        border-left: 1px solid #d2d2d2;
        width: ~"calc(100% - 218px)";
    }
</style>
