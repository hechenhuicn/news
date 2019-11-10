const Router = require('koa-router');
const newsController = require('../controller/news');

// 添加前缀，用前缀把news,admin分开
// 新闻主要路径会变localhost:3000/news/index
let router = new Router({
    prefix : '/news'
});
router.get('/', ctx => {
    // 加prefix后这里必须加/news
    ctx.redirect('/news/index');
});
// controller中的index方法作为这里的回调函数
router.get('/index', newsController.index);
router.get('/detail', newsController.detail);

module.exports = router;

