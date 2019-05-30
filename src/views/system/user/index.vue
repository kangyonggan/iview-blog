<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="user" inline>
            <AppInput :model="user" prop="email" placeholder="请输入电子邮箱"/>
            <AppDatePicker type="daterange" :model="user" prop="createdTime" placeholder="请选择创建日期"/>
            <Row>
                <Button type="info" icon="md-search" @click="$refs['table'].refresh()">查询</Button>
                <Button type="warning" icon="md-refresh" @click="$refs['queryForm'].resetFields()">清除</Button>
                <Button type="primary" icon="md-add" @click="$refs['createModal'].show()">新增</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="/system/user" :columns="columns" :form="$refs.queryForm">
            <!--表格的操作-->
            <template slot-scope="{row, index}">
                <Button shape="circle" icon="md-build" title="编辑" @click="handleEdit(row)"></Button>
                <Button shape="circle" icon="md-trash" title="逻辑删除/恢复" @click="handleDelete(row)"></Button>
                <Button shape="circle" icon="md-lock" title="修改密码" @click="editPassword(row)"></Button>
            </template>
        </AppTable>

        <!--新增界面-->
        <CreateModal ref="createModal" @success="$refs['table'].refresh()"/>

        <!--编辑界面-->
        <EditModal ref="editModal" @success="$refs['table'].refresh()"/>

        <!--修改密码界面-->
        <PasswordModal ref="passwordModal"/>
    </div>
</template>
<script>
    import CreateModal from './create-modal.vue';
    import EditModal from './edit-modal.vue';
    import PasswordModal from './password-modal.vue';

    export default {
        components: {CreateModal, EditModal, PasswordModal},
        data() {
            return {
                user: {},
                columns: [
                    {
                        title: '用户ID',
                        key: 'userId',
                        sortable: true
                    },
                    {
                        title: '电子邮箱',
                        key: 'email',
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
                    },
                    {
                        title: '更新时间',
                        key: 'updatedTime',
                        sortable: true,
                        minWidth: 10,
                        render: (h, params) => {
                            return h('span', this.dateFormat(params.row.updatedTime, 'yyyy-MM-dd HH:mm:ss'));
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
                    content: '确认' + title + row.email + '吗？',
                    loading: true,
                    closable: true,
                    onOk: function () {
                        const data = {isDeleted: 1 * !row.isDeleted, userId: row.userId};
                        this.http.post('/system/user/delete', data).then(() => {
                            that.$refs['table'].refresh();
                        }).catch(res => {
                            that.error(res.respMsg);
                        });
                        that.$Modal.remove();
                    }
                })
            },
            /**
             * 编辑
             *
             * @param row
             */
            handleEdit: function (row) {
                this.$refs['editModal'].show({userId: row.userId, email: row.email});
            },
            /**
             * 修改密码
             * @param row
             */
            editPassword: function (row) {
                this.$refs.passwordModal.show({userId: row.userId, email: row.email});
            }
        }
    };
</script>

<style scoped>
</style>
