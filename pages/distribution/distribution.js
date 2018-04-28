import { ajax, AuthorIzation, wechatLogin } from '../../utils/util.js';
import { distribution, errImg } from '../../utils/config.js';
Page({
    data: {
        openid: '',
        page: 1,
        library_arr: []
    },
    onLoad () {
        const _this = this;
        wechatLogin(({openid}) => {
            _this.setData({
                openid: openid
            });
            _this.getLibrary(openid, 1);
        });
    },
    getLibrary (openid,page) {
        const _this = this;
        let library_arr = this.data.library_arr;
        ajax({
            url: distribution.getByOpenid,
            data: {
                openid: openid,
                page: page
            }
        }).then(result => {
            if (result && result.length) {
                _this.setData({
                    library_arr: library_arr.concat(result)
                });
            }
        });
    },
    errImgEvent(e) {
        let errorImgIndex = e.currentTarget.dataset.index, //获取循环的下标
            imgObject = "library_arr[" + errorImgIndex + "].pic", //carlistData为数据源，对象数组
            errorImg = {};
        errorImg[imgObject] = errImg; //我们构建一个对象
        this.setData(errorImg); //修改数据源对应的数据
    },
});