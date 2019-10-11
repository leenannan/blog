var http = require('http');
var fs = require('fs');
// 1、繁琐代码
// // 创建HTTP服务器并用回调定义响应逻辑
// http.createServer(function (req, res) {
//   if (req.url == '/') {
//     // 读取JSON文件并用回调定义如何处理其中的内容
//     fs.readFile('./titles.json', function (err, data) {
//       if (err) {
//         console.log(err);
//         res.end('Server Error')
//       } else {
//         var titles = JSON.parse(data.toString());
//         // 读取HTML模板，并在加载完成后使用回调
//         fs.readFile('./template.html',function(err, data) {
//           if (err) {
//             console.log(err);
//             res.end('Server Error');
//           } else {
//             var tmpl = data.toString();
//             // 组装HTML页面以显示博客标题
//             var html = tmpl.replace('%', titles.join('</li><li>'));
//             res.writeHead(200, {'Content-type': 'text-html'});
//             //将HTML页面发送给用户
//             res.end(html);
//           }
//         })
//       }
//     })
//   }
// }).listen(8000, '127.0.0.1');
// 2、精简代码 创建中间函数以减少嵌套的例子 通过尽早返回减少嵌套的例子
 var server = http.createServer(function(req, res) {
   getTitles(res);
 }).listen(8000, '127.0.0.1')
//  获取标题，并将控控制权转交给getTemplate
 function getTitles (res) {
   fs.readFile('./titles.json', function (err, data) {
     if (err) return hadError(err, res)
     getTemplate(JSON.parse(data.toString()), res)
   })
 }
 function getTemplate (titles, res) {
   fs.readFile('./template.html', function(err, data) {
     if (err) return hadError(err, res)
     formatHtml(titles, data.toString(), res)
   })
 }
 function formatHtml (titles, tmpl, res) {
   var html = tmpl.replace('%', titles.join('</li><li>'));
   res.writeHead(200, {'Content-type': 'text-html'});
   res.end(html);
 }
 function hadError(err, res) {
   console.log(err);
   res.end('Server Error')
 }