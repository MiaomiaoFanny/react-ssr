# react-ssr
react ssr 原理

## Summary
### day1
1. 对同构的理解
   1. 一套代码, 客户端服务端同时运行
   2. SSR之后, 客户端接收页面交互及后续显示
   3. 服务端客户端share同一套组件代码, 只不过SSR负责呈现内容, CSR负责后续交互(事件监听)
2. 前后端两套webpack构建
   1. 生成前后端两份bundle
   2. 服务端bundle用于首屏渲染, 引入方式: 在服务端将内容生成html字符串后拼接返回
   3. 客户端bundle用于渲染后交互, 引入方式: 动态插入script标签
3. 前后端代码区别
   1. 服务端 启动服务器, 生成首屏html内容, 同时将客户端js插入script标签中
   2. 客户端 将内容以hydrate注水的方式 组合SRR CSR渲染
      1. hydrate 不会重新渲染dom, 只会挂载一些事件监听等交互内容
4. 

### day2
1. mock 数据
2. ssr支持路由
   1. server端监听所有路由， 通过req.url获取路由
   2. StaticRouter 通过req.url 决定所需渲染路由页面
3. csr支持路由
   1. 使用BrowserRouter变成多页应用
4. ssr支持数据流 > 异步数据
   1. 使用`redux-thunk`支持异步
   3. useEffect 更新异步数据