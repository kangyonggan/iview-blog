<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="user" class="bg-white" inline>
            <AppInput :model="user" prop="email" placeholder="请输入电子邮箱"/>
            <AppDatePicker type="daterange" :model="user" prop="createdTime" placeholder="创建日期"/>
            <Row>
                <Button type="info" icon="ios-search" @click="$refs['table'].refresh()">查询</Button>
                <Button type="warning" icon="ios-refresh-empty" @click="$refs['queryForm'].resetFields()">清除</Button>
                <Button type="primary" icon="plus">新增</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="/system/user" :columns="columns" :form="$refs.queryForm" @dblclick="dblclick">
            <!--表格的操作-->
            <template slot-scope="{row, index}" slot="action">
                <span>action</span>
            </template>
        </AppTable>
    </div>
</template>
<script>
    export default {
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
                        title: '注册时间',
                        key: 'createdTime',
                        sortable: true,
                        render: (h, params) => {
                            return h('span', this.dateFormat(params.row.createdTime, 'yyyy-MM-dd HH:mm:ss'));
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'updatedTime',
                        sortable: true,
                        render: (h, params) => {
                            return h('span', this.dateFormat(params.row.updatedTime, 'yyyy-MM-dd HH:mm:ss'));
                        }
                    }, {
                        title: '操作',
                        // slot: 'action'
                    }]
            };
        },
        methods: {

            /**
             * 双击编辑
             *
             * @param row
             */
            dblclick: function (row) {
                console.log(row);
            }
        }
    };
</script>

<style scoped>
</style>
