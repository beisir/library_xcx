import { ajax } from '../../utils/util.js';
import { search_listPath } from '../../utils/config.js';
Page({
    data: {
        keyword: '',
        search_list: [],
        pageNo: 0,
        isPullDown: false,
        ispath: '',
        prodbycat_path: '',
        prodbytitle_path: '',
        prodbysupid_path: '',
        byCatid_path: '',
        loadingTxt: 'drop'
    },
    onLoad (obj) {
        let { key, bcid, supcatid, catid } = obj;
        const _this = this;
        let pageNo = _this.data.pageNo,
            url = '',
            ispath = '',
            prodbycat_path = '',
            prodbytitle_path = '',
            prodbysupid_path = '',
            byCatid_path = '';
        if (supcatid) {
            ispath = 'prodbysupid';
            prodbysupid_path = `${search_listPath.prodbysupid}&supid=${supcatid}&pageNo=`
            url = `${prodbysupid_path}${pageNo}`
        } else if (bcid) {
            ispath = 'prodbycat';
            prodbycat_path = `${search_listPath.prodbycat}&catid=${bcid}&pageNo=`
            url = `${prodbycat_path}${pageNo}`;
        } else if (catid) {
            ispath = 'catidpath';
            byCatid_path = `${search_listPath.byCatid}&catid=${catid}&pageNo=`
            url = `${byCatid_path}${pageNo}`;
        } else {
            ispath = 'prodbytitle';
            _this.setData({
                pageNo: 1
            });
            prodbytitle_path = `${search_listPath.prodbytitle}&`
            url = `${prodbytitle_path}title=${key}&pageNo=${_this.data.pageNo}`;
        };
        _this.setData({
            keyword: key || '',
            ispath: ispath,
            prodbycat_path: prodbycat_path,
            prodbytitle_path: prodbytitle_path,
            prodbysupid_path: prodbysupid_path,
            byCatid_path: byCatid_path
        });
        // console.log(url);
        _this.getSearchList(url);
    },
    getSearchList (params) {
        const _this = this;
        _this.setData({
            loadingTxt: 'load'
        })
        ajax({
            url: params
        }).then(result => {
            wx.stopPullDownRefresh();
            if (result.content.length){
                let search_list = this.data.search_list;
                _this.setData({
                    search_list: search_list.concat(result.content),
                    pageNo: result.number,
                    loadingTxt: 'drop'
                });
            } else {
                _this.setData({
                    loadingTxt: 'more'
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
        if (value !== '') {
            let path = 
            this.getSearchList(`${search_listPath.prodbytitle}&title=${encodeURIComponent(value)}&pageNo=${1}`);
            this.setData({
                loadingTxt: 'drop',
                search_list: [],
                pageNo: 1,
                keyword: value,
                ispath: 'prodbytitle',
                prodbytitle_path: `${search_listPath.prodbytitle }&`
            });
        } else {
            wx.showToast({
                icon: 'none',
                title: '请输入商品关键词'
            });
        }
        
        // console.log(e);
    },

    /**
     * [onReachBottom 微信内置方法 滑动到底部触发]
     */
    onReachBottom () {
        let { 
            keyword,
            pageNo,
            ispath,
            prodbycat_path,
            prodbytitle_path,
            prodbysupid_path,
            byCatid_path } = this.data;
            pageNo += 1;
        let url = '';
        if (ispath === 'prodbytitle') {  // 搜索接口
            url = `${prodbytitle_path}title=${encodeURIComponent(keyword)}&pageNo=${pageNo}`;
        } else if (ispath === 'prodbycat') {    // bcid接口
            url = `${prodbycat_path}${pageNo}`
        } else if (ispath === 'prodbysupid') {
            url = `${prodbysupid_path}${pageNo}`
        } else if (ispath === 'catidpath') {
            url = `${byCatid_path}${pageNo}`
        };
        this.getSearchList(url);
    }
});