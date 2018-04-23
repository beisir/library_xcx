import { app } from './config.js';


/**
 * [http() 封装 工具函数,ajax 请求 ]
 * [{params: Object(url.. data.. 等参数)}]
 * [-------------------------------------------------]
 */
const ajax = function (params) {
    return new Promise(function (resolve, reject) {
        wx.showLoading({
            title: '正在加载...',
            mask: true
        });
        wx.request({
            method: params.method || 'GET',
            url: params.url,
            data: params.data || {},
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (options) {
                let result = options.data;
                resolve(result);
            },
            fail: function (err) {
                wx.showToast({
                    title: '请求失败',
                    icon: 'none'
                });
                reject(err);
                wx.showModal({
                    title: '警告',
                    content: `接口请求失败,错误${JSON.stringify(err)}`,
                })
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    });
}

function wechatLogin (callback) {
    wx.getStorage({
        key: 'openID',
        success(res) {
            // console.log(res);
            if (res.errMsg.includes('ok')) {
                callback(res.data);
            };
        },
        fail(err) {
            wx.login({
                success: res => {
                    ajax({
                        url: app.weixin,
                        data: {
                            js_code: res.code
                        }
                    }).then(options => {
                        wx.setStorage({
                            key: 'openID',
                            data: options,
                        });
                        callback(options);
                    });
                }
            })
        }
    });
};
function AuthorIzation (authorString = 'scope.userInfo') {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(options) {
                // console.log(options)
                let authSetting = options.authSetting[authorString];
                if (authSetting === undefined) {
                    getAuthor(authorString).then(autor => {
                        wx.showToast({
                            icon: 'none',
                            title: '授权成功'
                        });
                        resolve(autor);
                    }).catch(err => {
                        wx.showToast({
                            icon: 'none',
                            title: '授权失败'
                        });
                        reject(err);
                    });
                } else if (authSetting === false) {
                    wx.openSetting({
                        success: function (options) {
                            if (options.authSetting[authorString]) {
                                getAuthor(authorString).then(autor => {
                                    wx.showToast({
                                        icon: 'none',
                                        title: '授权成功'
                                    });
                                    resolve(autor);
                                }).catch(err => {
                                    reject(err);
                                })
                            } else {
                                wx.showToast({
                                    icon: 'none',
                                    title: '授权失败'
                                });
                                reject({ errMsg: '拒绝了' });
                            };
                        },
                        fail: function (err) {
                            reject(err);
                        }
                    });
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '授权成功'
                    });
                    wx.getStorage({
                        key: 'userInfo',
                        success: function(res) {
                            resolve(res.data)
                        }
                    });
                }
            }
        })
    });
};
 
function getAuthor (authorString) {
    return new Promise((resolve, reject) => {
        switch (authorString) {
            case 'scope.userInfo': wx.getUserInfo({
                success(options) {
                    wx.setStorageSync('userInfo', options.userInfo);
                    resolve(options.userInfo)
                },
                fail(err) {
                    reject(err);
                }
            }); break;
            default: return false;
        }

    });
};


module.exports = {
    ajax: ajax,
    AuthorIzation: AuthorIzation,
    wechatLogin: wechatLogin
}