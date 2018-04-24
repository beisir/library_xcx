import { errImg } from '../../utils/config.js'
Component({
    properties: {
        search_list: {
            type: Array,
            value: []
        }
    },
    methods: {
        errImgEvent (e) {
            let errorImgIndex = e.currentTarget.dataset.index, //获取循环的下标
                imgObject = "search_list[" + errorImgIndex + "].img", //carlistData为数据源，对象数组
                errorImg = {};
                // console.log()
            errorImg[imgObject] = errImg; //我们构建一个对象
            this.setData(errorImg); //修改数据源对应的数据
        },
        goDetail (e) {
            let { bcid } = e.currentTarget.dataset;
            wx.navigateTo({
                url: `/pages/detail/detail?id=${bcid}`
            });
        }
    },
    attached () {
        // console.log(this.properties)
    }
})