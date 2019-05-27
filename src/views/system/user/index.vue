<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="user" class="bg-white" inline>
            <AppInput :model="user" prop="email" placeholder="请输入电子邮箱"/>
            <AppDatePicker type="daterange" :model="user" prop="createdTime" placeholder="创建日期"/>
            <Row>
                <Button type="info" icon="ios-search" @click="$refs['table'].refresh()">查询</Button>
                <Button type="warning" icon="ios-refresh" @click="$refs['queryForm'].resetFields()">清除</Button>
                <Button type="primary" icon="ios-add">新增</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="/system/user" :columns="columns" :form="$refs.queryForm">
            <!--表格的操作-->
            <template slot-scope="{row, index}">
                <Icon type="ios-create-outline" color="blue" :size="18" title="编辑"/>
                <Icon type="ios-trash-outline" color="red" :size="18" title="逻辑删除"/>
                <Icon type="ios-eye-outline" color="#f90" :size="18" title="修改密码"/>
                <Icon type="ios-people-outline" color="green" :size="18" title="设置角色"/>
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
                        slot: 'actions'
                    }]
            };
        },
        methods: {
            /**
             * 逻辑删除
             *
             * @param row
             * @param index
             */
            delete: function (row, index) {
                console.log('delete');
                console.log(row);
                console.log(index);
            }
        }
    };
</script>

<style scoped>
</style>
