const config = {
    APPID: 'wx4ab81cf09eebe848',
    SECRET: '471eed477db77b571322e1855cb3f8e6'
};
// const hostName = ''

module.exports = {
    app: {
        weixin: `https://api.weixin.qq.com/sns/jscode2session?appid=${config.APPID}&secret=${config.SECRET}&grant_type=authorization_code`
    },
    search: {
        historical: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/search'
    },
    classy: {
        // prodcategory: 'http://10.158.33.187/get/prodcategory'
        prodcategory: 'https://www.easy-mock.com/mock/5add78830f34ce6a67b6b97b/project'
    }
}