import { AuthorIzation } from '../../utils/util.js';
Page({
    data: {
        userInfo: {
            nickName: '点击授权',
            avatarUrl: 'https://style.org.hc360.com/images/microMall/program/mGrayLogo.png'
        }
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