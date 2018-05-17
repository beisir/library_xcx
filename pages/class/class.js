import { ajax } from '../../utils/util.js';
import { classy } from '../../utils/config.js';
Page({
    data: {
        title: '',      // 显示所有产品右侧的标题文字
        title_supid: '',// 所有产品的商机id
        asideCur: 0,    // 侧边栏tabIndex
        asideTtile: [] // 侧边栏数据列表
        // scrollTop: 0,   // 
    },
    /**
     * [onLoad() 初始调用数据]
     * [ps: 先获取第一级侧边栏菜单,成功之后获取二级数据列表]
     * [-------------------------------------------------]
     */
    onLoad () {
        const _this = this;
        _this.getLevelMenu('').then(list => {
            if (list && list.length) {
                _this.setData({
                    asideTtile: list
                });
            };
        });
    },
    /**
     * [getLevelMenu() 获取分类列表]
     * [ps: 先获取第一级侧边栏菜单,成功之后获取二级数据列表]
     * [-------------------------------------------------]
     */
    getLevelMenu (params, isLoading) {
        return ajax({
            url: classy.prodcategory,
            data: {
                itemid: params
            }
        }, isLoading);
    },
    /**
     * [selectAside() 点击侧边栏一级菜单点击事件]
     * [ps: 根据一级菜单选择请求并渲染二级三级]
     * [-------------------------------------------------]
     */
    selectAside (e) {
        const _this = this;
        let { index, supcatid, title, list} = e.target.dataset;
        _this.setData({
            title: title,
            asideCur: index,   // 侧边栏tabIndexdex,
            title_supid: supcatid   // 侧边栏数据列表
        });
        
    }






























    // onLoad () {
    //     const _this = this;
    //     ajax({
    //         url: classy.prodcategory
    //     }).then(list => {
    //         if (list && list.length){
    //             _this.setData({
    //                 asideTtile: list
    //             });
    //         };
    //         console.log(list);
    //     });
    //     let query = wx.createSelectorQuery(),
    //         domeArr = [];        
    //     query.selectAll('.class-container').boundingClientRect((rects) => {
    //         domeArr = rects.map(item => item.top)    
    //         // console.log(domeArr)
    //         _this.setData({
    //             domeArr: domeArr
    //         });
    //     }).exec();

    // },

    // selectAside (e) {
    //     const _this = this;
    //     let domeArr = _this.data.domeArr;
    //     let { index, supcatid, id } = e.target.dataset;
    //     _this.setData({
    //         asideCur: in // 侧边栏tabIndexdex,
    //         scrollTop: domeArr[index],   // 侧边栏数据列表
    //     });  // 右边content数据列表
    // },
    // scrollChange (e) {
    //     // console.log(e);
    //     let { domeArr, stopScroll } = this.data;
    //     if (stopScroll) { return false };        
    //     const _this = this;
    //     let { scrollTop } = e.detail;
    //     let query = wx.createSelectorQuery();
    //     query.selectAll('.class-container').boundingClientRect((rects) => {
    //         rects = rects.map(res => res.top)
    //         let minarr = rects.filter(res => res < 0);
    //         // var len = minarr.length;
    //         let len = minarr.length === rects.length ? rects.length - 1 : minarr.length;
    //         // console.log(len)
    //         _this.setData({
    //             asideCur: le // 侧边栏tabIndexn
    //         });  // 侧边栏数据列表
    // }    // 右边content数据列表
});