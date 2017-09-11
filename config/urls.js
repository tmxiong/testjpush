/**
 * Created by xiongtm on 2017/9/10.
 */
const url_id = 'T1356600029035';
exports.getUrlId = ()=>{
    return url_id;
};
// 获取文章
exports.getArticleList = function (now,next) {
    return 'http://c.m.163.com/nc/article/list/'+ url_id +'/'+ now +'-'+ next +'.html'
};
// 根据docid获取文章详情
exports.getArticleDetail = function (docid) {
  return 'http://c.m.163.com/nc/article/' + docid + '/full.html'
};

// 福彩3d/高频彩/数字彩的链接
exports.getPlayTips = function (type) {
    // type = fc/gpc/szc/csxw
    return 'https://m.qmcai.com/support/cmsv2/information/queryContent?parameter=%7B%22command%22:%22queryContent%22,%22categoryId%22:%22'+ type +'%22,%22offset%22:0,%22size%22:15,%22platform%22:%22html%22,%22version%22:%225.2.16%22%7D&callback=jsonp5'
};

// 福彩3d/高频彩/数字彩的链接详情
exports.getPlayTipsDetail = function (id) {
    return 'https://m.qmcai.com/zixun/detail.html?_id=' + id
};