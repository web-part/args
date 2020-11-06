
const Build = require('./modules/Build');
const Watch = require('./modules/Watch');

module.exports = {
    /**
    * 解析命令行中的参数。
    * @params {string} method 必选，方法。 只能是 `watch` 或 `build`。
    *   `watch`: 针对开发阶段。
    *   `build`: 针对生产阶段。
    * @param {Array} [args] 可选，要解析的参数列表。 默认为 [...process.argv]。
    * @return {Object}
    */
    parse(method, args) {
        args = args || [...process.argv];


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