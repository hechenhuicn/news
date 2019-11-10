const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    user: "root",
    password: "123",
    database: 'jstest1'
})

// 导出一个对象，内有方法getData,allData
module.exports = {
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
}