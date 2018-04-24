Page({
    data: {
        view_arr: [
            'https://www.hc360.com/zt/cpk/index-m.html',
            'https://m.hc360.com/supplyself/448122348.html',
            'https://m.hc360.com/supplyself/448151108.html'
        ],
        view_path: ''
    },
    onLoad ({view_index}) {
        let view_arr = this.data.view_arr;
        this.setData({
            view_path: view_arr[view_index]
        });
    }
});