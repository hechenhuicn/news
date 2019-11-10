// const Router = require('koa-router');
// 引入新闻路由
const newsRouter = require('./routers/newsRouter');
// 引入后端管理路由
const adminRouter = require('./routers/adminRouter');

// 导出一个函数，把app.js里的app引过来
module.exports = function (app) {
    // 只做绑定这个作用
    app.use(newsRouter.routes());
    app.use(adminRouter.routes());
}

