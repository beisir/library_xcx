import { AuthorIzation } from '../../utils/util.js';
Page({
    data: {
        userInfo: {
            nickName: '点击授权',
            avatarUrl: 'https://style.org.hc360.com/images/microMall/program/mGrayLogo.png'
        },
        manage_arr: [
            {
                icon: 'icon1',
                text: '分销申请记录',
                url: ''
            },{
                icon: 'icon2',
                text: '我的提问',
                url: ''                
            },{
                icon: 'icon3',
                text: '我的收藏',
                url: '/pages/collection/collection'
            },{
                icon: 'icon4',
                text: '常见问题',
                url: '/pages/problems/problems'
            },{
                icon: 'icon5',
                text: '关于我们',
                url: '/pages/about-us/about-us'
            }
        ]
    },
    onLoad () {
        const _this = this,
            userInfo = wx.getStorageSync('userInfo');
        if (userInfo !== '') {
            _this.setData({
                userInfo: userInfo
            });
        };
    },
    userInfoHandler(options) {
        const _this = this;
        let userInfo = options.detail.userInfo;
        if (userInfo) {
            _this.setData({
                userInfo: userInfo
            });
            wx.setStorageSync('userInfo', userInfo)
        }
    }


})