import { ajax } from '../../utils/util.js';
import { classy } from '../../utils/config.js';
Page({
    data: {
        scrollTop: 0,
        asideCur: 0,
        asideTtile: [],
        domeArr: []
    },
    onLoad () {
        const _this = this;
        ajax({
            url: classy.prodcategory
        }).then(list => {
            if (list && list.length){
                _this.setData({
                    asideTtile: list
                });
            };
            console.log(list);
        });
        let query = wx.createSelectorQuery(),
            domeArr = [];        
        query.selectAll('.class-container').boundingClientRect((rects) => {
            domeArr = rects.map(item => item.top)    
            // console.log(domeArr)
            _this.setData({
                domeArr: domeArr
            });
        }).exec();

    },

    selectAside (e) {
        const _this = this;
        let domeArr = _this.data.domeArr;
        let { index, supcatid, id } = e.target.dataset;
        _this.setData({
            asideCur: index,
            scrollTop: domeArr[index],
            stopScroll: true
        });
    },
    scrollChange (e) {
        // console.log(e);
        let { domeArr, stopScroll } = this.data;
        if (stopScroll) { return false };        
        const _this = this;
        let { scrollTop } = e.detail;
        let query = wx.createSelectorQuery();
        query.selectAll('.class-container').boundingClientRect((rects) => {
            rects = rects.map(res => res.top)
            let minarr = rects.filter(res => res < 0);
            // var len = minarr.length;
            let len = minarr.length === rects.length ? rects.length - 1 : minarr.length;
            // console.log(len)
            _this.setData({
                asideCur: len
            });
        }).exec();
    }
});