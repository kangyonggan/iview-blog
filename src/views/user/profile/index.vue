<template>
    <div>
        <Tabs type="card">
            <TabPane label="我的头像">
                <UploadAvatar/>
            </TabPane>
            <TabPane label="基础信息">
                基础信息
                <!--<EditProfile/>-->
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import UploadAvatar from './upload-avatar';
    // import EditProfile from './edit-profile';

    export default {
        components: {UploadAvatar}
    };
</script>
