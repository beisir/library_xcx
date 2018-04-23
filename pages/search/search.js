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
            console.log(options);
        });
    }
});