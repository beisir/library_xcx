import { ajax, wechatLogin } from '../../utils/util.js';
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
        applicationId: '',
        ProdsNum: 'VS',
        isAdd: true,
        id: '',
        mobile: ''
    },
    onLoad({ id }) {
        const _this = this;
        ajax({
            url: detail.prodinfo,
            data: { id: id },
        }).then(result => {
            _this.setData({
                prodatt_arr: Object.keys(result.prodatt),
                prodatt: result.prodatt || {},
                prodimage: result.prodimage || {},
                prodinfo: result.prodinfo || {},
                phoneNum: result.mfbo.tel || '00000000',
                applicationId: result.mfbo.id,
                pcid: 1
            });
            _this.contrastNum(result.prodinfo.catId, id);
        });
        wechatLogin(({openid}) => {
            let mobile = wx.getStorageSync('mobile');
            _this.setData({
                mobile: mobile,
                openid: openid
            });
        });
    },
    imgInfo(e) {
        let index = e.currentTarget.dataset.index,
            prodimage = this.data.prodimage;
        let img_arr = prodimage.map(res => res.name);
        wx.previewImage({
            current: img_arr[index], // 当前显示图片的http链接
            urls: img_arr   // 需要预览的图片http链接列表
        });
    },
    /**
     * [application() ]
     * [申请分销 ]
     * [-------------------------------------------------]
     */
    application(e) {
        const _this = this;
        let { encryptedData, iv, errMsg} = e.detail
        if (errMsg.includes('ok')) {
            encryptedData && wechatLogin(({ session_key, openid }) => {
                ajax({
                    url: detail.phonenum,
                    method: 'POST',
                    header: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        encrypted: encryptedData,
                        iv: iv,
                        session_key: session_key
                    }
                }).then(phoneNum => {
                    if ((typeof phoneNum) === 'object'){
                        _this.setData({
                            mobile: phoneNum.phoneNumber,
                            openid: openid
                        }, () => {
                            wx.setStorageSync('mobile', phoneNum.phoneNumber);
                            _this.getlication();
                        });
                    } else {
                        wx.showToast({
                            title: '获取失败，请重试',
                            icon: 'none'
                        });
                    };
                }).catch(err => {
                    console.log(err);
                });
            }, true);   
        } else {
            wx.showToast({
                title: '拒绝了手机号码授权',
                icon: 'none'
            });
        };
    },
    getlication (){
        const _this = this;
        let { prodimage, prodinfo, pcid, mobile, openid } = _this.data;
        prodimage = prodimage.length ? prodimage[0].name : '';
        ajax({
            url: detail.distribut,
            data: {
                pid: prodinfo.id,
                pic: prodimage,
                title: prodinfo.name,
                openid: openid,
                phone: mobile
            }
        }).then(res => {
            let hint = ''
            switch (res) {
                case 0: hint = '您的申请已经提交成功,请等待厂商和您联系'; break;
                case 1: hint = '已申请过，请勿重复申请'; break;
                case 2: hint = '系统异常'; break;
            }
            wx.showToast({
                title: hint,
                icon: 'none'
            });
        });
    },
    

    /**
     * [consultingPhone() ]
     * [ps: 咨询电话 ]
     * [-------------------------------------------------]
     */
    consultingPhone() {
        let phoneNum = this.data.phoneNum;
        phoneNum = phoneNum ? phoneNum : "00000000";
        wx.makePhoneCall({
            phoneNumber: phoneNum,
        });
    },
    /**
     * [addContrast() ]
     * [ps: 添加对比 ]
     * [-------------------------------------------------]
     */
    addContrast() {
        const _this = this;
        let { id, catId, supcatid } = this.data.prodinfo;
        wechatLogin(({ openid }) => {
            ajax({
                url: `${detail.addCompared}/${id}/${catId}/${supcatid}/${openid}`
            }).then(res => {
                let prompt = ''
                switch (res) {
                    case 0: prompt = '添加失败,请重试'; break;
                    case 1: prompt = '添加对比成功'; break; 
                    case 2: prompt = '已添加过,请勿重复添加'; break;
                    case 3: prompt = '商机不存在'; break;
                    case 4: prompt = '对比个数超限'; break;
                    default : prompt = '添加失败';
                };
                wx.showToast({
                    title: prompt,
                    icon: res === 1 ? 'success' : 'none',
                    success () {
                        res === 1 && setTimeout(() => {
                            _this.contrastNum(catId, id);                            
                        }, 1000);
                    }
                });
            });
        });
    },
    /**
     * [removeContrast() ]
     * [ps: 取消对比 ]
     * [-------------------------------------------------]
     */
    removeContrast () {
        const _this = this;
        let { id, catId } = this.data.prodinfo;
        wechatLogin(({ openid }) => {
            ajax({
                url: `${detail.deleteCompared}/${openid}/${id}`
            }).then(res => {
                let cludes = res.includes('1');
                wx.showToast({
                    title: cludes ? '取消对比成功':'取消对比失败',
                    icon: 'none',
                    success () {
                        cludes && setTimeout(() => {
                            _this.contrastNum(catId, id);
                        }, 1000);
                    }
                });
            });
        });
    },

    /**
     * [contrastNum() ]
     * [ps: 过取对比个数 ]
     * [-------------------------------------------------]
     */
    contrastNum(catId , id) {
        const _this = this;
        wechatLogin(({ openid }) => {
            ajax({
                url: detail.prodsNum,
                data: {
                    catid: catId,
                    openid: openid
                }
            }).then(result => {
                if (result){
                    let isAdd = result.some(item => item.product_Id === Number(id));
                    _this.setData({
                        ProdsNum: result.length ? result.length : 'VS',
                        isAdd: isAdd
                    });
                } else {
                    wx.showToast({
                        title: '对比个数请求错误',
                        icon: 'none'
                    });
                }
            })
        });
    },



    /**
     * [onShareAppMessage() 分享]
     * [-------------------------------------------------]
     */
    onShareAppMessage: function (options) {
        const _this = this;
        let { prodinfo, prodimage } = _this.data,
            shareImg = prodimage[0].name || '',
            // shareImg = 'https://style.org.hc360.com/images/microMall/program/dImg1.png',
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