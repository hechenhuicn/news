const Router = require('koa-router');
const adminController = require('../controller/admin');

// 添加前缀，用前缀把news,admin分开
// 新闻主要路径会变localhost:3000/admin/index
let router = new Router({
    prefix : '/admin'
});
router.get('/', ctx => {
    // 加prefix后这里必须加/admin
    ctx.redirect('/admin/index');
});
router.get('/index', adminController.index);
router.get('/addNews', adminController.addNews);
router.get('/newsList', adminController.newsList);
// addNews.pug里form.method用的post，这里也要用post
router.post('/addData', adminController.addData);
// newsList.pug里删除用的a.href跳转,a.href,img.src都是get请求
router.get('/deleteData', adminController.deleteData);

module.exports = router;