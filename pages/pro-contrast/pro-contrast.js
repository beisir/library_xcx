import { pro_contrast} from '../../utils/config.js';
import { ajax, wechatLogin } from '../../utils/util.js';
Page({
    data: {
        openid: null,
        contrastList: [],
        statusList: [],
        catId: ''
    },
    onLoad({ catid}) {
        this.setData({
            catId: catid
        });
    },
    onShow () {
        const _this = this;
        let catid = this.data.catId;
        wechatLogin(({ openid }) => {
            _this.setData({
                openid: openid,
                statusList: []
            });
            _this.contrastPageList(openid, catid);
        });
    },
    contrastPageList (openid, catid) {
        const _this = this;
        ajax({
            url: pro_contrast.comparedProds,
            data: {
                catid: catid,
                openid: openid
            }
        }).then(result => {
            _this.setData({
                contrastList: result
            });
        });
    },
    modifyState (e) {
        let {index} = e.currentTarget.dataset;
        let { contrastList, statusList } = this.data;

        contrastList[index].flag = !contrastList[index].flag;
        if (contrastList[index].flag) {
            statusList.push(contrastList[index].prodid);
            if (statusList.length > 2) {
                statusList.shift();
            };
            contrastList = contrastList.map(statusItem => {
                statusItem.flag = statusList.indexOf(statusItem.prodid) !== -1 ? true : false;
                return statusItem;
            });
        } else {
            statusList.shift()
        };
        this.setData({
            contrastList: contrastList,
            statusList: statusList
        });
        
    },
    /**
     * [startContras() ]
     * [开始对比 ]
     * [-------------------------------------------------]
     */
    startContras () {
        let { contrastList, catId } = this.data;

        let statusList = contrastList.filter(item => item.flag === true);
        if (statusList.length === 2) {
            wx.navigateTo({
                url: `/pages/contrast-2/contrast-2?catid=${catId}&prodid=${statusList[0].prodid},${statusList[1].prodid}`
            });
        } else {
            wx.showToast({
                title: '请选择两项进行对比',
                icon: 'none'
            });
        }
    }
});