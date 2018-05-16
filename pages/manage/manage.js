import { ajax, AuthorIzation, wechatLogin} from '../../utils/util.js';
import { manage } from '../../utils/config.js';
Page({
    data: {
        // 授权默认信息
        userInfo: {
            nickName: '点击授权',
            avatarUrl: 'https://style.org.hc360.com/images/microMall/program/mGrayLogo.png'
        },
        // 个人中心选择列表
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
        // 店主类型默认信息
        shopName: '实体店店主',
        aniStyle: false,
        // 店主类型共8中类型
        shopkeeper: ['实体店店主', '微商店主', '国内电商', '跨境电商', '贸易公司', '生产加工企业', '其他']
    },
    onLoad () {
        const _this = this,
            shopkeeper = this.data.shopkeeper;
        AuthorIzation().then((options) => {
            _this.setData({
                userInfo: options
            });
        });
        wechatLogin(({openid}) => {
            ajax({
                url: manage.getUser,
                data: {
                    openid: openid
                }
            }).then(result => {
                _this.setData({
                    shopName: shopkeeper[result]
                });
            });
        });
    },
    /**
     * [userInfoHandler() ]
     * [ps: 获取用户信息授权]
     * [-------------------------------------------------]
     */
    userInfoHandler(e) {
        const _this = this;
        AuthorIzation(e).then((options) => {
            _this.setData({
                userInfo: options
            });
        });
    },
    /**
     * [hideSlide() ]
     * [ps: 隐藏店主类型上拉弹框]
     * [-------------------------------------------------]
     */
    hideSlide () {
        this.setData({
            aniStyle: false
        });
    },
    /**
     * [catchClickFn() ]
     * [ps: 显示店主类型上拉弹框]
     * [-------------------------------------------------]
     */
    catchClickFn () {
        this.setData({
            aniStyle: true
        });
    },
    /**
     * [selectShop() 选择修改店主类型事件]
     * [ps: 。。。。]
     * [-------------------------------------------------]
     */
    selectShop (e) {
        let { index } = e.currentTarget.dataset,
            shopkeeper = this.data.shopkeeper;
        const _this = this;
        wechatLogin(({openid}) => {
            ajax({
                url: manage.addUser,
                data: {
                    openid: openid,
                    ui: index
                }
            }).then(result => {
                if (result){
                    wx.showToast({
                        title: '修改成功'
                    });
                    _this.setData({
                        shopName: shopkeeper[index],
                        aniStyle: false
                    });
                } else {
                    wx.showToast({
                        title: '修改失败',
                        icon: 'none'
                    });
                    _this.setData({
                        aniStyle: false
                    });
                };
                
            });
        })
        
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
});