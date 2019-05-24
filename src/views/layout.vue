<template>
    <div class="layout">
        <Navbar/>
        <Sidebar :menu-list="menuList" :active-name="$route"/>
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
