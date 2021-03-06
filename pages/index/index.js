import { AuthorIzation, wechatLogin, ajax } from '../../utils/util.js';
import { index_page } from '../../utils/config.js';
Page({
    data: {
        swiperActive: 0,    // 轮播图Index
        swiperList: [       // 轮播图地址
            {
                path: '/pages/web-view/web-view?view_index=0',
                src: 'https://style.org.hc360.com/images/prod/banner1.jpg'
            }, {
                path: '/pages/detail/detail?id=2',
                src: 'https://style.org.hc360.com/images/prod/banner2.jpg'
            }, {
                path: '/pages/detail/detail?id=5',
                src: 'https://style.org.hc360.com/images/prod/banner3.jpg'
            }
        ],
        /**
         * [hotTab [Array] ]
         * [ 轮播图之下的4个tab ]
         * [-------------------------------------------------]
         */
        hotTab: [
            {
                icon: 'ico1',
                text: '电梯',
                catid: 100000005
            },
            {
                icon: 'ico2',
                text: '吊顶',
                catid: 100000006
            },
            {
                icon: 'ico3',
                text: '螺栓',
                catid: 100000003
            },
            {
                icon: 'ico4',
                text: '螺母',
                catid: 100000004
            }
        ],
        // hotTxt: ['响应建筑节能大潮设计成趋势响应建筑节能大趋势响应建筑节能大'],   // 今日热点的数据
        // 大家都在看的数据列表
        search_list: []
    },
    /**
     * [onLoad() 初始调用数据]
     * [-------------------------------------------------]
     */
    onLoad () {
        // 获取大家都在看数据 pageNo：1
        this.getSearchList();
    },
    /**
     * [getSearchList() 获取大家都在看数据接口 ]
     * [pageNo: {default: 1} ps: 页面分页]
     * [-------------------------------------------------]
     */
    getSearchList (pageNo = 0) {
        const _this = this;
        let search_list = _this.data.search_list;
        ajax({
            url: index_page.prodbytime + pageNo
        }).then(result => {
            wx.stopPullDownRefresh();
            if (result.content.length){
                _this.setData({
                    pageNo: result.number,
                    search_list: search_list.concat(result.content)
                });
            } else {
                wx.showToast({
                    title: '没有更多',
                    icon: 'none'
                });
            };
        });
    },
    /**
     * [swiperChange() 轮播图切换 ]
     * [e: 事件对象 ps:获取当前切换Index]
     * [-------------------------------------------------]
     */
    swiperChange (e) {
        let index = e.detail.current;
        this.setData({
            swiperActive: index
        });
    },
    /**
     * [onReachBottom() 上拉加载 ]
     * [e: 当页面达到最底部触发]
     * [-------------------------------------------------]
     */
    onReachBottom () {
        let pageNo = this.data.pageNo;
        pageNo += 1;
        this.getSearchList(pageNo);
    },
    /**
     * [onPullDownRefresh() 下拉刷新 ]
     * [e: 当页面达到最底部触发]
     * [-------------------------------------------------]
     */
    onPullDownRefresh () {
        this.setData({
            search_list: []
        }, () => {
            this.onLoad();
        });
    }
});































// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//       console.log(this.data.canIUse)
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
// // goSearchPage