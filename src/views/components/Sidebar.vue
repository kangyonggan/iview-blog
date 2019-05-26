<template>
    <Sider class="sider" hide-trigger collapsible :width="210" :collapsed-width="70">
        <Menu ref="menu" :active-name="activeName.name" :accordion="true" theme="light"
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
            menuList: {
                type: Array,
                default() {
                    return [];
                }
            },
            activeName: {
                type: Object
            }
        },
        data() {
            return {
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
