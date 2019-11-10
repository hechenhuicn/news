# news
It's a project which shows how to use node.js

本项目主要展示node.js的使用

功能描述：
（1）前端展示新闻列表
（2）后端新闻管理，有新闻添加、展示、删除

使用：
（1）nodemon app.js启动服务器。
（2）浏览器输入http://localhost:3000/news为前端新闻列表展示。http://localhost:3000/admin为后端新闻管理。

技术点：
（1）主要采用koa框架，另用koa-router,koa-views,koa-static,koa-body模块。
（2）数据库MYSQL，用mysql2模块。
（3）模板引擎pug写页面。
（4）整个项目采用MVC框架构建，项目中controller是控制，service是数据处理，views是视图呈现。
