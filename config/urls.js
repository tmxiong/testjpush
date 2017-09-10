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