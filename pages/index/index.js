import { AuthorIzation, wechatLogin, ajax } from '../../utils/util.js';
import { index_page } from '../../utils/config.js';
Page({
    data: {
        swiperActive: 0,    // 轮播图Index
        swiperList: [       // 轮播图地址
            'https://192.168.120.32/images/cpk/bImg1.png',
            'https://192.168.120.32/images/cpk/bImg1.png',
            'https://192.168.120.32/images/cpk/bImg1.png'
        ],
        hotTab: [
            {
                icon: 'ico1',
                text: '装修建材',
                supcatid: '001001'
            },
            {
                icon: 'ico2',
                text: '五金工具',
                supcatid: '001001'
            },
            {
                icon: 'ico3',
                text: '建筑保温',
                supcatid: '001001'
            },
            {
                icon: 'ico4',
                text: '管材管件',
                supcatid: '001001'
            }
        ],
        // hotTxt: ['响应建筑节能大潮设计成趋势响应建筑节能大趋势响应建筑节能大'],   // 今日热点的数据
        search_list: []     // 大家都在看的数据列表
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
    getSearchList (pageNo = 1) {
        const _this = this;
        let search_list = _this.data.search_list;
        ajax({
            url: index_page.prodbytime + pageNo
        }).then(result => {
            console.log(result)
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