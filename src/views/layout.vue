<template>
    <div class="layout">
        <Navbar :user="user"/>
        <Sidebar :activeName="$route" @on-select="turnToPage"/>
        <div class="main">
            <TagsNav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
            <keep-alive>
                <div style="margin: 10px;clear: both">
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
                user: {},
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
            handleCloseTag (res, route) {
                this.tagNavList = res;
                this.util.setTagNavList(this.user.userId, res);
                if (route) {
                    this.handleClick(route);
                }
            },
            // 激活Tab页
            handleClick (item) {
                this.$router.push({
                    name: item.name,
                    params: item.meta.params,
                    query: item.meta.query
                })
            }
        },
        mounted() {
            this.http.get('userData').then(data => {
                this.user = data.user;

                this.tagNavList = this.util.getTagNavList(this.user.userId);
            }).catch(res => {
                this.error(res.respMsg);
            });
        },
        watch: {
            '$route' (newRoute) {
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

                    this.util.setTagNavList(this.user.userId, this.tagNavList);
                }
            }
        }
    };
</script>

<style lang="less">
    @import "../../my-theme/custom";

    .ivu-tag {
        .ivu-tag-dot-inner {
            background: @primary-color;
        }
    }

    .ivu-tag-default {
        .ivu-tag-dot-inner {
            background: #e3e8ee !important;
        }
    }

    .layout {
        height: 100%;
    }

    .main {
        float: left;
        width: ~"calc(100% - 210px)";
    }
</style>
