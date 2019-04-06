const webpack = require('webpack');
const ttag = {};

const config = (locale = 'default') => {
    return {
        name: `build-${locale}`,
        mode: 'development',
        entry: './app.js',
        output: {
            filename: `app.${locale}.js`
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [['ttag', ttag]],
                        presets: ['@babel/preset-env']
                    }
                }]
            }, {
                test: /\.po$/,
                use: [
                    { loader: 'json-loader' },
                    { loader: 'po-gettext-loader' }
                ]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                LOCALE: JSON.stringify(locale) //expose LOCALE to frontend
            })
        ],
    };
};

module.exports = (env = {}) => {
    if (env.extract) {
        ttag.extract = { output: './template.pot' };
        return config();
    }

    if (env.locale) {
        ttag.resolve = { translations: env.locale !== 'default' ? `${env.locale}.po` : 'default' };
        return config(env.locale);
    }

   // exports multiple configurations 
   return [
       config('fr'), 
       config('es'), 
       config('default')
   ]
}
