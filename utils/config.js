const hostname = 'https://wsprod.hc360.com';
module.exports = {
    app: {
        weixin: `https://madata.hc360.com/mobileapp/transfer/proLogin`
    },
    index_page: {
        prodbytime: `${hostname}/get/prodbytime?pageSize=10&pageNo=`,
    },
    classy: {
        prodcategory: `${hostname}/get/prodcategory`
    },
    search_listPath: {
        prodbycat: `${hostname}/get/prodbycat?pageSize=6`,
        prodbytitle: `${hostname}/search?pageSize=6`,
        prodbysupid: `${hostname}/get/prodbysupid?pageSize=10`,
        byCatid: `${hostname}/findProdsByCatid?pageSize=6`
    },
    detail: {
        prodinfo: `${hostname}/get/prodinfo`,
        distribut: `${hostname}/distribut/save`,
        addCompared: `${hostname}/addCompared`,  // 添加商品到对比库,
        prodsNum: `${hostname}/findComparedProdsNum`,
        deleteCompared: `${hostname}/deleteComparedProd`
    },
    distribution: {
        getByOpenid: `${hostname}/distribut/getByOpenid`
    },
    pro_contrast: {
        comparedProds: `${hostname}/findComparedProds`      // 对比页面列表
    },
    contrast2: {
        productWithAtts: `${hostname}/findProductWithAtts`
    },
    manage: {
        addUser: `${hostname}/addUseridentity`,
        getUser: `${hostname}/getUseridentity`
    },
    errImg: 'https://style.org.hc360.com/images/microMall/program/proGimg.png'
    
}