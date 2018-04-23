import { ajax } from '../../utils/util.js';
import { classy } from '../../utils/config.js';
Page({
    data: {
        scrollTop: 0,
        asideCur: 0,
        asideTtile: []
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


    },

    selectAside (e) {
        const _this = this;
        let { index, supcatid, id } = e.target.dataset;
        console.log(id);
        let query = wx.createSelectorQuery();
        query.select(`#${id}`).boundingClientRect()
        query.exec(function (res) {
            //res就是 该元素的信息 数组
            console.log(res[0]);
            //取高度
            _this.setData({
                asideCur: index,
                scrollTop: res[0].top
            });
            // _this.setData({
            //     realWidth: res[0].width,
            //     realHeight: res[0].height
            // })
            // console.log('取高度', _this.data.realHeight);
        })
        
        
        
        
        
        
        
        // wx.pageScrollTo({
        //     scrollTop: 0
        // })
    }
});