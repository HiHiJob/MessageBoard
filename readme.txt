打开dist/html/index.html即可查看效果

以下是详细说明：

程序亮点：
Mock.js假数据填充，无需任何后台，即开即用；
手打超多注释。

具体实现：
React.js实现总体界面（src/js/index.js）；
jQuery实现消息提示隐藏（src/js/index.js）；
Bootstrap实现效果；
Mock.js拦截请求填充假数据。


其他说明：
如果想尝试修改重新压缩，请先使用npm下载安装package.json中的依赖，而后使用gulp指令拷贝文件；
gulpfile.js写的比较简单，只实现了文件拷贝以及index.js这一个文件的压缩，如有更多需求还自行修改此文件。