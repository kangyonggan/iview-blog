<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="novel" inline>
            <AppInput :model="novel" prop="name" placeholder="请输入小说名称"/>
            <AppInput :model="novel" prop="author" placeholder="请输入作者名称"/>
            <Row>
                <Button type="info" icon="md-search" @click="$refs['table'].refresh()">查询</Button>
                <Button type="warning" icon="md-refresh" @click="$refs['queryForm'].resetFields()">清除</Button>
                <Button type="primary" icon="md-add" @click="handleCreate">新增</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="/sites/novel" :columns="columns" :form="$refs.queryForm">
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
                novel: {},
                columns: [
                    {
                        title: '小说ID',
                        key: 'novelId',
                        sortable: true
                    },
                    {
                        title: '小说名称',
                        key: 'name',
                        sortable: true
                    },
                    {
                        title: '作者',
                        key: 'author',
                        sortable: true
                    },
                    {
                        title: '封面',
                        key: 'cover',
                        sortable: true,
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        window.open(params.row.cover);
                                    }
                                }
                            }, '查看');
                        }
                    },
                    {
                        title: '简介',
                        key: 'summary',
                        sortable: true,
                        minWidth: 450
                    },
                    {
                        title: '逻辑删除',
                        key: 'isDeleted',
                        sortable: true,
                        render: (h, params) => {
                            return h('span', params.row.isDeleted ? '是' : '否');
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
                    content: '确认' + title + row.name + '吗？',
                    loading: true,
                    closable: true,
                    onOk: function () {
                        const data = {isDeleted: 1 * !row.isDeleted, novelId: row.novelId};
                        this.http.post('/sites/novel/delete', data).then(() => {
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
                    name: 'SITES_NOVEL_CREATE'
                });
            },
            handleEdit: function (row) {
                this.$router.push({
                    name: 'SITES_NOVEL_EDIT',
                    params: {
                        novelId: this.util.encryptUrl(row.novelId)
                    }
                });
            }
        }
    };
</script>

<style scoped>
</style>
