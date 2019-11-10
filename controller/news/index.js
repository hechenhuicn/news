const newsModel = require('../../service/news')


// 导出一个对象，对象里有index方法
module.exports = {
    // 主页,参数也可加next
    async index(ctx) {
        // 变量定义可以放C，具体逻辑放M
        let p = parseInt(ctx.query.p) || 1; //当前页
        let perPage = 5;  //每页分几条
        let totalData = await newsModel.allDate();
        let pCount = Math.ceil(totalData.length/perPage); //分页按钮数量
        // console.log(pCount);
        // 因getData是异步的，不用await拿不到
        let newsData = await newsModel.getDate(p, perPage);
        // render函数路径是相对views文件夹的，底层做了处理
        await ctx.render('./news/index.pug', {
            newsData,
            p,
            pCount
        });
    },
    // detail页面
    async detail(ctx) {
        let id = parseInt(ctx.query.id); //当前新闻id
        let totalData = await newsModel.allDate();
        // filter返回的是一个数组，加[0]返回第一项
        let newDetailData = totalData.filter(item => item.id === id)[0];
        console.log(newDetailData);
        await ctx.render('./news/detail.pug', {
            newDetailData
        });
    }
}