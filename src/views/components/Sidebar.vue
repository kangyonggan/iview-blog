<template>
    <Sider class="sider" hide-trigger collapsible :width="210" :collapsed-width="70">
        <Menu ref="menu" :active-name="$route.name" :accordion="true" theme="light"
              :open-names="openedNames" width="auto" @on-select="handleSelect">
            <Submenu :name="menu.menuCode" v-for="menu in menuList" :key="menu.menuCode">
                <template slot="title">
                    <Icon :type="menu.icon"/>
                    {{menu.menuName}}
                </template>
                <MenuItem :name="subMenu.menuCode" v-for="subMenu in menu.children" :key="subMenu.menuCode">
                    {{subMenu.menuName}}
                </MenuItem>
            </Submenu>
        </Menu>
    </Sider>
</template>

<script>
    export default {
        props: {
            activeName: {
                type: Object
            }
        },
        data() {
            return {
                menuList: [],
                openedNames: []
            };
        },
        methods: {
            handleSelect(name) {
                this.$emit('on-select', name);
            },
            getOpenedNamesByActiveName(name) {
                return this.$route.matched.map(item => item.name).filter(item => (item !== name && item !== 'layout'));
            }
        },
        watch: {
            activeName(route) {
                this.openedNames = this.getOpenedNamesByActiveName(route.name);
            },
            openedNames() {
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened();
                });
            }
        },
        mounted() {
            this.http.get('menus').then(data => {
                this.menuList = data.menus;
                this.openedNames = this.getOpenedNamesByActiveName(this.$route.name);
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened();
                    this.$refs.menu.updateActiveName();
                });
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
        }
    };
</script>

<style lang="less">
    .sider {
        float: left;
        height: ~"calc(100% - 60px)";
        overflow: scroll;

        & > div, & > div > ul {
            height: 100%;
        }
    }
</style>
