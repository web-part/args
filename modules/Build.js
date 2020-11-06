
module.exports = {
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
    parse: function (args) {
        let meta = {
            compat: false,
            pack: false,
            scheme: 'dist',
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


            'scheme': function (scheme, action, value) {
                meta.scheme = scheme;

                if (action) {
                    key$fn[action](value);
                }
            },

            'pack': function (key, ...rest) {
                meta.pack = true;

                //`node build pack`
                //`node build compat pack`
                if (!key) {
                    return;
                }

                if (key == 'qr' || key == 'open') {
                    key$fn[key](...rest);
                }
                else {
                    key$fn['scheme'](key, ...rest);
                }
            },

            'compat': function (key, ...rest) {
                meta.compat = true;

                // `node build compat`
                if (!key) {
                    return;
                }


                if (key == 'qr' || key == 'open' || key == 'pack') {
                    key$fn[key](...rest);
                }
                else {
                    key$fn['scheme'](key, ...rest);
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
                    key$fn['scheme'](key, ...rest);
                }

                break;
        }


        return meta;
    },

};