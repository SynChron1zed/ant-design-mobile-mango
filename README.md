# AntMobileDemo
##### @以下大部分内容摘自[antd-mobile](https://mobile.ant.design/index-cn)官方文档，具体操作流程以官方文档为主，本文只做参考

## 项目实战
dva 是一个基于 react 和 redux 的轻量应用框架，概念来自 elm，支持 side effects、热替换、动态加载、react-native、SSR 等，已在生产环境广泛应用。
本文会引导你使用 dva 和 antd 从 0 开始创建一个简单应用。

### 安装 dva-cli
通过 npm 安装 dva-cli 并确保版本是 0.7.0 或以上。

$ npm install dva-cli -g<br>
$ dva -v<br>
0.7.0<br>

### 创建新应用
$ dva new name(项目名称，文后统一称为根目录)<br>

这里我们可以通过终端创建项目目录也可通过idea创建<br>
创建完成后如显示如下<br>
![](https://github.com/SynChron1zed/AntMobileDemo/raw/master/ReadmeImg/QQ1.png)

这样我们基础环境就搭建好了，现在我们进入刚搭建的目录里面，引用ant-mobile<br>

$ cd dva-quickstart<br>
$ npm start<br>

![](https://github.com/SynChron1zed/AntMobileDemo/raw/master/ReadmeImg/QQ2.png)

几秒钟后浏览器会自动打开http://localhost:8000<br>
如没有自动弹出，可自行打开<br>

![](https://github.com/SynChron1zed/AntMobileDemo/raw/master/ReadmeImg/QQ3.png)

## 使用ant-mobile
现在我们就可以来使用 [antd-mobile](https://mobile.ant.design/index-cn) 提供给我们的组件了。<br>

$ npm install antd-mobile babel-plugin-import --save<br>

这个过程有的人可能会出现速度较慢，建议换网速较快的网络，也可挂上vpn<br>
安装成功后，我们打开根目录下的package.json文件，会看到当前的ant-mobile版本号，这个以后在你提供bug问题上记得要带上这个版本号<br>

![](https://github.com/SynChron1zed/AntMobileDemo/raw/master/ReadmeImg/QQ4.png)

安装成功后，打开.roadhogrc文件：<br>
 "extraBabelPlugins": [<br>
 -"transform-runtime",<br>
 +"transform-runtime",<br>
 +["import", { "libraryName": "antd-mobile", "style": "css" }]<br>
  ],<br>
  
这个时候你在页面上引用组件就会生效了。<br>

但是这里会有一个问题，官网这里用的是 `.roadhogrc`(json格式) 但是后面我们需要配置高清方案，因为是函数需要在 `.roadhogrc.js` 里面配置才会生效，所以这里我建议大家删掉 `.roadhogrc` 文件，在根目录下新建 `.roadhogrc.js` 文件<br>

这里的配置就和webpack的配置差不多了<br>

代码如下：<br>

``` javascript
export default {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "style": "css" }]
      ]
    }
  },
  }
 ```
这个时候，我们引用ant-mobile的环境配置就好了，现在我们就开始试着用它，我们打开 `src/routes/IndexPage.js`<br>

```
import { NavBar, Icon } from 'antd-mobile';
```
这个就是引用样式，我们这里做一个[导航栏头部](https://mobile.ant.design/components/nav-bar-cn/)的样式引用<br>

代码如下：<br>

```
...
 <div>
      <NavBar leftContent="back"
              mode="light"
              onLeftClick={() => console.log('onLeftClick')}
              rightContent={[
                <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                <Icon key="1" type="ellipsis" />,
              ]}>
        NavBar
      </NavBar>
    </div>
 ```
然而我们刷新页面却发现字体特别大，这个时候就要引入[高清方案](https://github.com/ant-design/ant-design-mobile/wiki)<br>
具体配置请参考文档(postcss-pxtorem 需要安装依赖，配置还是在`.roadhogrc.js`里面)<br>

可能这个时候大家发现到了，自己的页面和官网文档的例子有区别，图标没有显示出来，这是为什么呢？[详情见](https://mobile.ant.design/components/icon-cn/)，因为我们环境中使用roadhog，所以这里我们按照[roadhog](https://github.com/sorrycc/roadhog)的配置方式<br>

`.roadhogrc.js`更新后代码如下：

```
import pxtorem from 'postcss-pxtorem';

const path = require('path');


const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg 
  path.resolve(__dirname, 'src/assets/icon-core'),  // 业务代码本地私有 svg 存放目录
];

export default {


  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "style": "css" }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd-mobile", "style": "css" }]
      ]
    }
  },

  "autoprefixer": {
    "browsers": [
      "iOS >= 8", "Android >= 4"
    ]
  },

  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
  svgSpriteLoaderDirs: svgSpriteDirs,
}

```
 svgSpriteDirs 下第一个就是配置ant-mobile内置的icon，第二个是配置你需要引入的本地svg，这里的路径我们可以忽略，引用本地icon时
 
```
 <Icon type={require('../assets/icon-core/adduser.svg')} />
```
即可，引入你svg存放的路径
 


