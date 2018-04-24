import { ajax } from '../../utils/util.js';
import { search_list } from '../../utils/config.js';
// import {}
Page({
    data: {
        keyword: '',
        search_list: []
    },
    onLoad({ key, bcid}) {
        const _this = this;
        _this.setData({
            keyword: key
        });
        let obj;
        if (bcid) {
            obj = {
                url: search_list.prodbycat,
                data: {
                    catid: bcid
                }
            };
        } else {
            obj = {
                url: search_list.prodbytitle,
                data: {
                    title: encodeURIComponent(key)
                } 
            };
        }
        _this.getSearchList(obj);

    },
    getSearchList (params) {
        const _this = this;    
        ajax(params).then(result => {
            if (result.content.length){
                _this.setData({
                    search_list: result.content
                });
            } else {
                _this.setData({
                    search_list: []
                });
                wx.showToast({
                    icon: 'none',
                    title: '暂无数据'
                });
            };
        });
    },
    sendKeyWord (e) {
        let { value } = e.detail;
        if (value !== ''){
            this.getSearchList({
                url: search_list.prodbytitle,
                data: {
                    title: encodeURIComponent(value)
                }
            });
        } else {
            wx.showToast({
                icon: 'none',
                title: '请输入商品关键词'
            });
        }
        
        console.log(e);
    }
})