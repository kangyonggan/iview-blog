<template>
    <div class="layout">
        <Navbar :user="user"/>
        <Sidebar :menuList="menuList" :activeName="$route"/>
        <div class="main">
            <TagsNav :value="$route" :list="tagNavList"/>
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
                collapsed: false,
                user: {},
                menuList: [],
                tagNavList: [{
                    name: 'index',
                    meta: {
                        title: '首页'
                    }
                }, {
                    name: 'system-user',
                    meta: {
                        title: '用户管理'
                    }
                }]
            };
        },
        mounted() {
            this.http.get('userData').then(data => {
                this.user = data.user;
                this.menuList = data.menu.children;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style lang="less">
    .layout {
        height: 100%;
    }

    .main {
        float: left;
        width: ~"calc(100% - 210px)";
    }
</style>
