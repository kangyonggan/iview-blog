<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="user" class="bg-white" inline>
            <AppInput :model="user" prop="email" placeholder="请输入电子邮箱" type="email"/>
            <AppDatePicker :model="user" prop="startDate" placeholder="注册开始日期"/>
            <AppDatePicker :model="user" prop="endDate" placeholder="注册结束日期"/>
            <Row>
                <Button type="primary" icon="plus">新增</Button>
            </Row>
        </Form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: {}
            };
        }
    };
</script>

<style scoped>
</style>
