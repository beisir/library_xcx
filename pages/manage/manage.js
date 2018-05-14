import { AuthorIzation, ajax, wechatLogin} from '../../utils/util.js';
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
                url: '/pages/distribution/distribution'
            },/*{
                icon: 'icon2',
                text: '我的提问',
                url: ''                
            },{
                icon: 'icon3',
                text: '我的收藏',
                url: '/pages/collection/collection'
            },*/{
                icon: 'icon4',
                text: '常见问题',
                url: '/pages/problems/problems'
            },{
                icon: 'icon5',
                text: '关于我们',
                url: '/pages/about-us/about-us'
            }
        ],
        aniStyle: false,
        shopkeeper: [1,2,3,4,5,6,7,8]
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
    },
    hideSlide () {
        this.setData({
            aniStyle: false
        });
    },
    catchClickFn () {
        this.setData({
            aniStyle: true
        });
    },
    selectShop (e) {
        console.log(e)
    }
    
    // , getPhoneNumber (e) {
    //     let { encryptedData, iv} = e.detail
        
    //     encryptedData && wechatLogin(({session_key}) => {
    //         ajax({
    //             url: 'http://10.158.33.180/wechat/decphone',
    //             method: 'POST',
    //             header: {
    //                 'Content-type': 'application/x-www-form-urlencoded'
    //             },
    //             data: {
    //                 encryptedData: encryptedData,
    //                 iv: iv,
    //                 session_key: session_key
    //             },
    //             success(options) {
    //                 console.log(options)
    //             }
    //         })
    //     }, true);



    //     console.log(e.detail.errMsg)
    //     console.log(e.detail.iv)
    //     console.log(e.detail.encryptedData)
    // }
    // ,
    // catchClickFn (e){
    //     wx.showActionSheet({
    //         itemList: ['A', 'B', 'C', 'E', 'A', 'B'],
    //         success: function (res) {
    //             console.log(res.tapIndex)
    //         },
    //         fail: function (res) {
    //             console.log(res.errMsg)
    //         }
    //     })

    // }
})