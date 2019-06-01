<template>
    <AppForm ref="modal" action="/sites/album/update" :model="album" :rules="rules" @success="formSuccess"
             @beforeUpload="beforeUpload">
        <AppInput :model="album" prop="albumId" label="相册ID" readonly :clearable="false"/>
        <AppInput :model="album" prop="albumName" label="相册名称"/>
        <AppInput :model="album" prop="cover" label="封面"/>
        <AppInput :model="album" prop="password" label="相册密码"/>

        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="uploadUrl + item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
            ref="upload"
            name="file"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png','gif']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            type="drag"
            :action="baseUrl + 'upload/album'"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal v-model="visible">
            <img :src="uploadUrl + imgUrl" v-if="visible" style="width: 100%">
        </Modal>
    </AppForm>
</template>

<script>
    import Config from '@/config/config';

    export default {
        props: {
            success: {
                type: Function
            }
        },
        data() {
            return {
                uploadUrl: Config.uploadUrl,
                baseUrl: Config.baseUrl,
                imgUrl: '',
                visible: false,
                defaultList: [],
                // uploadList: [],
                album: {},
                /**
                 * 表单的校验
                 */
                rules: {
                    albumName: [
                        {required: true, message: '相册名称为必填项', trigger: 'blur'},
                        {max: 64, message: '相册名称最多为64位', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '封面为必填项', trigger: 'blur'},
                        {max: 128, message: '封面最多128位', trigger: 'blur'}
                    ],
                    password: [
                        {max: 6, message: '密码最多6位', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            formSuccess() {
                this.$router.push({
                    name: 'SITES_ALBUM'
                })
            },
            beforeUpload() {
                let albumPhotos = [];
                const fileList = this.$refs.upload.fileList;
                for (let i = 0; i < fileList.length; i++) {
                    albumPhotos[i] = fileList[i].url;
                }
                this.album.albumPhotos = albumPhotos.join(',');
            },
            handleView(url) {
                this.imgUrl = url;
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess(res, file) {
                file.url = res.data.originFileName;
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '图片格式错误',
                    desc: file.name + '格式错误，请选择jpg,jpeg,png或gif'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '图片太大',
                    desc: file.name + '太大，不允许超过2M'
                });
            }
        },
        mounted() {
            let albumId = this.$route.params.albumId;

            this.http.post('/sites/album/detail', {'albumId': this.util.decrypt(decodeURIComponent(albumId))}).then(data => {
                let album = data.album;
                this.album = {
                    albumId: album.albumId,
                    albumName: album.albumName,
                    cover: album.cover,
                    password: album.password
                };

                for (let i = 0; i < data.albumPhotos.length; i++) {
                    this.defaultList[i] = {
                        name: data.albumPhotos[i].sort + '',
                        url: data.albumPhotos[i].url
                    };
                }
                // this.uploadList = this.$refs.upload.fileList;
                // console.log(this.uploadList);
            }).catch(res => {
                this.error(res.respMsg);
            });
        },
        computed: {
            uploadList: function () {
                return this.$refs['upload'].fileList;
            }
        }
    };
</script>

<style scoped>
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
