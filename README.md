# c-style

> chain for content

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


概述
基于以太坊区块链的一个文章，日记发布dapp，
a.用户可以发布，浏览，评论，检索文章
b.可以发布加密日记
c.用户发布的文章到达一定的浏览量，点赞数，评论数等，由智能合约奖励一定的积分(token)
d.根据用户的在线时间，存活度，浏览量，评论数等根据合约算法奖励一定的积分（token）

技术组合:
1.使用solidity进行节点智能合约开发，用truffle和ganache-cli进行构建，测试，迁移和部署
2.使用ipfs进行内容的分布式存储，返回内容和文件的hash保存在存储昂贵的区块链智能合约上面。
3.使用web3.js对合约进行交互
4.使用nfsw.js对上传的图片进行鉴黄限制nsfwjs
5.使用vue作为前端开发框架，配套UI组件element-ui
6.使用基于go语言的iris web框架 + mysql作为后台进行内容查询和检索


