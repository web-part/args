# webpart/args

解析命令行参数。

`npm install @webpart/args`

## 方法

### parse(method, args)

```
const args = require('@webpart/args');
const info = args.parse();

//如果在命令行中输入 node watch compat pack open localhost,
//则返回的信息为：
info = {
    compat: true,       //使用了 `compat` 选项。
    pack: true,         //使用了 `pack` 选项。
    action: 'open',     //附带要执行的动作。
    value: 'localhost', //针对要执行的动作所要使用的值。 
};

//如果在命令行中输入 node build compat pack qr 450,
//则返回的信息为：
info = {
    compat: true,       //使用了 `compat` 选项。
    pack: true,         //使用了 `pack` 选项。
    action: 'qr',       //附带要执行的动作。
    value: '450',       //针对要执行的动作所要使用的值。 
};
```

```javascript
/**
* 解析命令行中的参数。
* 已重载 parse();               //从 process.argv 中自动获取和解析参数，method 会从 process.argv[1] 中获取。
* 已重载 parse(args);           //使用指定的参数列表进行解析，method 会从 args[1] 中获取。
* 已重载 parse(method);         //使用指定的方法进行解析，args 从 process.argv 中自动获取和解析参数。
* 已重载 parse(method, args);   //使用定的方法和指定的参数列表。
* @params {string} method 必选，方法。 
* 只能是 `watch` 或 `build`。
*   `watch`: 用于开发阶段。
*   `build`: 用于生产阶段。
* @param {Array} [args] 可选，要解析的参数列表。 默认为 [...process.argv]。
* @return {Object} 返回解析后的信息。
* 当 method 为 `watch` 时，返回的对象为：
*   watch = {
*       compat: false,  //是否使用了 `compat` 选项。
*       pack: false,    //是否使用了 `pack` 选项。
*       action: '',     //附带要执行的动作，只能为 `open` 或 `qr`。
*       value: '',      //针对要执行的动作所要使用的值。 
*   };
* 当 method 为`build` 时，返回的对象为：
*   build = {
*       compat: false,  //是否使用了 `compat` 选项。
*       pack: false,    //是否使用了 `pack` 选项。
*       scheme: 'dist', //使用的配置方案，默认为 `dist`。 
*       action: '',     //附带要执行的动作，只能为 `open` 或 `qr`。
*       value: '',      //针对要执行的动作所要使用的值。 
*   };
*/
```

``` javascript
/**
* 解析命令行 `node watch` 后面的参数。
* `node watch`
*  0    1
* `node watch qr`
* `node watch qr 450`
* `node watch open`
* `node watch open .`
* `node watch open localhost`
*  0    1     2    3
* `node watch pack`
* `node watch pack qr`
* `node watch pack qr 450`
* `node watch pack open`
* `node watch pack open .`
* `node watch pack open localhost`
*  0    1     2    3    4
* `node watch compat`
* `node watch compat qr`
* `node watch compat qr 450`
* `node watch compat open`
* `node watch compat open .`
* `node watch compat open localhost`
*  0    1     2      3    4
* `node watch compat pack`
* `node watch compat pack qr`
* `node watch compat pack qr 450`
* `node watch compat pack open`
* `node watch compat pack open .`
* `node watch compat pack open localhost`
*  0    1     2      3    4    5
*/
```

``` javascript
/**
* 解析命令行 `node build` 后面的参数。
* `node build`
* `node build dist`
*  0    1     2
* `node build qr`
* `node build qr 450`
* `node build open`
* `node build open .`
* `node build open localhost`
*  0    1     2    3
* `node build dist qr`
* `node build dist qr 450`
* `node build dist open`
* `node build dist open .`
* `node build dist open localhost`
*  0    1     2    3    4
* `node build pack`
* `node build pack qr`
* `node build pack qr 450`
* `node build pack open`
* `node build pack open .`
* `node build pack open localhost`
*  0    1     2    3    4
* `node build pack dist`
* `node build pack dist qr`
* `node build pack dist qr 450`
* `node build pack dist open`
* `node build pack dist open .`
* `node build pack dist open localhost`
*  0    1     2    3    4    5
* `node build compat`
* `node build compat qr`
* `node build compat qr 450`
* `node build compat open`
* `node build compat open .`
* `node build compat open localhost`
*  0    1     2      3    4
* `node build compat dist`
* `node build compat dist qr`
* `node build compat dist qr 450`
* `node build compat dist open`
* `node build compat dist open .`
* `node build compat dist open localhost`
*  0    1     2      3    4    5
* `node build compat pack`
* `node build compat pack qr`
* `node build compat pack qr 450`
* `node build compat pack open`
* `node build compat pack open .`
* `node build compat pack open localhost`
*  0    1     2      3    4    5
* `node build compat pack dist`
* `node build compat pack dist qr`
* `node build compat pack dist qr 450`
* `node build compat pack dist open`
* `node build compat pack dist open .`
* `node build compat pack dist open localhost`
*  0    1     2      3    4    5    6
*/
```