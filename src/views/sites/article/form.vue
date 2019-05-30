<template>
    <AppForm ref="modal" :action="article.articleId ? '/sites/article/update' : '/sites/article/save'"
              :title="article.articleId ? '编辑' : '新增' + '文章'" :model="article" :rules="rules" @success="handleSuccess">
        <AppInput :v-if="!!article.articleId" :model="article" prop="articleId" label="文章ID" readonly :clearable="false"/>
        <AppInput :model="article" prop="title" label="文章标题"/>
        <AppInput :model="article" prop="summary" label="摘要"/>
        <AppInput :model="article" prop="content" label="内容"/>
    </AppForm>
</template>

<script>
    export default {
        props: {
            success: {
                type: Function
            }
        },
        data() {
            return {
                article: {},
                /**
                 * 表单的校验
                 */
                rules: {
                    title: [
                        {required: true, message: '文章标题为必填项', trigger: 'blur'},
                        {max: 64, message: '文章标题最多为64位', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '摘要为必填项', trigger: 'blur'},
                        {max: 256, message: '摘要最多256位', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '内容为必填项', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSuccess() {
                this.$router.push({
                    name: 'SITES_ARTICLE'
                })
            }
        },
        mounted() {
            let articleId = this.$route.query.articleId;
            if (articleId) {
                this.http.post('/sites/article/detail', {'articleId': this.util.decrypt(articleId)}).then(data => {
                    this.article = data.article;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        }
    };
</script>
