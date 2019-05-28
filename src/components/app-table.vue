<template>
    <div style="margin-top: 20px; margin-bottom: 20px;">
        <!--表格-->
        <Table :loading="loading" border highlight-row :columns="columns" :data="pageInfo.list"
               @on-sort-change="sortChange">
            <span slot-scope="{row, index}" slot="actions" class="actions">
                <slot :row="row" :index="index"></slot>
            </span>
        </Table>

        <!--分页-->
        <Page v-if="pagination" v-show="pageInfo.pages > 1" :current="params.pageNum" :total="pageInfo.total" show-total
              show-sizer show-elevator :style="{marginTop: '20px'}"
              @on-change="jump" @on-page-size-change="changePageSize"/>
    </div>
</template>

<script>
    import Vue from 'vue';

    const AppTable = {
        props: {
            url: {
                required: true,
                type: String
            },
            columns: {
                required: true,
                type: Array
            },
            form: {
                type: Object
            },
            sort: {
                type: String
            },
            desc: {
                type: Boolean,
                default: true
            },
            pagination: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                /**
                 * 分页参数
                 */
                params: {
                    pageNum: 1
                },
                /**
                 * 分页信息
                 */
                pageInfo: {},
                /**
                 * 表格加载中
                 */
                loading: false
            };
        },
        mounted: function () {
            if (this.sort) {
                this.params.sort = this.sort;
                this.params.order = this.desc ? 1 : 0;
            }
            this.refresh();
        },
        methods: {
            /**
             * 刷新
             */
            refresh: function () {
                this.loading = true;
                let params = this.form ? Object.assign(this.params, this.form.model || {}) : this.params;
                this.http.post(this.url, params).then(data => {
                    this.loading = false;
                    this.pageInfo = data.pageInfo;
                }).catch(res => {
                    this.loading = false;
                    this.error(res.respMsg);
                });
            },
            /**
             * 修改分页大小
             */
            changePageSize: function (pageSize) {
                this.params.pageSize = pageSize;
                this.jump(1);
            },
            /**
             * 跳转
             */
            jump: function (pageNum) {
                this.params.pageNum = pageNum;

                this.refresh();
            },
            /**
             * 排序
             */
            sortChange: function (e) {
                if (e.order !== 'normal') {
                    this.params.sort = e.key;
                    this.params.order = e.order === 'asc' ? 0 : 1;
                } else {
                    this.params.sort = '';
                    this.params.order = 0;
                }

                this.jump(1);
            }
        }
    };

    export default AppTable;

    Vue.component('AppTable', AppTable);
</script>

<style>
    .actions i {
        cursor: pointer;
    }
</style>
