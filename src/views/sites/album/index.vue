<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="album" inline>
            <AppInput :model="album" prop="albumName" placeholder="请输入相册名称"/>
            <AppDatePicker type="daterange" :model="album" prop="createdTime" placeholder="请选择创建日期"/>
            <Row>
                <Button type="info" icon="md-search" @click="$refs['table'].refresh()">查询</Button>
                <Button type="warning" icon="md-refresh" @click="$refs['queryForm'].resetFields()">清除</Button>
                <Button type="primary" icon="md-add" @click="handleCreate">新增</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="/sites/album" :columns="columns" :form="$refs.queryForm">
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
                album: {},
                columns: [
                    {
                        title: '相册ID',
                        key: 'albumId',
                        sortable: true
                    },
                    {
                        title: '相册名称',
                        key: 'albumName',
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
                        title: '密码',
                        key: 'password',
                        sortable: true
                    },
                    {
                        title: '数量',
                        key: 'size',
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
                    content: '确认' + title + row.albumName + '吗？',
                    loading: true,
                    closable: true,
                    onOk: function () {
                        const data = {isDeleted: 1 * !row.isDeleted, albumId: row.albumId};
                        this.http.post('/sites/album/delete', data).then(() => {
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
                    name: 'SITES_ALBUM_CREATE'
                });
            },
            handleEdit: function (row) {
                this.$router.push({
                    name: 'SITES_ALBUM_EDIT',
                    params: {
                        albumId: this.util.encryptUrl(row.albumId)
                    }
                });
            }
        }
    };
</script>

<style scoped>
</style>
