
const Build = require('./modules/Build');
const Watch = require('./modules/Watch');

module.exports = {
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
    parse(method, args) {
        //重载 parse(args); 
        if (Array.isArray(method)) {
            args = method;
            method = '';
        }
        //parse();
        //parse(method);
        //parse(method, args);
        else {
            args = args || [...process.argv];
        }

        //未指定 method，则从 args 中获取。
        if (!method) {
            method = args[1];
        }



        let info =
                method == 'watch' ? Watch.parse(args) :
                method == 'build' ? Build.parse(args) :
                null;


        if (!info) {
            throw new Error(`无法识别参数 method。 它的值只能为 'watch' 或 'build'。`);
        }

        return info;
    },
};