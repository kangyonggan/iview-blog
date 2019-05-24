<template>
    <Sider class="sider" hide-trigger collapsible :width="210" :collapsed-width="70">
        <Menu ref="menu" :active-name="activeName.name" :accordion="true" theme="light"
              width="auto" @on-select="handleSelect">
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
        methods: {
            handleSelect(name) {
                this.$emit('on-select', name);
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
