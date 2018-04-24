import { AuthorIzation, wechatLogin } from './utils/util.js';
App({
    onLaunch: function () {
        const _this = this;
        wechatLogin((options) => {
            _this.globalData.openID = options.openid;
        });

        AuthorIzation().then((options) => {
            // console.log(options);
        }).catch(err => {
            console.log(err)
        });
    },
    
    // wx.authorize({
    //     scope: authorString,
    //     success(options) {
    //         console.log(options);
    //     }
    // });

    globalData: {
        openID: null,
        userInfo: null
    }
})