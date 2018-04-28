import { ajax } from '../../utils/util.js';
import { search } from '../../utils/config.js';
Page({
    data: {
        textValue: '',
        historical_terms: []
    },
    onShow () {
        let historical_terms = wx.getStorageSync('histor_word');
        if (historical_terms) {
            this.setData({
                historical_terms: historical_terms
            })
        };
    },
    sendKeyWord (e) {
        let val = e.detail.value;
        if (val!=='') {
            let histor_word = wx.getStorageSync('histor_word');
            if (histor_word === ''){
                histor_word = [val];
            } else {
                histor_word.unshift(val);
                if (histor_word.length >= 10) {  
                    histor_word.length = 10;
                };
                histor_word = [...new Set(histor_word)];
            };
            wx.setStorage({
                key: 'histor_word',
                data: histor_word,
                success () {
                    wx.navigateTo({
                        url: `/pages/search-list/search-list?key=${val}`,
                    });
                }
            });
        } else {
            wx.showToast({
                icon: 'none',
                title: '请输入商品关键词',
            });
        }
    },
    cancelBtn () {
        this.setData({
            textValue: ''
        });
    }

});