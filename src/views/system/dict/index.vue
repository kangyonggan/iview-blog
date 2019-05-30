<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="dict" inline>
            <AppSelect :model="dict" prop="dictType" enum-key="DictType" placeholder="请选择字典类型"/>
            <AppInput :model="dict" prop="dictCode" placeholder="请输入字典代码"/>
            <AppDatePicker type="daterange" :model="dict" prop="createdTime" placeholder="请选择创建日期"/>
            <Row>
                <Button type="info" icon="md-search" @click="$refs['table'].refresh()">查询</Button>
                <Button type="warning" icon="md-refresh" @click="$refs['queryForm'].resetFields()">清除</Button>
                <Button type="primary" icon="md-add" @click="$refs['formModal'].show()">新增</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="/system/dict" :columns="columns" :form="$refs.queryForm">
            <!--表格的操作-->
            <template slot-scope="{row, index}">
                <Button shape="circle" icon="md-build" title="编辑" @click="handleEdit(row)"></Button>
                <Button shape="circle" icon="md-trash" title="逻辑删除/恢复" @click="handleDelete(row)"></Button>
            </template>
        </AppTable>

        <!--新增/编辑字典的界面-->
        <FormModal ref="formModal" @success="$refs.table.refresh()"/>
    </div>
</template>
<script>
    import FormModal from './form-modal.vue';

    export default {
        components: {FormModal},
        data() {
            return {
                dict: {},
                columns: [
                    {
                        title: '字典ID',
                        key: 'dictId',
                        sortable: true
                    },
                    {
                        title: '字典类型',
                        key: 'dictType',
                        sortable: true
                    },
                    {
                        title: '字典代码',
                        key: 'dictCode',
                        sortable: true
                    },
                    {
                        title: '值',
                        key: 'value',
                        sortable: true
                    },
                    {
                        title: '备注',
                        key: 'remark',
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
                    content: '确认' + title + row.dictType + '下的' + row.dictCode + '吗？',
                    loading: true,
                    closable: true,
                    onOk: function () {
                        const data = {isDeleted: 1 * !row.isDeleted, dictId: row.dictId};
                        this.http.post('/system/dict/delete', data).then(() => {
                            that.$refs['table'].refresh();
                        }).catch(res => {
                            that.error(res.respMsg);
                        });
                        that.$Modal.remove();
                    }
                });
            },
            /**
             * 编辑
             *
             * @param row
             */
            handleEdit: function (row) {
                this.$refs['formModal'].show({
                    dictId: row.dictId,
                    dictType: row.dictType,
                    dictCode: row.dictCode,
                    value: row.value,
                    remark: row.remark,
                    sort: row.sort
                });
            }
        }
    };
</script>

<style scoped>
</style>
