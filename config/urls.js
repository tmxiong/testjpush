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
    return 'https://m.qmcai.com/zixun/detail.html?_id=19264&sourceFrom=zixunrevision&categoryId='+ type +'&newWebview=true&backH5Control=true&h5ControlTitle=true&clientLogin=true&version=5.2.16&channel=970'
};