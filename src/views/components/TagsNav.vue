<template>
    <div class="tag-nav-wrapper">
        <div class="tags-nav">
            <div class="close-con">
                <Dropdown trigger="click" @on-click="handleTagsOption" style="margin-top:7px;" placement="bottom-end">
                    <Button size="small" type="text">
                        <Icon type="ios-close-circle-outline" :size="18"/>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="close-all">全部关闭</DropdownItem>
                        <DropdownItem name="close-others">关闭其他</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="btn-con left-btn">
                <Button icon="md-arrow-dropleft" type="text" @click="handleScroll(240)"></Button>
            </div>
            <div class="btn-con right-btn">
                <Button icon="md-arrow-dropright" type="text" @click="handleScroll(-240)"></Button>
            </div>
            <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
                <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
                    <transition-group name="taglist-moving-animation">
                        <Tag
                            type="dot"
                            v-for="item in list"
                            ref="tagsPageOpened"
                            :key="`tag-nav-${item.name}`"
                            :name="item.name"
                            @on-close="handleClose"
                            @click.native="handleClick(item)"
                            :closable="item.name!=='index'"
                            :color="item.name === value.name ? 'primary' : 'default'">
                            {{ item.meta.title }}
                        </Tag>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tagsNav',
        props: {
            value: Object,
            list: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                tagBodyLeft: 0
            };
        },
        methods: {
            handlescroll(e) {
                let type = e.type;
                let delta = 0;
                if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                    delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
                }
                this.handleScroll(delta);
            },
            handleScroll(offset) {
                if (offset > 0) {
                    this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
                } else {
                    if (this.$refs.scrollOuter.offsetWidth < this.$refs.scrollBody.offsetWidth) {
                        if (this.tagBodyLeft >= -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollOuter.offsetWidth)) {
                            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, this.$refs.scrollOuter.offsetWidth - this.$refs.scrollBody.offsetWidth);
                        }
                    } else {
                        this.tagBodyLeft = 0;
                    }
                }
            },
            handleTagsOption(type) {
                if (type === 'close-all') {
                    // 关闭所有，除了index
                    let res = this.list.filter(item => item.name === 'index');
                    this.$emit('on-close', res, this.getTag('index'));
                } else {
                    // 关闭除当前页和index页的其他页
                    let res = this.list.filter(item => item.name === this.value.name || item.name === 'index');
                    this.$emit('on-close', res, null);
                }
                // 移动到最左边
                this.tagBodyLeft = 0;
            },
            handleClose(e, name) {
                let res = this.list.filter(item => item.name !== name);
                let route = null;
                if (name === this.value.name) {
                    route = res[res.length - 1];
                }
                this.$emit('on-close', res, route);
            },
            handleClick(item) {
                this.$emit('input', item);
            },
            getTag(name) {
                for (let i in this.list) {
                    if (this.list[i].name === name) {
                        return this.list[i];
                    }
                }

                return null;
            }
        }
    };
</script>

<style lang="less" scoped>
    .no-select {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .size {
        width: 100%;
        height: 100%;
    }

    .tag-nav-wrapper {
        padding: 0;
        height: 40px;
        background: #F0F0F0;
    }

    .tags-nav {
        position: relative;
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
        .no-select;
        .size;

        .close-con {
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 32px;
            background: #fff;
            text-align: center;
            z-index: 9;
        }

        .btn-con {
            position: absolute;
            top: 0;
            height: 100%;
            background: #fff;
            padding-top: 3px;
            z-index: 9;

            button {
                padding: 6px 10px;
                text-align: center;
            }

            &.left-btn {
                left: 0;
            }

            &.right-btn {
                right: 32px;
                border-right: 1px solid #F0F0F0;
            }
        }

        .scroll-outer {
            overflow: hidden;
            position: absolute;
            left: 28px;
            right: 61px;
            top: 0;
            bottom: 0;
            box-shadow: 0 0 3px 2px rgba(100, 100, 100, .1) inset;

            .scroll-body {
                height: ~"calc(100% - 1px)";
                display: inline-block;
                padding: 1px 4px 0;
                margin: 0 6px;
                position: absolute;
                overflow: visible;
                white-space: nowrap;
                transition: left .3s ease;

                .ivu-tag-dot-inner {
                    transition: background .2s ease;
                }
            }
        }
    }
</style>
