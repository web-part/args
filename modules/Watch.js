


function isAction(key) {
    return key == 'qr' || key == 'open';
}

function error(key) {
    console.error('无法识别的参数:', key);
}



module.exports = {

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
    parse: function (args) {

        let meta = {
            compat: false,
            pack: false,
            action: '',
            value: '',
        };


        let key$fn = {
            'qr': function (value) {
                meta.action = 'qr';
                meta.value = value || '';
            },

            'open': function (value) {
                meta.action = 'open';
                meta.value = value || '';
            },

            'pack': function (key, ...rest) {
                meta.pack = true;

                //`node watch pack`
                //`node watch compat pack`
                if (!key) {
                    return;
                }

                //`node watch pack open|qr`
                //`node watch compat pack open|qr`
                if (isAction(key)) {
                    key$fn[key](...rest);
                }
                else {
                    error(key);
                }

            },

            'compat': function (key, ...rest) {
                meta.compat = true;

                // `node watch compat`
                if (!key) {
                    return;
                }

                // `node watch compat open|qr`
                // `node watch compat pack`
                if (isAction(key) || key == 'pack') {
                    key$fn[key](...rest);
                }
                else {
                    error(key);
                }
            },
        };



        let key = args[2];
        let rest = args.slice(3);

        switch (key) {
            case 'qr':
            case 'open':
            case 'pack':
            case 'compat':
                key$fn[key](...rest);
                break;

            default:
                if (key) {
                    error(key);
                }
                break;
        }


        return meta;
    },




};