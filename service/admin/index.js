const fs = require('fs');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: 'jstest1'
})

module.exports = {
    async addData(request) {
        // 将ctx.request.body的内容解构出来,content数据库里没加就不解构了
        let {title, type} = request.body;
        if (request.files.img.size > 0) {
            // 如果文件又数据则转到指定文件夹-static/uploads
            if (! fs.existsSync('static/uploads')) {
                // 如不存在该文件夹则新建
                fs.mkdirSync('static/uploads');
            }
            let tempPath = request.files.img.path;
            // 从临时路径读取文件并写到uploads里去，保持原图片名
            // 写的路径相对跟路径news来说的
            fs.writeFileSync('static/uploads/'+request.files.img.name, fs.readFileSync(tempPath));
            // 图片路径这样写，因为app.js里配置了static路径
            let img = '/uploads/'+request.files.img.name;
            let nowTime = new Date().getFullYear();
            // 添加到数据库
            let [rows] = await connection.promise().query('INSERT INTO news(title, imgUrl, `from`, time) VALUES (?,?,?,?)',[title, img, type, nowTime]);
            return rows;
        }
    },
    // getDate,allDate方法逻辑和news里的一样，直接拿来用
    // 每页显示5条
    async getDate(p, perPage) {
        let [rows] = await connection.promise().query(`SELECT * FROM news LIMIT ${(p-1)*perPage}, ${perPage}`);
        return rows;
    },
    // 所有数据
    async allDate() {
        let [rows] = await connection.promise().query(`SELECT * FROM news`);
        return rows;
    },
    // 删除数据
    async deleteData(id) {
        let [rows] = await connection.promise().query(`DELETE FROM news WHERE id=?`,[id]);
        return rows;
    },
}