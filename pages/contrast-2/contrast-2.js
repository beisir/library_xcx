import { contrast2 } from '../../utils/config.js';
import { ajax, wechatLogin } from '../../utils/util.js';

Page({
    data: {
        categoryAttPram: [],
        productWithAtt: [],
        vsObj: {},
        rects: [],
        paramsIndex: {},
        top: 0
    },
    onLoad({ catid, prodid}) {
        const _this = this;
        wechatLogin(({openid}) => {
            _this.getConrastParams(catid || 100000000, prodid || '1,2');
        });
    },
    getConrastParams (catid, prodid) {
        const _this = this;
        ajax({
            url: contrast2.productWithAtts,
            data: {
                catid: catid,
                prodids: prodid
            }
        }).then(result => {
            if (result) {
                _this.filterParams(result);
                _this.setData({
                    categoryAttPram: result.categoryAttPram,
                    productWithAtt: result.productWithAtt
                });
            }

        });
    },

    filterParams (result) {
        let { categoryAttPram, productWithAtt} = result;
        let obj = {};
        let paramsIndex = {}
        categoryAttPram.forEach((item, index) => {
            paramsIndex[item.groupName] = index;
            obj[item.groupName] = {};
            item.params.forEach((val, ind) => {
                obj[item.groupName][val.name] = new Array(2);
                console.log(val);
            });
        });
        productWithAtt.forEach((attItem, attIndex) => {
            attItem.attvalues.forEach((valItem, valIndex) => {
                let keyItem = Object.keys(obj[valItem.attGroup]);
                if (keyItem.indexOf(valItem.attName) === -1){
                    obj[valItem.attGroup][valItem.attName] = new Array(2);
                };
                obj[valItem.attGroup][valItem.attName][attIndex] = valItem.attValue;
            })
        });  
        this.setData({
            vsObj: obj,
            paramsIndex: paramsIndex
        });
        console.log(paramsIndex)
        this.getDomeTop();
    },
    getDomeTop () {
        const _this = this;
        let query = wx.createSelectorQuery(),
            domeArr = [];
            setTimeout(() => {
                query.selectAll('.detailTit').boundingClientRect((rects) => {
                    rects = rects.map(item => item.top);
                    _this.setData({
                        rects: rects
                    });
                }).exec();
            }, 500);
          
    },


    scrollChange (e) {
        const _this = this;
        let { rects } = this.data;
        let scrollTop = e.detail.scrollTop;   
        // this.setData({
        //     top: scrollTop
        // });

    }
})
