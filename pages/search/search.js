import { ajax } from '../../utils/util.js';
import { search } from '../../utils/config.js';
Page({
    data: {
        historical_terms: []
    },
    onLoad () {
        const _this = this;
        ajax({
            url: search.historical
        }).then(options => {
            _this.setData({
                historical_terms: options.data
            });
        });
    },
    sendKeyWord (e) {
        let val = e.detail.value;
        if (val!=='') {
            wx.navigateTo({
                url: `/pages/search-list/search-list?key=${val}`,
            });
        } else {
            wx.showToast({
                icon: 'none',
                title: '请输入商品关键词',
            });
        }
    }

});