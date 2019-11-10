// 导出一个对象，对象里有index、addNews、newsList方法
let adminModel = require('../../service/admin');

module.exports = {
    // 主页,参数也可加next
    async index(ctx) {
        // ctx.body = '后端管理主页';
        await ctx.render('./admin/admin.pug');
    },
    async addNews(ctx) {
        // ctx.body = '后端添加';
        await ctx.render('./admin/addNews.pug');
    },
    async newsList(ctx) {
        // 这部分逻辑和前端news展示一样，直接拿过来即可
        let p = parseInt(ctx.query.p) || 1; //当前页
        let perPage = 5;  //每页分几条
        let totalData = await adminModel.allDate();
        let pCount = Math.ceil(totalData.length/perPage); //分页按钮数量
        // console.log(pCount);
        // 因getData是异步的，不用await拿不到
        let newsData = await adminModel.getDate(p, perPage);
        await ctx.render('./admin/newsList.pug', {
            newsData,
            pCount,
            p
        });
    },
    async addData(ctx) {
        // ctx.query用于get获取请求内容
        // ctx.request.body用户post获取请求内容
        // ctx.request.files获取文件对象，文件会放到一个临时路径
        // console.log(ctx.request.body);
        // console.log(ctx.request.files);
        // ctx.body = 'some values...';
        // 这里body,files都要传给service里的addData,所以传ctx.request
        let res = await adminModel.addData(ctx.request);
        // console.log(res);
        let info = {};
        if (res.affectedRows > 0) {
            // status无规定，看团队要求
            info = {
                info :'操作成功',
                status : 1
            }
            ctx.body = 'upload success...';
        } else {
            info = {
                info :'操作失败',
                status : 0
            }
            ctx.body = 'upload failed...';
        }
        
    },
    async deleteData(ctx) {
        // console.log(ctx.query.id);
        let id = parseInt(ctx.query.id);
        let res = await adminModel.deleteData(id);
        console.log('id is '+id);
        let resData={};
        if (res.affectedRows > 0) {
            resData = {
                info : '操作成功',
                status : 1
            }
        } else {
            resData = {
                info : '操作失败',
                status : 0
            }
        }
        await ctx.render('./admin/message.pug', {
            resData
        });
    }
}