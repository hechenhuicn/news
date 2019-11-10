// app.js是主入口

const Koa = require('koa');
// const Router = require('koa-router');
const views = require('koa-views');
const static = require('koa-static');
// 引入router.js
const router = require('./router');
const koaBody =require('koa-body');

let app = new Koa();

app.use(views(__dirname + '/views'), {
    extension : 'pug'
});
app.use(static(__dirname + '/static'));
app.use(koaBody({
    // 允许上传文件
    multipart : true
}));

// 调用router.js里定义的方法。
router(app);
app.listen(3000);