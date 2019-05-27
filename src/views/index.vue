<template>
    <div class="bg-white">
        <div class="content">
            <h3>一、基本功能</h3>
            <ul>
                <li>登录</li>
                <li>退出</li>
                <li>
                    系统
                    <ul>
                        <li>用户管理</li>
                        <li>角色管理</li>
                        <li>菜单管理</li>
                        <li>数据字典</li>
                    </ul>
                </li>
                <li>
                    网站
                    <ul>
                        <li>文章管理</li>
                        <li>相册管理</li>
                        <li>视频管理</li>
                        <li>小说管理</li>
                    </ul>
                </li>
            </ul>
            <div class="line"></div>
        </div>

        <div class="content">
            <h3>二、系统特色</h3>
            <ol>
                <li>单页面</li>
                <li>组件化</li>
                <li>动态路由</li>
                <li>权限控制</li>
                <li>传输加密</li>
                <li>Tab导航条</li>
                <li>文件上传</li>
                <li>...</li>
            </ol>
            <div class="line"></div>
        </div>

        <div class="content">
            <h3>三、中文文档</h3>
            <ul>
                <li><a target="_blank" href="https://cn.vuejs.org/v2/guide/">https://cn.vuejs.org/v2/guide/</a></li>
                <li><a target="_blank" href="https://www.iviewui.com/docs/guide/introduce">https://www.iviewui.com/docs/guide/introduce</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped>
    .content {
        padding-left: 20px;
    }

    ul, ol {
        margin-left: 30px;
    }

    .line {
        margin: 20px 0;
        height: 1px;
        border-bottom: 1px dashed #ccc;
    }
</style>
