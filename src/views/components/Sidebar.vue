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
        <Spin size="large" fix v-if="loading"></Spin>
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
                loading: false,
                menuList: [],
                openedNames: []
            };
        },
        methods: {
            handleSelect(name) {
                this.$emit('on-select', name);
            },
            getOpenedNamesByActiveName(name) {
                let res = [];
                for (let i = 0; i < this.menuList.length; i++) {
                    let menu = this.menuList[i];
                    if (!menu.children) {
                        continue;
                    }
                    for (let j = 0; j < menu.children.length; j++) {
                        if (name.startsWith(menu.children[j].menuCode)) {
                            res.push(menu.menuCode);
                            return res;
                        }
                    }
                }
                return res;
            }
        },
        watch: {
            activeName(route) {
                let openedNames = this.getOpenedNamesByActiveName(route.name);
                if (openedNames.length) {
                    this.openedNames = openedNames;
                }
            },
            openedNames() {
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened();
                });
            }
        },
        mounted() {
            this.loading = true;
            this.http.get('/menus').then(data => {
                this.loading = false;
                this.menuList = data.menus;
                this.openedNames = this.getOpenedNamesByActiveName(this.$route.name);
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened();
                    this.$refs.menu.updateActiveName();
                });
            }).catch(res => {
                this.loading = false;
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
        min-height: 200px;
        background: #fff !important;
        float: left;
    }
</style>
