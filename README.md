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

### day3
1. 服务端异步数据渲染
   1. server端拿到路由对应的信息, 此处需要的时路由对于的组件, 加载的数据
      1. 定义路由表, 自然能拿到对应路由的信息 用到`matchPath`
         1. App.js修改为根据路由表动态生成
      2. 取出路由的组件, 通过组件拿到loadData方法
         1. loadData中会调用dispatch存放异步数据到server端的store
      3. 利用Promise.all 现将所有需要的数据获取
      4. 拿到所有数据后通过之前的方法生成html字符串
         1. 由于此时已经拿到所有数据, 这些数据需要提供给客户端store作为初始数据, 否则页面数据会被客户端清空
            1. 数据挂载到window.__context上
2. Server Client端的store不是同一个了
3. 客户端异步数据渲染
   1. 初始化store时, 先拿到window.__context的数据作为初始值
4. 多个数据同时加到props里面

### day3-作业
1. 降级处理接口报错
   1. 方法一: Promise.all不处理异常, 在finally回调返回. 无论是否发生错误均返回, 可以实现降级处理.
      缺点: 任何一个reject会导致立即返回, 会导致其他还未resolve的正常请求被截断, 从而改成走client端渲染
  2. 方法二: 实现ES2010的 Promise.allSettled方法, 所有请求结束后才返回, 将每个promise的结果储存在results中
     1. 没有Promise.all的缺点
  3. 方法三: 将每个promise包装一次Promise, 以将异常处理成resolve, 这样就可以直接使用Promise.all
2. 前后端统一axios
   1. 方法一:
      1. 每一个store里的axios请求换成封装好的axios实例, 配置baseUrl, 也可进行响应拦截
      2. server端单独处理 /api开头的请求, 将请求转发到mock server 9090端口, 从而解决跨域问题
   2. 方法二:
      1. store.js thunk 换成 thunk.withExtraArgument(axiosInstance) 附加一个axios实例为参数传给每一个store
      2. 区分服务端和客户端store的axios实例, 服务端store可直接请求mock端口
      3. server.js 转发客户端发起的/api请求： 使用代理 http-proxy-middleware 进行转发
