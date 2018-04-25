import { ajax, AuthorIzation, wechatLogin} from '../../utils/util.js';
import { detail } from '../../utils/config.js';
Page({
    data: {
        prodatt_arr: [],
        prodatt: {},
        prodimage: [],
        prodinfo: {
            price: 0
        },
        phoneNum: '010-xxxxxxxx',
        applicationId: ''
    },
    onLoad ({id}) {
        const _this = this;
        ajax({
            url: detail.prodinfo,
            data: {id: 1},
        }).then(result => {
            _this.setData({
                prodatt_arr: Object.keys(result.prodatt),
                prodatt: result.prodatt,
                prodimage: result.prodimage,
                prodinfo: result.prodinfo,
                phoneNum: result.mfbo.tel,
                applicationId: result.mfbo.id
            });
        });
    },
    imgInfo(e) {
        let index = e.currentTarget.dataset.index,
            prodimage = this.data.prodimage;
        // let img_arr = prodimage.map(res => res.name);
        let img_arr = ['https://192.168.120.32/images/microMall/program/dImg1.png'];
        wx.previewImage({
            current: img_arr[index], // 当前显示图片的http链接
            urls: img_arr // 需要预览的图片http链接列表
        });
    },
    /**
     * [application() ]
     * [申请分销 ]
     * [-------------------------------------------------]
     */
    application () {
        const _this = this;
        let {prodimage, prodinfo} = _this.data;
        // wechatLogin(({openid}) => {
        //     ajax({
        //         url: '',
        //         data: {
        //             prodimage :prodimage[0].name,
        //             prodinfoName: prodinfo.name,
        //             prodinfoPrice: prodinfo.price,
        //             openid: openid
        //         }
        //     }).then(res => {
        //         console.log(res);
        //     });
        // });
    },
    /**
     * [consultingPhone() ]
     * [ps: 咨询电话 ]
     * [-------------------------------------------------]
     */
    consultingPhone () {
        let phoneNum = this.data.phoneNum;
        wx.makePhoneCall({
            phoneNumber: phoneNum,
        });
    },
    /**
     * [onShareAppMessage() 分享]
     * [-------------------------------------------------]
     */
    onShareAppMessage: function (options) {
        const _this = this;
        let { prodinfo, prodimage } = _this.data,
            // shareImg = prodimage[0].name || '',
            shareImg = 'https://192.168.120.32/images/microMall/program/dImg1.png',
            title = prodinfo.name;
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        let shareObj = {
            // 默认是小程序的名称(可以写slogan等)
            title: title,
            // 默认是当前页面，必须是以‘/’开头的完整路径
            // path: 'pages/index/index',
            /*自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 
            imageUrl 则使用默认截图。显示图片长宽比是 5:4*/
            imageUrl: shareImg,
            success: function (res) {
                // 转发成功之后的回调
                // console.log(res);
                if (res.errMsg == 'shareAppMessage:ok') { };
            },
            // 转发失败之后的回调
            fail: function (res) {
                // 用户取消转发
                if (res.errMsg == 'shareAppMessage:fail cancel') { }
                // 转发失败，其中 detail message 为详细失败信息
                else if (res.errMsg == 'shareAppMessage:fail') { }
            }
        };
        // 来自页面内的按钮的转发
        if (options.from == 'button') {
            // console.log(options);
            // var eData = options.target.dataset;
        };
        // console.log(shareObj);
        return shareObj;
    }
});