<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="article" inline>
            <AppInput :model="article" prop="title" placeholder="请输入文章标题"/>
            <AppDatePicker type="daterange" :model="article" prop="createdTime" placeholder="请选择创建日期"/>
            <Row>
                <Button type="info" icon="md-search" @click="$refs['table'].refresh()">查询</Button>
                <Button type="warning" icon="md-refresh" @click="$refs['queryForm'].resetFields()">清除</Button>
                <Button type="primary" icon="md-add" @click="handleCreate">新增</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="/sites/article" :columns="columns" :form="$refs.queryForm">
            <!--表格的操作-->
            <template slot-scope="{row, index}">
                <Button shape="circle" icon="md-build" title="编辑" @click="handleEdit(row)"></Button>
                <Button shape="circle" icon="md-trash" title="逻辑删除/恢复" @click="handleDelete(row)"></Button>
            </template>
        </AppTable>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                article: {},
                columns: [
                    {
                        title: '文章ID',
                        key: 'articleId',
                        sortable: true
                    },
                    {
                        title: '文章标题',
                        key: 'title',
                        sortable: true,
                        minWidth: 300
                    },
                    {
                        title: '阅读量',
                        key: 'viewNum',
                        sortable: true
                    },
                    {
                        title: '逻辑删除',
                        key: 'isDeleted',
                        sortable: true,
                        render: (h, params) => {
                            return h('span', params.row.isDeleted ? '是' : '否');
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime',
                        sortable: true,
                        minWidth: 10,
                        render: (h, params) => {
                            return h('span', this.dateFormat(params.row.createdTime, 'yyyy-MM-dd HH:mm:ss'));
                        }
                    }, {
                        title: '操作',
                        slot: 'actions'
                    }]
            };
        },
        methods: {
            /**
             * 逻辑删除
             *
             * @param row
             */
            handleDelete: function (row) {
                let title = row.isDeleted ? '恢复' : '删除';
                let that = this;
                this.$Modal.confirm({
                    title: title + '确认',
                    content: '确认' + title + row.title + '吗？',
                    loading: true,
                    closable: true,
                    onOk: function () {
                        const data = {isDeleted: 1 * !row.isDeleted, articleId: row.articleId};
                        this.http.post('/sites/article/delete', data).then(() => {
                            that.$refs['table'].refresh();
                        }).catch(res => {
                            that.error(res.respMsg);
                        });
                        that.$Modal.remove();
                    }
                });
            },
            handleCreate: function () {
                this.$router.push({
                    name: 'SITES_ARTICLE_FORM'
                });
            },
            handleEdit: function (row) {
                this.$router.push({
                    name: 'SITES_ARTICLE_FORM',
                    query: {
                        articleId: this.util.encryptUrl(row.articleId)
                    }
                });
            }
        }
    };
</script>

<style scoped>
</style>
