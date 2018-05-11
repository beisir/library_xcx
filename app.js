import { AuthorIzation, wechatLogin } from './utils/util.js';
App({
    onLaunch: function () {
        const _this = this;
        wechatLogin((options) => {
            _this.globalData.openID = options.openid;
        });

        // AuthorIzation().then((options) => {
        //     // console.log(options);
        // }).catch(err => {
        //     console.log(err)
        // });
    },
    globalData: {
        openID: null,
        userInfo: null
    }
})



// "pages/ask/ask",                     // 问答页面
// "pages/index/index",                 // 首页
// "pages/detail/detail",               // 详情页
// "pages/distribution/distribution",   // 产品库
// "pages/quote/quote",                 // 报价
// "pages/collection/collection",       // 收藏
// "pages/score-1/score-1",             // 评价打分星星
// "pages/edit/edit",                   // 身份类型页面
// "pages/instructions/instructions",   // 操作说明
// "pages/fill-ask/fill-ask",           // 产品库输入文字提交厂商
// "pages/ask-detail/ask-detail",       // 问答详情页面
// "pages/pro-contrast/pro-contrast",   // 产品库添加对比商品
// "pages/contrast-2/contrast-2",       // 对比结果页面vs
// "pages/score-2/score-2",             // 确认发布评论页面
// "pages/news/news",                   // 咨询页面
// "pages/problems/problems",           // 常见问题
// "pages/download-img/download-img",   // 选择多张图片下载
// "pages/about-us/about-us",           // 关于我们介绍页
// "pages/manage/manage",               // 我的页面
// "pages/class/class",                 // 分类页面
// "pages/search/search",               // 搜索 历史词页面
// "pages/search-list/search-list",     // 搜索列表 商机列表
// "pages/web-view/web-view"            // 链接外部链接页面